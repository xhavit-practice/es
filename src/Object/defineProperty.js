'use strict';
const { invoke, errorHandlerFactory } = require('../../util/index');

const example = {};
Object.defineProperty(example, 'prop', {
    // 数据描述符(data descriptors)：
    // 控制descriptor是否可以修改，property是否可以删除
    // configurable: false,
    // 控制property是否可以被枚举(for...in/Object.keys())
    // enumerable: false,
    // 控制descriptor中的value是否能被赋值运算符改变，可选
    // writable: false,
    // property对应的值，可以是任何有效的JavaScript值，可选
    // value: undefined,
    //
    // 存取描述符(accessor descriptors)：
    // 当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值
    // get: undefined,
    // 当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象
    // set: undefined,
});

/**
 * 测试修改configruable为false的属性的descriptor，以及尝试删除属性
 */
function configurable() {
    const obj = {};
    Object.defineProperty(obj, 'foo', { configruable: false });
    Object.defineProperty(obj, 'bar', {
        configruable: false,
        writable: true,
    });

    // 修改descriptors的时候会报错，writable除外，如果{ configurable: false, writable: true }，修改writable为false是允许的
    try {
        Object.defineProperty(obj, 'foo', { configurable: true });
    } catch (error) {
        errorHandlerFactory('修改foo的configurable')(error);
    }

    try {
        Object.defineProperty(obj, 'foo', { enumerable: true });
    } catch (error) {
        errorHandlerFactory('修改foo的enumerable')(error);
    }

    try {
        Object.defineProperty(obj, 'foo', { writable: true });
    } catch (error) {
        errorHandlerFactory('修改foo的writable')(error);
    }

    try {
        Object.defineProperty(obj, 'foo', { value: 1 });
    } catch (error) {
        errorHandlerFactory('修改foo的value')(error);
    }

    try {
        Object.defineProperty(obj, 'foo', {
            get() {
                return 1;
            },
        });
    } catch (error) {
        errorHandlerFactory('修改foo的get')(error);
    }

    try {
        Object.defineProperty(obj, 'foo', {
            set(val) {
                return val;
            },
        });
    } catch (error) {
        errorHandlerFactory('修改foo的set')(error);
    }

    try {
        delete obj.foo;
    } catch (error) {
        errorHandlerFactory('删除obj.foo')(error);
    }

    Object.defineProperty(obj, 'bar', { writable: false });
    console.log('修改bar的writable: 不报错');
}

/**
 * 测试enumerable descriptor
 */
function enumerable() {
    const obj = { foo: 1, bar: 2 };
    Object.defineProperty(obj, 'foo', { enumerable: false });

    console.log('// for...in');
    for (const k in obj) {
        console.log(k, obj[k]);
    }

    console.log('// Object.key()');
    console.log(Object.keys(obj));
}

/**
 * 测试writable descriptor
 * writable为false时，可以通过value descriptor修改属性的值，但是不能通过赋值运算符修改
 */
function writable() {
    const obj = { foo: 1 };
    Object.defineProperty(obj, 'foo', { writable: false });

    try {
        obj.foo = 2;
    } catch (error) {
        errorHandlerFactory('修改foo为2')(error);
    }

    console.log('通过value descriptor修改value为3');
    Object.defineProperty(obj, 'foo', { value: 3 });
    console.log(obj.foo);
}

/**
 * 测试value descriptor
 * writable为false时也可以修改
 */
function value() {
    const obj = { foo: 1 };
    Object.defineProperty(obj, 'foo', { configurable: true, writable: false });

    console.log('// 修改value descriptor为2');
    Object.defineProperty(obj, 'foo', { value: 2 });
    console.log(obj.foo);
}

/**
 * 测试get descriptor
 */
function get() {
    const obj = { _foo: 1 };
    Object.defineProperty(obj, 'foo', {
        get() {
            console.log('// 获取foo的值');
            return this._foo + 1;
        },
    });

    console.log(obj.foo);
}

/**
 * 测试set descriptor
 */
function set() {
    const obj = { _foo: 1 };
    console.log('// _foo的值为: ');
    console.log(obj._foo);
    Object.defineProperty(obj, 'foo', {
        set(val) {
            this._foo = val + 1;
        },
    });

    console.log('// 赋值foo为4');
    obj.foo = 4;
    console.log('// _foo的值为: ');
    console.log(obj._foo);
}

invoke(configurable)();
invoke(enumerable)();
invoke(writable)();
invoke(value)();
invoke(get)();
invoke(set)();
// TODO: 还差属性继承的部分
