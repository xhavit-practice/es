'use strict';
const { invoke, errorHandlerFactory } = require('../../util/index');
const obj = { foo: 1, test };

function test() {
    console.log(this.foo);
}

obj.test();
