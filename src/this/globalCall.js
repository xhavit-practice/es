const { invoke, errorHandlerFactory } = require('../../util/index');

/**
 * 正常模式：直接调用函数，this在node中指向global对象，在browser中指向window对象
 */
function test() {
    console.log(this.setTimeout);
}

/**
 * 严格模式，直接调用函数，this为undefined
 */
function testUs() {
    'use strict';

    try {
        console.log(this.setTimeout);
    } catch (error) {
        errorHandlerFactory('在全局调用testUs函数')(error);
    }
}

invoke(test)();
invoke(testUs)();
