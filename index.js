var uuid = require('node-uuid');
//  _____ _                ____           _           _
// |_   _(_)_ __ ___   ___|  _ \ ___ _ __(_) ___   __| |
//   | | | | '_ ` _ \ / _ \ |_) / _ \ '__| |/ _ \ / _` |
//   | | | | | | | | |  __/  __/  __/ |  | | (_) | (_| |
//   |_| |_|_| |_| |_|\___|_|   \___|_|  |_|\___/ \__,_|

["period", "periodSync", "periodAsync"].forEach(function(item){
	Function[item] = function(func) {
		var self = this;
		return function() { return func[item].apply(self, arguments); };
	};
	Function[item].constructor = Function[item];
	module.exports[item] = Function[item];
});

/**
 * periodUntil constructs a new function that will calculate
 *  the time from construction until the function is called.
 * @param  {Function} sourceFunc Function that is being monitored
 * @param  {String}   label      Label to be used to output
 * @return {Function}            New function to use in place of sourceFunc
 */
module.exports.periodUntil = Function.periodUntil = function(sourceFunc, label) {
    var self = this;
    var timecall = [uuid.v4(),(label || sourceFunc.name || ("Anon") )," (wait)"].join(' ');
    console.time(timecall);
    return function() {
        console.timeEnd(timecall);
        return sourceFunc.apply(self, arguments);
    };
};
Function.periodUntil.constructor = Function.periodUntil;

/**
 * Calculate the time of execution for synchronous functions.
 * @param  {*} arguments Arguments to pass to source function
 * @return {*}           return value of the source function
 */
Function.prototype.periodSync = function() {
	var timecall = [uuid.v4(),(this.name || "Anon")].join(' ');
	console.time(timecall);
	var output = this.apply(this, arguments);
	console.timeEnd(timecall);
	return output;
};

/**
 * Calculate the time of execution for asynchronous functions.
 * Expects standard Node.js pattern (last argument is a callback)
 * @param  {*} arguments Arguments to pass to source function
 * @return {*}           return value of the source function
 */
Function.prototype.periodAsync = function() {
	var self     = this;
	var timecall = [uuid.v4(),(this.name || "Anon")].join(' ');
	var callback = arguments[arguments.length-1];
	var argArray = arguments;
	argArray[arguments.length-1] = function() {
		console.timeEnd(timecall);
		return callback.apply(self,arguments);
	};
	console.time(timecall);
	return this.apply(this, argArray);
};

/**
 * Calculate the time of execution for asynchronous and synchronous functions.
 * Will auto-detect sync or async based on the existance of a callback function.
 * @param  {*} arguments Arguments to pass to source function
 * @return {*}           return value of the source function
 */
Function.prototype.period = function() {
	if(typeof arguments[arguments.length-1] === 'function') {
		return Function.prototype.periodAsync.apply(this, arguments);
	} else {
		return Function.prototype.periodSync.apply(this, arguments);
	}
};