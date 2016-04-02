Package.describe({
  name: 'velocity:console-reporter',
  version: '0.2.0',
  summary: 'A console reporter for Velocity',
  git: 'https://github.com/meteor-velocity/console-reporter.git',
  documentation: '../README.md',
  testOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.export('ConsoleReporter', 'server');
  api.use([
    'underscore',
    'velocity:reports@1.0.0'
  ], 'server');
  api.addFiles([
    'ConsoleReporter.js',
    'main.js'
  ], 'server');
});
