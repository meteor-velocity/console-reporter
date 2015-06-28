Package.describe({
  name: 'velocity:console-reporter',
  version: '0.1.2',
  summary: 'A console reporter for Velocity',
  git: 'https://github.com/meteor-velocity/console-reporter.git',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.export('ConsoleReporter', 'server');
  api.use([
    'underscore',
    'velocity:core@0.7.0',
    'velocity:shim@0.1.0'
  ], 'server');
  api.addFiles([
    'ConsoleReporter.js',
    'main.js'
  ], 'server');
});
