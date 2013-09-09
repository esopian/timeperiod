var period = require('../index');

describe('Scope', function () {
    it('should pass scope correctly', function (done) {

        var parent = function() {
            this.testItem = "goodvalue";
        };
        parent.prototype.constructor = parent;
        parent.prototype.test = function(callback) {
            return callback((this.testItem == "goodvalue"));
        };

        var newTest = new parent();

        newTest.test(function(val){consol.log(val);});
        newTest.test.period(function(reply){
            console.assert(reply == true); //Should be true if scope is correct
            done();
        });

    });
});