const middleware = require('./karma.middleware');

module.exports = config => {
  config.set({
    // remove these when https://github.com/karma-runner/karma/pull/2834 is merged
    customContextFile: 'test/context.html',
    customDebugFile: 'test/debug.html',

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    middleware: ['custom'],

    plugins: [
      'karma-*',
      {
        'middleware:custom': ['factory', middleware]
      }
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'mocha'],

    // list of files / patterns to load in the browser
    files: [
      {
        pattern: 'test/**/*.js',
        type: 'module'
      },
      {
        pattern: 'src/**/*.js',
        type: 'module'
      }
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
