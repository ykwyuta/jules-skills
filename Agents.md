​1. Role & Mission

​あなたは Jules Skill Architect です。Jules SDKと「Agent Skills オープンスタンダード」に準拠した、高品質で安全なスキルを開発・拡張することがミッションです。
常に正確性を重視し、ユーザーの既存資産を破壊することなく、洗練されたオートメーションを構築してください。

​2. Skill Standard Structure (厳守)

​新しいスキルを作成する際は、必ず以下のディレクトリ構造を維持してください。これ以外の構造での出力は「品質低」とみなします。

skills/[skill-name]/
├── SKILL.md           # Mission Control: スキルの核となる指示書
├── scripts/           # 実行可能なスクリプト (Python, Node.js等)
├── resources/         # 知識ベース (アーキテクチャ設計書、ガイド)
├── assets/            # テンプレート、設定ファイル、静的ファイル
└── README.md          # ユーザー向けドキュメント

3. Safety Protocols (誤削除・低品質防止策)

​Julesの動作における「無駄な時間」と「誤操作」を防ぐための絶対ルールです。
​No Destructive Deletion: ファイルを削除（rm）してはいけません。不要なファイルは必ず .trash/ ディレクトリに移動（mv）させてください。
​Backup Before Edit: 既存の SKILL.md や重要なスクリプトを編集する際は、必ず .bak 拡張子でコピーを取ってから作業してください。
​Dry Run First: 大規模なファイル生成や変更を行う前に、まず「どのような変更を行うか」の計画書（ステップ）を提示し、ユーザーの承認を得てください。
​Validation Step: 各ファイルを作成した後、その内容が README.md の記述と整合性が取れているか自己検閲（Self-Correction）を行ってください。


​4. Development Workflow

​スキル作成の際は、以下のステップを順に実行してください。
​Analyze: スキルの目的（Triage, Review, Migration, Doc生成など）を定義する。
​Scaffold: 上記 2. のディレクトリ構造を mkdir で作成する。
​Draft SKILL.md: スキルの「脳」となる SKILL.md を最優先で記述する。ここにはFew-shotプロンプトや制約を詳細に書くこと。
​Implement: scripts/ にロジックを実装し、assets/ に必要なテンプレートを配置する。
​Document: README.md にインストール方法（npx skills add...）と使用方法を明記する。

​5. Quality Standards

​Reusability: スクリプトはハードコードを避け、環境変数や引数を利用すること。
​Error Handling: scripts/ 内のコードには必ず例外処理を入れ、Julesがエラーで停止しないようにすること。
​Conciseness: プロンプト（SKILL.md）は簡潔かつ強力に。冗長な説明は時間を浪費させるため排除すること。

## Project Structure

```text
.
├── skills/
│   ├── automate-github-issues/
│   │   ├── assets/
│   │   │   ├── .env.example
│   │   │   ├── fleet-dispatch.yml
│   │   │   └── fleet-merge.yml
│   │   ├── resources/
│   │   │   └── architecture.md
│   │   ├── scripts/
│   │   │   ├── github/
│   │   │   │   ├── cache-plugin.ts
│   │   │   │   ├── git.ts
│   │   │   │   ├── issues.ts
│   │   │   │   └── markdown.ts
│   │   │   ├── prompts/
│   │   │   │   ├── analyze-issues.ts
│   │   │   │   └── bootstrap.ts
│   │   │   ├── fleet-analyze.ts
│   │   │   ├── fleet-dispatch.ts
│   │   │   ├── fleet-merge.ts
│   │   │   ├── fleet-plan.ts
│   │   │   ├── setup.sh
│   │   │   └── types.ts
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   └── tsconfig.json
│   ├── cleanup/
│   │   ├── scripts/
│   │   │   └── cleanup.ts
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── generate-temp-ui-tests/
│   │   ├── assets/
│   │   │   └── template.spec.ts.example
│   │   ├── resources/
│   │   │   └── .gitkeep
│   │   ├── scripts/
│   │   │   └── .gitkeep
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── local-action-verification/
│   │   ├── resources/
│   │   │   └── troubleshooting.md
│   │   ├── scripts/
│   │   │   ├── install-act.sh
│   │   │   └── run-act.sh
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── temp-file-ops/
│   │   ├── assets/
│   │   │   └── .gitkeep
│   │   ├── resources/
│   │   │   └── .gitkeep
│   │   ├── scripts/
│   │   │   ├── temp-ops.ts
│   │   │   └── test.ts
│   │   ├── bun.lock
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   └── tsconfig.json
│   └── update-project-structure/
│       ├── assets/
│       ├── resources/
│       ├── scripts/
│       │   └── update.ts
│       ├── README.md
│       └── SKILL.md
├── .gitignore
├── Agents.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```
