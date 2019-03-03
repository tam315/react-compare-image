module.exports = {
  setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
  // to fix the security error.
  // see: https://github.com/jsdom/jsdom/issues/2304
  testURL: 'http://localhost/',
  // console.log will not show without these line
  verbose: false,
};
