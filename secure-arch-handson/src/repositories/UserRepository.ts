import sqlite3 from 'sqlite3';

export class UserRepository {
  private db: sqlite3.Database;

  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  async findById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // 悪い例: 文字列連結によるクエリ構築
      const query = `SELECT * FROM users WHERE id = ${id}`;
      this.db.get(query, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

// ユーザーをユーザー名とパスワードで検索
async findByUsernameAndPassword(username: string, password: string): Promise<any>{
  return new Promise((resolve, reject) => {
    // 悪い例: 平文パスワード + 文字列連結
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    this.db.get(query, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}
