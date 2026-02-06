# ナレッジベース (Knowledge Base)

このプロジェクトの開発中に得られた知見、トラブルシューティング、便利なコマンドを蓄積します。

## 環境・ツールに関するTips (Windows/PowerShell)

### コマンドの連結
PowerShellでは、`&&` によるコマンド連結がサポートされていない場合があります（バージョンによる）。その場合は、セミコロン `;` を使用してください。
```powershell
# 使用例
npm run build; npm start
```

### APIのテスト (POST/JSON)
Windowsの `curl` (curl.exe) でJSONを送信する場合、二重引用符のエスケープ（`"`）が複雑になり、エラーの原因となります。
PowerShell標準の `Invoke-RestMethod` を使用すると、よりシンプルかつ確実に実行できます。
```powershell
# ログインしてトークンを取得し、変数に保存する例
$res = Invoke-RestMethod -Uri http://localhost:3000/login -Method Post -Body '{"username":"admin", "password":"password123"}' -ContentType "application/json"
$token = $res.token

# 取得したトークンを使ってリクエストを送る例
Invoke-RestMethod -Uri "http://localhost:3000/user?id=1" -Method Get -Headers @{ Authorization = "Bearer $token" }
```

## 実装・コードに関するTips

### Fastify: カスタムプロパティの型拡張 (Module Augmentation)
`fastify.decorate` を使用して、`authenticate` などのカスタムメソッドやプロパティを `fastify` インスタンスに追加した場合、TypeScriptが型エラーを出すことがあります。
その場合、以下のような型定義の拡張をコードに追加することで解決できます。

```typescript
// server.ts 等の冒頭に記述
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any; // 必要に応じてより詳細な型を定義
  }
}
```
これにより、`fastify.authenticate` のような呼び出しが可能になります。
