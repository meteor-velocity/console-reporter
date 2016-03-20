ConsoleReporter = function () {

};

_.extend(ConsoleReporter.prototype, {

  reportSummary: function (name, testReports) {
    var passedTestReports = _.filter(testReports, function (testReport) {
      return testReport.result === 'passed';
    });
    var failedTestReports = _.filter(testReports, function (testReport) {
      return testReport.result === 'failed';
    });
    this.reportPassed(name, passedTestReports);
    this.reportFailed(name, failedTestReports);
  },

  reportPassed: function (name, testReports) {
    var totalTime = this.formatTime(this.totalTime(testReports));
    var summary =  name + ': ' + testReports.length + ' tests passed';
    if (testReports.length > 0) {
      summary += ' (' + totalTime + ')';
    }
    console.log(summary);
  },

  reportFailed: function (name, testReports) {
    if (testReports.length > 0) {
      var summary =  name + ': ' + testReports.length + ' tests failed';
      console.error(summary);
      _.forEach(testReports, this.reportOneFailed.bind(this));
    }
  },

  reportOneFailed: function (testReport) {
    console.error(testReport.fullName || testReport.name);
    console.error(testReport.failureMessage);
    console.error(testReport.failureStackTrace);
  },

  totalTime: function (results) {
    var firstTimeStamp, lastTimestamp, lastDuration;
    _.each(results, function (result) {
      if (!firstTimeStamp ||  firstTimeStamp > result.timestamp.getTime()) {
        firstTimeStamp = result.timestamp.getTime();
      }
      if (!lastTimestamp ||  lastTimestamp < result.timestamp.getTime()) {
        lastTimestamp = result.timestamp.getTime();
        lastDuration = result.duration;
      }
    });

    return lastTimestamp + lastDuration - firstTimeStamp;
  },

  formatTime: function (ms) {
    if (ms >= 1000) {
      return Math.round(ms / 1000) + 's';
    } else {
      return ms + 'ms';
    }
  }
});
