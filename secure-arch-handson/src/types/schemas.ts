import { z } from 'zod';

// ログインリクエストのスキーマ
export const loginSchema = z.object({
  username: z.string().min(1, "ユーザー名は必須です"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
});

// ユーザー取得リクエストのスキーマ（クエリパラメータ）
export const getUserSchema = z.object({
  id: z.string().regex(/^\d+$/, "IDは数値である必要があります"), // 数字のみ許可することでSQLインジェクションのリスクを軽減（これだけでは不十分ですが第一歩です）
});

// スキーマから型を自動生成
export type LoginInput = z.infer<typeof loginSchema>;
export type GetUserInput = z.infer<typeof getUserSchema>;
