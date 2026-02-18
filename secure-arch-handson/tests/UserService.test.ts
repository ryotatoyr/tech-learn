import { UserService } from "../src/services/UserService";
import { IUserRepository, User } from "../src/types/interfaces";
import * as argon2 from "argon2";

// 1. IUserRepositoryのモック(偽物)を作成
const mockUserRepository: jest.Mocked<IUserRepository> = {
  findById: jest.fn(),
  findByUsername: jest.fn(),
};

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    // 各テストの前にモックの記録をリセットし、新しいUserServiceインスタンスを作成
    jest.clearAllMocks();
    userService = new UserService(mockUserRepository);
  });

  describe("login", () => {
    it("ユーザーが存在し、パスワードが一致する場合、ユーザー情報を返す", async () => {
      // 準備: 偽のユーザーデータを作成
      const hashedPassword = await argon2.hash("correct-password");
      const fakeUser: User = {
        id: 1,
        username: "testuser",
        password: hashedPassword,
      };

      // 準備: モックが特定のデータを返すように設定
      mockUserRepository.findByUsername.mockResolvedValue(fakeUser);

      // 実行: ログインを試みる
      const result = await userService.login("testUser", "correct-password");

      // 検証: パスワードが含まれていないこと、正しいユーザー情報であることを確認
      expect(result).toEqual({ id: 1, username: "testuser" });
      expect(result).not.toHaveProperty("password");
    });
    it("パスワードが間違っている場合、nullを返す", async () => {
      // 準備
      const hashedPassword = await argon2.hash("correct-password");
      const fakeUser: User = {
        id: 1,
        username: "testuser",
        password: hashedPassword,
      };
      mockUserRepository.findByUsername.mockResolvedValue(fakeUser);

      // 実行: 間違ったパスワードでログイン
      const result = await userService.login("testUser", "wrong-password");

      // 検証
      expect(result).toBeNull();
    });
    it("ユーザーが存在しない場合、nullを返す", async () => {
      // 準備: ユーザーが見つからない（nullを返す）設定
      mockUserRepository.findByUsername.mockResolvedValue(null);

      // 実行
      const result = await userService.login("nonexist", "any-password");

      // 検証
      expect(result).toBeNull();
    });
  });

  describe("getUserById", () => {
    it("ユーザーが存在する場合、ユーザー情報を返す", async () => {
      const fakeUser: User = { id: 1, username: "testuser" };
      mockUserRepository.findById.mockResolvedValue(fakeUser);

      const result = await userService.getUserById(1);

      expect(result).toEqual(fakeUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
    });

    it("ユーザーが存在しない場合、nullを返す", async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      const result = await userService.getUserById(999);

      expect(result).toBeNull();
    });
  });
});
