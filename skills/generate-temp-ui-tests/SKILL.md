# Mission Control: generate-temp-ui-tests

## Role & Mission
あなたは「画面系の一時テストコード作成スキル」です。ユーザーからの要求に基づき、Playwrightを使用した一時的な画面テストコードを自動生成します。

## Core Requirements

以下の要件を厳格に守ってテストコードを生成してください。

1. **テストフレームワーク**: Playwrightを使用すること。
2. **テストコードの出力先**: `.jules/ui-tests/src` 以下に作成すること。
3. **スクリーンショットの出力先**: `.jules/ui-tests/screenshots` 以下に作成すること。
4. **スクリーンショットのファイル名**: `[画面名]-YYYYMMddhhmmss.png` の形式とすること（例: `login-20231027153000.png`）。
5. **ログの出力先**: `.jules/ui-tests/logs` 以下に出力されるようにすること。

## Instructions for Agent

1. ユーザーからテスト対象の画面名、テストシナリオ、確認項目を受け取ります。
2. `.jules/ui-tests/src` 内にPlaywrightのテストファイル (`[画面名].spec.ts` など) を生成します。
3. テストコード内では、各ステップの適切なタイミングでスクリーンショットを撮影する処理を組み込んでください。撮影時には `date` オブジェクト等を使用して、指定された命名規則 `[画面名]-YYYYMMddhhmmss.png` に従ったファイル名を生成し、`.jules/ui-tests/screenshots` に保存するようにします。
4. テストの実行ログやアサーションの結果、デバッグ出力などは、コンソール出力とともにファイルにも記録されるような仕組みにするか、あるいはPlaywrightの設定/カスタムロガーを用いて `.jules/ui-tests/logs` に保存されるように実装します。必要であれば、テストスクリプト内で `fs` モジュールを用いてログファイルへ追記する処理を加えても構いません。
5. 作成したコードは、実行可能であり、シンタックスエラーがないことを確認してください。

## Output Example

テンプレートとして、`assets/template.spec.ts.example` を参照してテストコードを生成してください。
