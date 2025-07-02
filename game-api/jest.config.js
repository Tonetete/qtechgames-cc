module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  resetMocks: false,
  restoreMocks: false,
  clearMocks: false,
  moduleDirectories: ['node_modules'],
};
