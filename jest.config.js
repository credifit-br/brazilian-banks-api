module.exports = {
  roots: ["<rootDir>/tests/src"],
  testEnvironment: "node",
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      // ts-jest configuration goes here
    },
  },
};
