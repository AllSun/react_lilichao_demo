# React框架中涉及JS的知识点

react中推荐使用关键字 const,其次let,最好不用var

let有块作用域，var无块作用域

const具有块级作用域，但只能赋值一次

1. 用于常量，如PI
2. 对于一些对象、函数用const申明，避免被修改，对象值可新增，但已有属性不能被赋值

---

展开,三个点语法，展开数据、展开对象

function sum(...arr)

---

解构赋值

```javascript
let [a,b]=[b,a];

let obj = {
  name:'孙金榜',
  age: '29'
}

const {name,age}=obj;
```

---

箭头函数，弥补普通函数的缺点，能用箭头函数就用箭头函数

```javascript
(参数) => 返回值（有返回值的表达式)
```

特点：

1. 没有arguments(类数组对象，数组的方法没有)参数，普通有
2. this永远指向window对象，箭头函数的this等于外层函数的this
3. 箭头中的this无法通过call()、apply()、bind修改
4. 无法作为构造函数

---

模块化

import、export

---

类

this关键字

---

数组

map()、filter()

---

# React零散知识点

* React元素是不可变对象，一旦创建就不可更改。要修改元素的唯一方式就是创建一个新的元素去替换旧的元素
* diff差分算法进行render

```javascript
React.createElement()

ReactDom.creatRoot()

root.render()
```

JSX（javascript syntax extension)

使用babel解析

```javascript
<script type='text/babel'>
</script>
```

渲染列表

```javascript
const arr = [1,2,3];
const ul = <ul>{arr.map(item => <li key={item}>{item}</li>)}</ul>;
```

标签当中添加列，因为react使用 `diff`算法，如果 `<ul>`中元素位置变动，无法追踪到差异会导致重新渲染一遍，降低效率，因此最好给 `<li>`添加上 `key`用于标识不同元素，可以再浏览器console中查看是否有 `unique key`警告

---

react 事件

传统DOM中事件属性的JS代码在事件触发时执行，React事件的属性值需要的是一个回调函数，函数会在触发时执行

React事件也会产生事件对象，随意使用参数可接受，一般使用 `e` 来接受此对象。

```javascript
const clickHandler = (e)=> {
    e.preventDefault(); // 取消默认行为
    e.stopPropagation(); // 取消事件的传播
    // 其他代码
};
```

---

props中的属性是只读属性是无法修改的，起到组件传递参数的作用，标签体也可以设置为props的一个属性，叫做children，可以通过props.children来获取标签体的内容

---

state

数据发生变化时，页面也会随着数据一起变化

* 值改变，会引发render
* 值只属于当前组件，其他组件无法访问

`useState()`返回两个参数，用解构赋值接受为一个变量名，一个修改变量名的函数，通常为 `setVarible` ,`useState`需要一个新的state值作为参数，调用后会触发组件的重新渲染，从而使得页面刷新，在每次的重新渲染中都会使用新的state值作为参数。

当我们修改一个state的值而需要依赖于前边的值进行计算时，最安全的方式就是通过回调函数而不是直接修改

`setCount(prevState => prevState+1);`

---

ref

React中所有的操作默认都是在React元素上进行,虽然如此，在React中依然为我们提供了可以直接访问原生DOM对象的方式。ref就是干这个事的，能不用就不用，实在非得操作也尽量是那些不会对数据产生影响的操作，像是设置焦点、读取信息等

`useRef()` 和 `ref` 两个要搭配使用，才能确定引用的DOM对象，

---

处理表单

在开发中使用双向绑定的表单项是最佳实践,React中被称为受控组件

---

React中的css

内联、外联、css module
