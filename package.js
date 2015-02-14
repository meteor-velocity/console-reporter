Package.describe({
  name: 'velocity:console-reporter',
  version: '0.1.0',
  summary: 'A console reporter for Velocity',
  git: 'https://github.com/meteor-velocity/console-reporter.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.export('ConsoleReporter');
  api.use([
    'underscore',
    'velocity:shim@0.1.0'
  ], 'server');
  api.addFiles([
    'ConsoleReporter.js',
    'main.js'
  ], 'server');
});
