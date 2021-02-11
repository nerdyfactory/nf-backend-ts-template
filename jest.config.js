module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/__test__/setups/connectDatabase.ts"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^__test__/(.*)$": "<rootDir>/__test__/$1",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
