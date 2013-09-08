var period = require('../index');

//Source function can be sync or async
function originalCall() {
	return "I'm a sync call";
}

//Create a new function from the original
var markerCall = Function.periodUntil(originalCall);

//Wait 2seconds before calling the function
setTimeout(function(){
	markerCall();
}, 2000);
