import Fastify from "fastify";
import sqlite3 from "sqlite3";
import argon2 from "argon2";
import fastifyJwt from "@fastify/jwt";

import { UserRepository } from "./src/repositories/UserRepository";
import { UserService } from "./src/services/UserService";
import { UserController } from "./src/controllers/UserController";

// fastifyインスタンスの型定義
declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

// Fastifyアプリケーションの初期化
const fastify = Fastify({ logger: true });
const db = new sqlite3.Database(":memory:");

// JWTプラグインの登録
fastify.register(fastifyJwt, {
  secret: "supersecret-key-change-this-in-production",
});

// 認証用デコレータの定義
// これを各ルートのpreHandlerで使うことで、トークンの検証を共通化できる
fastify.decorate("authenticate", async (request: any, reply: any) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// データベースの初期化
db.serialize(async () => {
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)",
  );
  // パスワードをハッシュ化して挿入
  const adminPasswordHash = await argon2.hash("password123");
  const ryotaPasswordHash = await argon2.hash("secret");
  db.run(
    "INSERT INTO users (username, password) VALUES ('admin', ?)",
    adminPasswordHash,
  );
  db.run(
    "INSERT INTO users (username, password) VALUES ('ryota', ?)",
    ryotaPasswordHash,
  );
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
fastify.get(
  "/user",
  { preHandler: [fastify.authenticate] as any },
  (request, reply) => userController.getUser(request, reply),
);
fastify.post("/login", (request, reply) =>
  userController.login(request, reply),
);

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
