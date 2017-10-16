### es6（7）常用知识点
请打开chrome浏览器控制台，把以下代码复制到控制台运行
1. 块级作用域
```
if (true) {
  var a = 3;
  // let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效
  let b = 4;
}
console.log('a的值是：',a); // 3
console.log(b);	// 报错，b只在大括号起作用
```
2. 常量
```
// 1）常量不可以改变
const b = 3;
b = 4; // 报错，常量不能重新被赋值

// 2) 声明一个常量对象，它的属性值是可以改变的
const obj = {
	a: 2,
	b: 3
}
obj.a = 100; // 不会报错
```
3. 字符串的扩展
```
let userName = '胡儒清';
// 在字符串里任意地方都插入变量 ${userName}
let str = `我的名字叫:${userName}`;
console.log(str);
```
4. 对象的扩展(属性和方法的简洁表达式)
```
let userName = '老胡';
let age = 99;
let person = {
    // 属性键值相同的时候可以像下面这样写
    userName,
    age,
    // es6函数的写法
    say() {
        console.log(this.userName);
    }
}
console.log(person);
```
5. 箭头函数
```
// 1) 箭头函数
const add = (a, b) => {
    return a + b;
}
// 上面的函数等同于
var add = function(a, b) {
    return a + b;
}

let square = (a) => a * a;
// 等同于
var square = function(a) {
    return a * a;
}

// 使用箭头函数this不发生改变
let obj = {
    init() {
        // this指向了obj
        console.log('this指向了', this);
        setTimeout(function() {
            // this发生了改变，指向了window
            console.log('一般函数时：', this);
        }, 1000);

        setTimeout(() => {
            // 使用了箭头函数，this依旧指向obj
            console.log('使用箭头函数时', this);
        }, 2000);
    }
}
obj.init();
```
6. 解构： 可以理解为结构的分解
```
// 1）数组解构
var arr = [2,3,10]
let [a,b,c] = [2,3,10];
// 结构后可以直接使用a，b，c的值
console.log(a,b,c);
```
```
// 2）对象解构
let person = { userName: "ruqing", age: "100" };
let {userName, age} = person;
console.log(userName,age);
```
```
// 3）函数参数是个对象，并且设置了默认值x=2和y=3
const move = ({x=2, y=3}) => {
 	return x + y;
}
move({});	// 5
move({x: 3,y: 8});	// 11
```
7. 类
```
// 1) 类名需要大写
class Animal {
    // 实例化对象的时候会执行构造方法
    constructor(name) {
        this.name = name;
    }
    // es6对象的写法
    say() {
        console.log('动物的名字是' + this.name);
    }
}
// 实例化对象
let dog = new Animal('狗');

// 2) 继承父类
class Cat extends Animal{
    constructor(name,color,age) {
        // 调用父类构造器
        super(name);
        this.color = color;
        this.age = age;
    }
    say() {
        console.log('我是一只猫');
    }
}
let cat = new Cat('咖啡猫','红色',2);
```
8. 模块（输出export 导入import）
```
// 输出模块export
// 1）module1.js 使用export输出模块
export const a = 2;
export const b = 2;
export const add = (num1,num2) => {
    let sum = num1 + num2;
    console.log(sum);
};

// index.js 使用import 导入模块
// 使用export导出模块，导入模块时变量名必须跟导出的模块变量一致，可以使用as进行重命名
import { a, b, add as newAdd} from './module1'
newAdd(20,30);
// 或者像下面这样，obj包含了所有导出的模块
import * as m1 from './module1.js'
console.log(obj);

// 2）module2.js  使用exprot default导出文件
const community = {
    name: '沃土前端社区',
    people: 50
}
export default community;
// index.js 导入模块 是随意的
import obj from './module2.js'
console.log(obj);
```
9. 扩展运算符... 
```
// 1) 用数组接收剩余数值,需放在后面
let remain = (a,b,...c) {
	// a的值为1，b的值为2，c的值为剩下参数组成的数组
    console.log(a,b,c);
}
remain(1,2,3,4,5,6,7);
```
10. promise
```
let flag = true;
// Promise能把异步操作的结果保存起来，供别人来使用
let checkFlag = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        let data = {
            a: 222,
            b: 333
        }
        if (flag) {
            // 满足条件使用resolve把数据返回
            resolve(data);
        } else {
            reject('error');
        }
    },1000)
})

checkFlag.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})
```
11. async await 异步变同步
```
// 1）一个简单的例子
function checkFlag() {
    let flag = true;
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let data = {
                a: 222,
                b: 333
            }
            if (flag) {
                // 满足条件使用resolve把数据返回
                resolve(data);
            } else {
                reject('error');
            }
        },1000)
    })
}

async function getResult(){
    // 异步变同步操作
    try {
        let result = await checkFlag();
        console.log(result);
    } catch(err) {
        console.log(err);
    }
}
getResult();

// 一个实际应用的例子
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
</head>
<body>
    <h3>async wait + Promise的例子</h3>
    <script>
        // 应用场景，我们需要先获取验证码，然后通过验证码去获取用户列表
        const obj = {
            async init() {
                try {
                    let url1 = 'http://www.easy-mock.com/mock/59aba85ee0dc66334199c870/wotu/getVCode';
                    // 首先获取验证码
                    const res1 = await this.doAjax(url1,{});
                    document.write('验证码请求结果：',JSON.stringify(res1));
                    // 然后通过验证码获取用户列表
                    let url2 = 'http://www.easy-mock.com/mock/59aba85ee0dc66334199c870/wotu/userList';
                    let data = {
                        verifyCode: res1.verifyCode
                    }
                    const res2 = await this.doAjax(url2, data);
                    document.write('<br/>用户列表请求结果：',JSON.stringify(res2));
                } catch (e) {
                    alert(e);
                }
            },
            // 发送请求
            doAjax(url, data) {
                return new Promise((resove, reject) => {
                    $.ajax({
                        url,
                        data,
                        dataType: 'json',
                        success: (res) => {
                            resove(res);
                        },
                        error: () => {
                            reject('请求失败:getVCode');
                        }
                    })
                });
            }
        }

        obj.init();
    </script>
</body>
</html>
```