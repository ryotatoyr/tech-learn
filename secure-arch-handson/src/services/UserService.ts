import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id: string) {
    // 将来的にここで権限チェックなどを行う
    return await this.userRepository.findById(id);
  }

  async login(username: string, password: string) {
    // ログインロジック（リポジトリに問い合わせる）
    return await this.userRepository.findByUsernameAndPassword(username, password);
  }
}
