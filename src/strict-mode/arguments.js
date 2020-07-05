/**
 * 正常模式：修改参数，会改变arguments的值
 * @date 2020-04-12
 * @param {any} arg
 * @returns {any}
 */
function modifyParam(arg) {
    arg = 42;
    return [arg, arguments[0]];
}
console.log('modifyParam: ', modifyParam(17));

/**
 * 严格模式：修改参数，不会改变arguments的值
 * @date 2020-04-12
 * @param {any} arg
 * @returns {any}
 */
function modifyParamUs(arg) {
    'use strict';
    arg = 42;
    return [arg, arguments[0]];
}
console.log('modifyParamUs: ', modifyParamUs(17));

/**
 * 正常模式：修改arguments，会改变参数的值
 * @date 2020-04-12
 * @param {any} arg
 * @returns {any}
 */
function modifyArguments(arg) {
    arguments[0] = 42;
    return [arg, arguments[0]];
}
console.log('modifyArguments: ', modifyArguments(17));

/**
 * 严格模式：修改arguments，不会改变参数的值
 * @date 2020-04-12
 * @param {any} arg
 * @returns {any}
 */
function modifyArgumentsUs(arg) {
    'use strict';
    arguments[0] = 42;
    return [arg, arguments[0]];
}
console.log('modifyArgumentsUs: ', modifyArgumentsUs(17));

/**
 * 正常模式：arguments.callee 指向当前正在执行的函数。这个作用很小：直接给执行函数命名就可以了
 * @date 2020-04-13
 * @returns {any}
 */
function callee() {
    return arguments.callee;
}
console.log('callee: ', callee());

/**
 * 严格模式：arguments.callee 是一个不可删除属性，而且赋值和读取时都会抛出异常
 * @date 2020-04-13
 * @returns {any}
 */
function calleeUs() {
    'use strict';
    try {
        return arguments.callee;
    } catch (error) {
        return error;
    }
}
console.log('calleeUs: ', calleeUs());
