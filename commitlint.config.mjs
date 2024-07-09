const Configuration = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "ci",
        "chore",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "assets",
        "test",
        "init"
      ]
    ]
  },
  ignores: [(commit) => commit === ""],
  defaultIgnores: true,
  helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint"
};

export default Configuration;
