/**
 * Jest Configuration
 * 
 * Configuration for Jest testing framework
 */

module.exports = {
  // Test environment
  testEnvironment: 'node',

  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js'
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 80,
      statements: 80
    }
  },

  // Coverage report formats
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov'
  ],

  // Coverage directory
  coverageDirectory: 'coverage',

  // Verbose output
  verbose: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Test timeout (milliseconds)
  testTimeout: 10000,

  // Indicates whether each individual test should be reported during the run
  notify: false,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // The directory where Jest should output its coverage files
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],

  // Module file extensions
  moduleFileExtensions: [
    'js',
    'json',
    'node'
  ]
};
