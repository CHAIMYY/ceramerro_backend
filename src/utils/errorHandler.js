class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = ErrorHandler;


//   What is super in JavaScript?
// In JavaScript, super is a special keyword used inside a subclass (a class that extends another class) to call methods from the parent class.
// How super Works in a Constructor
// When a class inherits from another class using extends, the child class must call super() inside its constructor before accessing this. This is because the parent class (Error in this case) needs to be initialized first.