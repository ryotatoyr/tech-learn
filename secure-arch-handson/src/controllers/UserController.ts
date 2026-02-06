import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/UserService";
import { loginSchema, getUserSchema } from "../types/schemas";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // ユーザー取得ハンドラー
  async getUser(request: FastifyRequest, reply: FastifyReply) {
    // Zodによるバリデーション
    const parseResult = getUserSchema.safeParse(request.query);
    if (!parseResult.success) {
      // 型エラー回避のため、エラーオブジェクト全体を返すか、詳細が必要なら (parseResult.error as any).errors とする
      reply
        .status(400)
        .send({ message: "Invalid input", errors: parseResult.error });
      return;
    }

    const { id } = parseResult.data;

    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        reply.status(404).send({ message: "User not found" });
        return;
      }
      reply.send(user);
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  // ログインハンドラー
  async login(request: FastifyRequest, reply: FastifyReply) {
    // Zodによるバリデーション
    const parseResult = loginSchema.safeParse(request.body);
    if (!parseResult.success) {
      reply
        .status(400)
        .send({ message: "Invalid input", errors: parseResult.error });
      return;
    }

    const { username, password } = parseResult.data;

    try {
      const user = await this.userService.login(username, password);
      if (user) {
        // fastifyのjwt.signを使ってトークンを生成
        // ペイロードには、ユーザーを特定できるIDやユーザー名を含める
        const token = (request.server as any).jwt.sign({
          id: user.id,
          username: user.username,
        });
        reply.send({
          message: "Login successful",
          token: token,
        });
      } else {
        reply.status(401).send({ message: "Invalid username or password" });
      }
    } catch (err) {
      reply.status(500).send(err);
    }
  }
}
