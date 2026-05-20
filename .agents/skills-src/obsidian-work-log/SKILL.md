---
name: obsidian-work-log
description: AI Agentによる作業履歴やサマリーをObsidianに自動記録するためのスキル。タスク完了時やセッション終了時に、現在のワークスペースに応じたフォルダへログを保存します。
---

# obsidian-work-log

このスキルは、AI Agentが行った作業内容をObsidianの特定のVault（デフォルトは `obsidian_diary`）に自動的に記録します。`obsidian-cli` および `obsidian-markdown` スキルと組み合わせて使用することで、リッチなMarkdown形式での記録とVault操作を実現します。

## 構成
- **Vault**: `obsidian_diary`
- **保存先パス**: `AgentLogs/[ワークスペース名]/[YYYY-MM-DD].md`
  - `[ワークスペース名]` は、現在のカレントディレクトリ名から自動的に取得されます。これにより、どのプロジェクトディレクトリからでも汎用的に使用可能です。
- **記録タイミング**: 
    - 重要なタスク（フェーズの完了、大きな修正など）が終了した際
    - ユーザーから明示的に「記録して」と依頼があった際

## ワークフロー

### 1. ワークスペース名の取得
現在のカレントディレクトリ名（例: `tech-learn` や `my-project`）をワークスペース名として使用します。Gitリポジトリの場合はリポジトリ名を使用することも検討してください。

### 2. ログ内容の生成
`obsidian-markdown` スキルの記法を活用し、以下の項目を含めたログを生成します。
- **Agent**: 作業を実行したAgent名（例: `Gemini CLI`, `codebase_investigator` など）
- **概要**: 何を行ったか
- **変更内容**: 具体的な修正箇所や追加機能
- **課題/次回の予定**: 残っている作業や次に着手すべきこと

### 3. Obsidianへの書き込み
`obsidian-cli` ( `obsidian` コマンド) を使用して、Obsidianに記録します。

```bash
# ファイルが存在しない場合は作成（write）、存在する場合は末尾に追加（append）
# 初回作成時は日付ヘッダーを含める
obsidian vault="obsidian_diary" append path="AgentLogs/[Workspace]/[YYYY-MM-DD].md" content="[生成したログ内容]"
```

## 使用例
- 「今の作業内容をObsidianに記録して。Agent名も忘れずに」
- タスク完了後の自動要約時、`obsidian-markdown` のコールアウトを使用して目立たせる
