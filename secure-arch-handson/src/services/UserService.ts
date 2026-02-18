import { IUserRepository } from "../types/interfaces";
import * as argon2 from "argon2";

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id: number) {
    // 将来的にここで権限チェックなどを行う
    return await this.userRepository.findById(id);
  }

  async login(username: string, password: string) {
    // ログインロジック
    const user = await this.userRepository.findByUsername(username);
    if (!user || !user.password) {
      return null; // ユーザーが存在しない場合
    }
    // argon2.verifyを使ってパスワードを検証
    const isPasswordValid = await argon2.verify(user.password, password);
    if (isPasswordValid) {
      // パスワードが正しい場合、パスワードを含まないユーザー情報を返す
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      return null; // パスワードが間違っている場合
    }
  }
}
