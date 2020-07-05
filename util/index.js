'use strict';

/**
 * 执行函数的工具方法，增加console标记
 * @param {Function} fn 待执行的函数
 */
function invoke(fn, ctx) {
    console.log(`\n=========== invoke function ${fn.name} ===========\n`);
    return fn;
}

/**
 * 提示信息工厂函数
 * @param {String} message 提示信息
 */
function errorHandlerFactory(message) {
    return function errorHandler(e) {
        console.log(message + ':', e.message);
    };
}

module.exports = {
    invoke,
    errorHandlerFactory,
};
