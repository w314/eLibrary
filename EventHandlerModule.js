// custom event handler that counts the number users
// successfully logged in into the application

// load required modules
const EventEmitter = require('events').EventEmitter;
const util = require('util');

// number of visitors
let visitorCount;

// create VisitorCountClass
// extend EventEmitter class
class VisitorCountClass extends EventEmitter {

    // add constructor
    constructor(initialNo) {
        // first call super() - EventEmitter's constructor
        super();
        this.count = initialNo;
    }

    // add increment method
    increment() {
        this.count++;
        // emits a `visitor` event
        this.emit('visitor');
    }
}


// create object of our custom event class
const visitorCounter = new VisitorCountClass(0);

// with the on() method
// make our registerEventObject listen to the visitor event
// provide function to execute if visitor event happens
// provided function has to be proper function declaration, NOT arrow function
visitorCounter.on('visitor', function() {
    console.log(`The number of people visited: ${this.count}`);
    visitorCount = this.count;
})

// export a visitorCountEvent function
exports.visitorCountEvent = () => {
    // it will invoke the increment method of our registerEventObject
    visitorCounter.increment();
    // it will return the number of visitors
    return visitorCount;
}
