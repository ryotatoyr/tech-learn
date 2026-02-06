# Gemini CLI向けプロジェクトコマンド

この`gemini.md`ファイルは、`tech-learn`プロジェクト、特に`secure-arch-handson`サブディレクトリに関するコンテキストと一般的なコマンドを提供します。

## `secure-arch-handson`プロジェクト

`secure-arch-handson`ディレクトリにはTypeScript Node.jsプロジェクトが含まれています。

### 依存関係のインストール

プロジェクトの依存関係をインストールするには：
```bash
npm install --prefix secure-arch-handson
```

### プロジェクトのビルド

TypeScriptコードをJavaScriptにコンパイルするには：
```bash
npm run build --prefix secure-arch-handson
```

### サーバーの実行

Node.jsサーバーを起動するには：
```bash
npm start --prefix secure-arch-handson
```

### 学習コンテンツの要約（今後）

このプロジェクトは学習教材です。進行に応じて、`secure-arch-handson/learning-plan.md`または他の学習リソースからコンテンツを要約するようにGeminiに依頼できます。
たとえば、`learning-plan.md`の「ステップ」または「フェーズ」を完了した後、次のように尋ねることができます。
「`secure-arch-handson/learning-plan.md`の『セキュアなアーキテクチャ入門』セクションの主要な要点を要約してください。」

または、特定のステップに関連するコミット間の変更の要約を依頼することもできます。
例：「`secure-arch-handson`ディレクトリに関連する過去3つのコミットで行われた変更を要約してください。」

---

## プロジェクトの規約

### Markdownファイルの言語

このプロジェクト内のすべてのMarkdownファイルは、**日本語**で記述してください。