module.exports = {
  setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  // console.log will not show without these line
  verbose: false,
};
