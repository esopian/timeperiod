timeperiod
==========

Experiments in timing and profiling Node.js functions.

This project was created to help with fast debugging and lightweight profiling of Node.js applications.  Track down your slowest functions or apandoned callbacks quickly.

### !!!Experimental!!! - Use for debugging only ###

####Functions####
*  [period](#period)
*  [periodSync](#periodsync)
*  [periodAsync](#periodasync)
*  [periodUntil](#perioduntil)

##Installing##
```
npm install timeperiod
```

##Include##
This module will extend the `Function` prototype.  You only need to include once at the beginning of your application or you can include and use the export object directly.

```
var period = require('timeperiod');

  //period.periodSync()
  //period.periodAsync();
  //period.periodUntil();
```

##Basic Usage##
The core functions can be used at time of execution or their constructors can be used to return a new function can can be called directly or passed as arguments.  The constructor is useful in conjunction with flow control libraries like [Aync](https://github.com/caolan/async)

__Attach to a function at runtime:__

_example:_
```
function hello() {
    console.log("My Name is Node. Nice to meet you.");
}

hello.period();
```
_output:_
>My Name is Node. Nice to meet you.
>
>hello: 1ms


__Construct a new function:__

_example:_
```
function hello() {
    console.log("My Name is Node. Nice to meet you.");
}

var newHello = new Function.period(hello);
newHello();
```
_output:_
>My Name is Node. Nice to meet you.
>
>hello: 1ms

__Async:__ functions that rely on callbacks can be called in the same manner or called diectly with `periodAsync` if the auto-detection is not working.

__Attach to a function at runtime:__

_example:_
```
function waitHello(callback) {
    setTimeout(function() {
        console.log("My Name is Node. Nice to meet you.");
        return callback();
    }, 1000);
}

waitHello.period(function(){
    console.log("Done");
});
```
_output:_
>My Name is Node. Nice to meet you.
>
>waitHello: 1002ms
>
>Done


__Construct a new function:__

_example:_
```
function waitHello(callback) {
    setTimeout(function() {
        console.log("My Name is Node. Nice to meet you.");
        return callback();
    }, 1000);
}

var newWaitHello = new Function.period(waitHello);
newWaitHello(function(){
    console.log("Done");
});
```
_output:_
>My Name is Node. Nice to meet you.
>
>waitHello: 1002ms
>
>Done


### <a id="period"></a>`.period(*)`
Will attempt to automatically detect whether function is a sync or async call and attach to either the return or callback.

### <a id="periodsync"></a>`.periodSync(*)`
Call a function explicitly profiling the time until return

### <a id="periodasync"></a>`.periodAsync(*)`
Call a function explicitly profiling the time until `callback`.  The callback must be the last argument

### <a id="perioduntil"></a>`.periodUntil(func, label)`
Will return a function and calculate the time from construction until the function is called.  Does not matter if function is Sync or Async.  Useful for attaching in a flow control function.  Optionally takes a label as the second argument.

_Example use with Async:_
```
async.series([
    function workFunction(doneWaiting) {
        doneWaiting = Function.periodUntil(doneWaiting, 'First Async Call');

        //Do some work
        var i = 0;
        while(i<=100) { i++; }

        //Set a timer
        setTimeout(function(){
            return doneWaiting();
        }, 2000);
    }
],
function(err) {
    if(!err) console.log('Done without errors');
});

```
_output:_
>First Async Call (wait): 2001ms
>
>Done without errors


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/esopian/timeperiod/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

