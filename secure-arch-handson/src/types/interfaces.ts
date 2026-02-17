export interface User {
  id: number;
  username: string;
  password?: string;
}

export type UserWithoutPassword = Omit<User, "password">;

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

export interface IUserService {
  getUserById(id: number): Promise<UserWithoutPassword | null>;
  login(
    username: string,
    password: string,
  ): Promise<UserWithoutPassword | null>;
}
