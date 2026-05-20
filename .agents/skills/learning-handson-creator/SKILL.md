---
name: learning-handson-creator
description: 新しいハンズオン形式の学習用ディレクトリを作成するためのスキル。標準的な構成（learning-plan.md, TODO.md, package.json等）を自動的にセットアップします。
---

# learning-handson-creator

このスキルは、新しい技術を学ぶためのハンズオンディレクトリを迅速に作成するためのものです。

## ワークフロー

1.  **ディレクトリの作成**: `mkdir <directory-name>` を実行して新しいディレクトリを作成します。
2.  **テンプレートのコピー**: `assets/templates/` にあるファイルを新しいディレクトリにコピーします。
3.  **内容のカスタマイズ**:
    *   `package.json` の `name` を修正します。
    *   `learning-plan.md` に学習の目的、技術スタック、カリキュラムを記述します。
    *   `TODO.md` に具体的なタスクを記述します。
4.  **初期化**: 必要に応じて `npm install` を実行します。

## テンプレート

以下のテンプレートが `assets/templates/` に含まれています：
- `learning-plan.md`: 学習計画の雛形
- `TODO.md`: 進捗管理の雛形
- `package.json`: 基本的なTypeScriptプロジェクトの構成
- `tsconfig.json`: TypeScript設定の雛形