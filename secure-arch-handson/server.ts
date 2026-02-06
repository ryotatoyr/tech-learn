import Fastify from 'fastify';
import sqlite3 from 'sqlite3';

const fastify = Fastify({ logger: true });
const db = new sqlite3.Database(':memory:');

// データベースの初期化 (悪い例: 平文パスワード)
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'password123')");
  db.run("INSERT INTO users (username, password) VALUES ('ryota', 'secret')");
});

/**
 * Phase 1: 脆弱で保守性の低いコード
 * 
 * このエンドポイントには重大な脆弱性があります。
 */
fastify.get('/user', (request, reply) => {
  const { id } = request.query as { id: string };

  // 脆弱性: SQLインジェクション
  // 文字列連結でクエリを構築しているため、 '1 OR 1=1' などの入力で全ユーザーを奪取可能
  const query = `SELECT * FROM users WHERE id = ${id}`;
  
  db.get(query, (err, row) => {
    if (err) {
      reply.status(500).send(err);
    } else {
      reply.send(row);
    }
  });
});

// ログインエンドポイント (脆弱性: 平文比較、SQLインジェクション)
fastify.post('/login', (request, reply) => {
  const { username, password } = request.body as any;

  // 悪い例: ユーザー入力をそのままクエリに使用
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (err || !row) {
      reply.status(401).send({ message: 'Login failed' });
    } else {
      reply.send({ message: 'Login successful', user: row });
    }
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
