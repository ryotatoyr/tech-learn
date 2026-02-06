import sqlite3 from "sqlite3";

export class UserRepository {
  private db: sqlite3.Database;

  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  // ユーザーをIDで検索 (プレースホルダ使用)
  async findById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // 良い例: ? を使ったプレースホルダ
      const query = `SELECT id, username FROM users WHERE id = ?`;

      // 第二引数に配列で値を渡すことで、ライブラリが安全にエスケープ処理を行う
      this.db.get(query, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async findByUsername(username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, username, password FROM users WHERE username = ?`;

      this.db.get(query, [username], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // ユーザーをユーザー名とパスワードで検索 (プレースホルダ使用)
  // async findByUsernameAndPassword(
  //   username: string,
  //   password: string,
  // ): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     // 良い例: 複数の値も ? で対応
  //     const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

  //     this.db.get(query, [username, password], (err, row) => {
  //       if (err) reject(err);
  //       else resolve(row);
  //     });
  //   });
  // }
}
