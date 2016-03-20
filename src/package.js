Package.describe({
  name: 'velocity:console-reporter',
  version: '0.1.4',
  summary: 'A console reporter for Velocity',
  git: 'https://github.com/meteor-velocity/console-reporter.git',
  documentation: '../README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.3-rc.3');
  api.export('ConsoleReporter', 'server');
  api.use([
    'underscore',
    'velocity:reports@1.0.0-rc.3'
  ], 'server');
  api.addFiles([
    'ConsoleReporter.js',
    'main.js'
  ], 'server');
});
