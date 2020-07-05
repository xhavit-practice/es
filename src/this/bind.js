'use strict';
const { invoke, errorHandlerFactory } = require('../../util/index');
const obj1 = { foo: 1 };
const obj2 = { foo: 2 };
const obj3 = { foo: 3, test };

function test() {
    console.log(this.foo);
}

test.bind(obj1)();
test.bind(obj1).bind(obj2)();
obj3.test.bind(obj3)();
new (test.bind(obj2))();
