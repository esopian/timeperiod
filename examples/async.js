var period = require('../index');

function waitHello(callback) {
    setTimeout(function() {
        console.log("My Name is Node. Nice to meet you.");
        return callback();
    }, 1000);
}

waitHello.period(function(){
    console.log("Done");
});