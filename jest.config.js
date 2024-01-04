// // jest.config.js
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   modulePathIgnorePatterns: ["/dist/"], // Ignore the compiled JavaScript files
//   moduleNameMapper: {
//     "@/(.*)": "/src/$1",
//   },
//   testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
// };

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: false,
};
