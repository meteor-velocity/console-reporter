Jasmine.onTest(function () {
  'use strict';

  var getFakeTestReport = function () {
    return {
      timestamp: new Date(),
      duration: 0
    };
  };

  var getFakeTestReports = function (count) {
    var testReports = [];
    for (var i = 0; i < count; i++) {
      testReports.push(getFakeTestReport());
    }
    return testReports;
  };

  describe('Console Reporter', function () {

    beforeEach(function () {
      this.consoleReporter = new ConsoleReporter();
    });


    describe('reportPassed', function () {

      it('prints the testing framework name', function () {

        spyOn(console, 'log');

        var testingFrameworkName = 'my-testing-framework';

        var testReports = [];

        this.consoleReporter.reportPassed(
          testingFrameworkName,
          testReports
        );

        expect(console.log).toHaveBeenCalledWith(
          'my-testing-framework: 0 tests passed'
        );

      });

      it('prints the number of tests that passed', function () {

        spyOn(console, 'log');

        var testingFrameworkName = 'my-testing-framework';

        var testReports = getFakeTestReports(3);

        this.consoleReporter.reportPassed(
          testingFrameworkName,
          testReports
        );

        expect(console.log).toHaveBeenCalledWith(
          'my-testing-framework: 3 tests passed (0ms)'
        );

      });

      describe('when tests exist', function () {
        it('prints the total time', function () {

          spyOn(this.consoleReporter, 'totalTime').and.returnValue(1000);
          spyOn(this.consoleReporter, 'formatTime').and.returnValue('1s');
          spyOn(console, 'log');

          var testingFrameworkName = 'my-testing-framework';

          var testReports = getFakeTestReports(2);

          this.consoleReporter.reportPassed(
            testingFrameworkName,
            testReports
          );

          expect(this.consoleReporter.totalTime).toHaveBeenCalled();
          expect(this.consoleReporter.formatTime).toHaveBeenCalledWith(1000);
          expect(console.log).toHaveBeenCalledWith(
            'my-testing-framework: 2 tests passed (1s)'
          );

        });
      });

      describe('when no tests exist', function () {
        it('does not print the total time', function () {

          spyOn(console, 'log');

          var testingFrameworkName = 'my-testing-framework';

          var testReports = [];

          this.consoleReporter.reportPassed(
            testingFrameworkName,
            testReports
          );

          expect(console.log).toHaveBeenCalledWith(
            'my-testing-framework: 0 tests passed'
          );

        });
      });

    });


    describe('reportOneFailed', function () {

      it('prints the test name, failure message and stack trace', function () {

        spyOn(console, 'error');

        var testReport = {
          name: 'Test name',
          failureMessage: 'Failure message',
          failureStackTrace: 'Stack trace'
        };

        this.consoleReporter.reportOneFailed(testReport);

        var calls = console.error.calls;
        expect(calls.count()).toBe(3);
        expect(calls.argsFor(0)).toEqual([testReport.name]);
        expect(calls.argsFor(1)).toEqual([testReport.failureMessage]);
        expect(calls.argsFor(2)).toEqual([testReport.failureStackTrace]);

      });

    });
  });
});
