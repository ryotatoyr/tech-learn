# ハンズオン進捗管理 (TODO)

## Phase 1: 環境構築と現状把握
- [x] プロジェクトの初期化 (`npm init`, TypeScript設定)
- [x] 依存ライブラリのインストール (Fastify, SQLite3)
- [x] 脆弱なサンプルコード (`server.ts`) の作成
- [x] SQLインジェクションの動作確認

## Phase 2: アーキテクチャの整理 (Layered Architecture)
コードの責務を分離し、保守性と可読性を向上させます。
- [x] **ディレクトリ構造の整備**
    - `src/controllers`, `src/services`, `src/repositories`, `src/types` の作成
- [x] **Repository層の実装**
- [x] **Service層の実装**
- [x] **Controller層の実装**
- [x] **リファクタリング後の動作確認**

## Phase 3: セキュリティ強化 (Security Hardening)
脆弱性を修正し、堅牢なアプリケーションにします。
- [x] **入力バリデーションの導入**
    - `zod` のインストール
    - リクエストデータのスキーマ定義と検証実装
- [x] **パスワードの安全な管理**
    - 平文保存の廃止
    - `argon2` 等を用いたハッシュ化の実装
- [x] **SQLインジェクション対策**
    - プレースホルダを用いたクエリへの修正 (Repository層)
- [x] **認証・認可の実装**
    - JWT (JSON Web Token) の導入
    - ログイン処理の堅牢化

## Phase 4: 発展 (Testing & DI)
さらに品質を高めるための取り組みです。
- [x] **依存性の注入 (DI) の適用**
    - インターフェースの導入
    - クラス間の結合度を下げる
- [x] **ユニットテストの作成**
    - DBに依存しないロジックのテスト
