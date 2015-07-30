/* globals
   VelocityAggregateReports: false,
   ConsoleReporter: false
 */

var consoleReporter = new ConsoleReporter();
var startTime = new Date();

VelocityAggregateReports
  .find({
    name: {$nin: ['aggregateResult', 'aggregateComplete']},
    result: 'completed'
  })
  .observe({
    added: onComplete,
    changed: onComplete
  });

function onComplete(aggregateReport) {
  var testReports = VelocityTestReports
    .find({
      framework: aggregateReport.name,
      timestamp: {$gt: startTime}
    })
    .fetch();

  if (testReports.length) {
    consoleReporter.reportSummary(
      aggregateReport.name,
      testReports
    );
  }
}
