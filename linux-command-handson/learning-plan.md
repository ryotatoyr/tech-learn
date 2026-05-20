# Linuxコマンド & 気象データ解析学習計画

Debian Linux環境を対象に、基本的なコマンドライン操作、権限管理、テキスト処理、プロセス管理、シェルスクリプト、そして気象データ解析で有用なコマンドラインツール（netCDF / GRIB 等の操作）を体系的に学習します。

## 🎯 学習ゴール
1. Debian環境でパッケージ管理 (`apt`) やサービス管理を理解し、環境構築ができるようになる。
2. テキストフィルタリング（`grep`, `awk`, `sed` 等）を用いて大量のテキストデータを高速に処理できるようになる。
3. 気象データフォーマット (NetCDF, GRIB) の基本的な中身をコマンドラインから確認・抽出・加工できるようになる。
4. シェルスクリプトを用いて、データのダウンロードから前処理・解析ツール実行までを自動化できるようになる。

---

## 🛠 使用技術スタック
- Debian Linux (WSL2 または Docker 推奨)
- 気象データ解析ツール:
  - `netcdf-bin` (`ncdump`, `ncgen` 等)
  - `nco` (NetCDF Operators)
  - `cdo` (Climate Data Operators)
  - `wgrib2` (GRIB2データデコーダ)
- シェル: `bash`
- バージョン管理: `git`

---

## 📅 カリキュラム構成

### 【Phase 1】 基本操作とファイル権限
- ディレクトリ・ファイル操作の再確認 (`pwd`, `ls`, `mkdir`, `rm`, `cp`, `mv`)
- パーミッションと所有者の管理 (`chmod`, `chown`, `ls -l` の読み方)
- 管理者権限の実行 (`sudo`, `su`)

### 【Phase 2】 パッケージ管理と環境構築
- パッケージ情報の更新とインストール (`apt update`, `apt install`)
- 不要になったパッケージの削除やクリーンアップ (`apt remove`, `apt autoremove`)
- 必要なコマンドの導入（`curl`, `wget`, `netcdf-bin`, `cdo`, `nco` 等のインストール）

### 【Phase 3】 テキストストリーム処理と検索
- ファイルの連結と表示 (`cat`, `head`, `tail`, `less`)
- 高度なパターン検索 (`grep`, `egrep`)
- ストリームエディタと文字列抽出・編集 (`sed`, `awk`, `cut`, `tr`)
- 並べ替えと重複排除 (`sort`, `uniq`)
- パイプライン (`|`) とリダイレクト (`>`, `>>`, `2>`) を用いた組み合わせ

### 【Phase 4】 システムモニタリングとプロセス管理
- プロセス一覧の表示と強制終了 (`ps`, `top`/`htop`, `kill`, `killall`)
- ディスク容量とメモリ使用量の確認 (`df`, `du`, `free`)
- システムログの確認 (`journalctl`, `/var/log` の確認)

### 【Phase 5】 ネットワークとファイル転送
- データのダウンロード (`curl`, `wget`)
- ネットワーク状態の確認 (`ping`, `ss`, `ip address`)
- リモート接続とファイル転送 (`ssh`, `scp`, `rsync`)

### 【Phase 6】 気象データ解析用の特殊コマンド
- **NetCDF操作**:
  - `ncdump`: NetCDFファイルのヘッダー情報 (メタデータ) やデータ本体のダンプ
  - `ncgen`: テキスト（CDL）からNetCDFファイルを生成する
- **NCO (NetCDF Operators)**:
  - `ncks`: 変数や次元の切り出し (subsetting)
  - `ncrcat`: 複数ファイルの結合 (時間軸での連結など)
- **CDO (Climate Data Operators)**:
  - `cdo sinfo`: ファイルのサマリー情報表示
  - `cdo selname`: 特定の変数 (気温、風速など) の抽出
  - `cdo mean`: 平均値 (年平均、月平均など) の算出
- **GRIB/GRIB2操作**:
  - `wgrib2`: 気象庁のGPVデータ等で使われるGRIB2形式のメタデータ確認やCSV出力

### 【Phase 7】 シェルスクリプト基礎
- シェルスクリプトの作成と実行権限付与 (`#!/bin/bash`, `chmod +x`)
- 変数と引数の扱い
- 条件分岐 (`if`) と繰り返し (`for`, `while`)
- 自動化の実践：気象データの自動ダウンロード＆特定変数の抽出・統計処理スクリプトの作成

---

## 🚀 次のステップ
1. [TODO.md](file:///C:/Users/ryota/tech-learn/linux-command-handson/TODO.md) に従って、Phase 1 から順に進める。
