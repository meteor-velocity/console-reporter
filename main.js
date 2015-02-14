/* globals
   VelocityAggregateReports: false,
   ConsoleReporter: false
 */

var consoleReporter = new ConsoleReporter();

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
    .find({framework: aggregateReport.name})
    .fetch();

  consoleReporter.reportSummary(
    aggregateReport.name,
    testReports
  )
}
