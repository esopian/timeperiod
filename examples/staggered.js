var period = require('../index');

function longPause(callback) {
	setTimeout(function(){
		//Do Work
		return callback();
	}, 2000);
}


function shortPause(callback) {
	setTimeout(function(){
		//Do Work
		return callback();
	}, 100);
}

//Each Call will return with a uuid
//  shortPause calls should all return before longPause
longPause.period(function(){});
shortPause.period(function(){});
longPause.period(function(){});
shortPause.period(function(){});
longPause.period(function(){});
shortPause.period(function(){});