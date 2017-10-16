// 使用as进行重命名
import { a, b, add as newAdd} from './module1'
newAdd(20,30);

// index.js 导入模块 是随意的
import obj from './module2.js'
console.log(obj);

let newObj = {
  ...obj,
  test: 'sdfasdf'
}
console.log(newObj);
console.log(222);