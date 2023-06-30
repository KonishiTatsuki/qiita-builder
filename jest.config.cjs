module.exports = {
  moduleFileExtensions: ["vue", "js", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  preset: "ts-jest/presets/default",
  // testEnvironment: "jest-environment-jsdom",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transform: {
    "^.+\\.(ts|js)?$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
};
