module.exports = {
  testTimeout: 30000,
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
    SERVER_URL: "http://localhost:3000",
  },
  globalSetup: "<rootDir>/tests/helpers/setup",
  globalTeardown: "<rootDir>/tests/helpers/teardown",
  testEnvironment: "node",
};
