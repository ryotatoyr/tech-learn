import Fastify from "fastify";
import sqlite3 from "sqlite3";
import { UserRepository } from "./repositories/UserRepository";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";

const fastify = Fastify({ logger: true });
const db = new sqlite3.Database(":memory:");

// データベースの初期化
db.serialize(() => {                                                                                                                                │
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");                                                              │
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'password123')");                                                                 │
  db.run("INSERT INTO users (username, password) VALUES ('ryota', 'secret')");                                                                      │
});

// 各層のインスタンス化
const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/**
 * Phase 2: レイヤードアーキテクチャへの移行完了
 *
 * エントリーポイントは非常に簡潔になり、                                                                                                           │
 * ルーティングは Controller に委譲されています。
 */
fastify.get("/user", (request, reply) => userController.getUser(request, reply));
fastify.post("/login", (request, reply) => userController.login(request, reply));

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
