'use strict';
const { invoke, errorHandlerFactory } = require('../../util/index');

function MyClass() {}

Object.defineProperty(MyClass.prototype, 'x', {
    value: 1,
})

MyClass.prototype.x = 1;
const myClass = new MyClass();
console.log(myClass);
console.log(myClass.x);
myClass.x = 33;
console.log(myClass);
