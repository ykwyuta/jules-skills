# generate-temp-ui-tests

このスキルは、一時的な画面テストコード（Playwright）を生成するためのスキルです。ユーザーが指定した画面シナリオに対して、テストコードの雛形を素早く構築します。

## 特徴

テストコードはすべて以下の厳格なルールに基づいて生成されます。

- **フレームワーク**: Playwright
- **ソース出力先**: `.jules/ui-tests/src`
- **スクリーンショット出力先**: `.jules/ui-tests/screenshots`
  - ファイル名フォーマット: `[画面名]-YYYYMMddhhmmss.png`
- **ログ出力先**: `.jules/ui-tests/logs`

## インストール

```bash
npx skills add google-labs-code/jules-skills --skill generate-temp-ui-tests --global
```

## 使い方

Julesエージェントに対して、テストしたい画面の名前とシナリオを伝えます。

**プロンプト例:**
> 「ログイン画面」の正常系テストコードを作成して。IDとパスワードを入力してログインボタンを押すシナリオでお願いします。

エージェントは自動的に `.jules/ui-tests/src/login.spec.ts` のようなファイルを生成し、そのスクリプト内でスクリーンショットの撮影やログ出力が規定のディレクトリに行われるよう実装してくれます。

### 実行方法

生成されたテストコードは、標準のPlaywrightコマンドで実行可能です（Playwrightがプロジェクトにインストールされている必要があります）。

```bash
npx playwright test .jules/ui-tests/src/
```
