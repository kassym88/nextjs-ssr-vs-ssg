module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.(j|t)s?(x)',
    '!src/**/*.story.(j|t)s?(x)',
    '!src/**/stories/*.(j|t)s?(x)',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/coverage/',
    '/typings/',
    '/test-helpers/',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  coverageReporters: ['html', 'text-summary', 'lcov'],
  // coverageThreshold: {
  //   global: {
  //     statements: 80,
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //   },
  // },
  setupFiles: ['<rootDir>/jest/setup.js'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).(j|t)s?(x)'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.s?css$': '<rootDir>/jest/cssTransform.js',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
};
