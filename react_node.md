# React框架中涉及JS的知识点

## 回调函数

可以简单理解为一个函数为一个代码块，不同代码块的执行是异步的，为了确保数据同步获得，就是所谓的按照顺序执行，就需要通过传入一个函数到一个需要按照顺序得到结果的函数当中，确保两个函数合并的代码块能够一起执行获得结果

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

## react 事件

传统DOM中事件属性的JS代码在事件触发时执行，React事件的属性值需要的是一个回调函数，函数会在触发时执行

React事件也会产生事件对象，随意使用参数可接受，一般使用 `e` 来接受此对象。

```javascript
const clickHandler = (e)=> {
    e.preventDefault(); // 取消默认行为
    e.stopPropagation(); // 取消事件的传播
    // 其他代码
};
```

## props

props中的属性是只读属性是无法修改的，起到组件传递参数的作用，标签体内容也可以设置为props的一个属性，叫做children，可以通过props.children来获取标签体的内容

## state

数据发生变化时，页面也会随着数据一起变化

* 值改变，会引发render
* 值只属于当前组件，其他组件无法访问

`useState()`返回两个参数，用解构赋值接受为一个变量名，一个修改变量名的函数，通常为 `setVarible` ,`useState`需要一个新的state值作为参数，调用后会触发组件的重新渲染，从而使得页面刷新，在每次的重新渲染中都会使用新的state值作为参数。

当我们修改一个state的值而需要依赖于前边的值进行计算时，最安全的方式就是通过回调函数而不是直接修改，`setXXX()`是异步的，因此要使用回调函数确保顺序执行

 `setCount(prevState => prevState+1);`

`prevState`可以用其他变量名代替

## ref

React中所有的操作默认都是在React元素上进行,虽然如此，在React中依然为我们提供了可以直接访问原生DOM对象的方式。ref就是干这个事的，能不用就不用，实在非得操作也尽量是那些不会对数据产生影响的操作，像是设置焦点、读取信息等

`useRef()` 和 `ref` 两个要搭配使用，才能确定引用的DOM对象，

## 处理表单

在开发中使用双向绑定的表单项是最佳实践,React中被称为受控组件

## portal

ReactDom.createPortal() 解决子组件渲染展示问题

## React中的css

内联、外联、css module

## context

Context类似于JS中的全局作用域，可以将一些公共数据设置到一个同一个Context中，使得所有的组件都可以访问到这些数据。

## effect副作用

React的严格模式，在处于开发模式下，会主动的重复调用一些函数，以使副作用显现。所以在处于开发模式且开启了React严格模式时，这些函数会被调用两次

函数体中的代码会在组件渲染前执行，而 `useEffect()`中的代码是在组件渲染后才执行，这就避免了代码的执行影响到组件渲染

哪些代码不能直接写在组件内部呢？像是：获取数据、记录日志、检查登录、设置定时器等。简单来说，就是那些和组件渲染无关，但却有可能对组件产生副作用的代码。

常用方法，写查询API接口使用，如下，且用于自定义hook

```javascript
//useApi.js
import React, { useEffect, useState } from 'react'
// 模拟请求
const getList = (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('query', query)
      resolve([6, 7, 8, 9, 10])
    }, 3000)
  })
}
// 自定义 hook
const useApi = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5])
  const [query, setQuery] = useState('')

  useEffect(() => {
    (async () => {
      const data = await getList()
      console.log('data', data)
      setData(data)
    })()
  }, [query])

  return [{ data }, setQuery];
}

export default useApi




//App.js
import React from 'react'
import useApi from './useApi'

function App() {
  const [{ data }, setQuery] = useApi()
  return (
    <div className="App">
      {
        data.map((item, index) => <span key={index}>{item}</span>)
      }
      <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder='请输入搜索值' />
    </div>
  )
}

export default App

```

## useReduce

```javascript
 const [count, countDispath] = useReducer(reducer,1);
<button onClick={()=>countDispath({type:'sub'})}>-</button>
//两行代码学会使用，解决state复杂更新的逻辑，简单更新不需要用。
```

## useMemo()

React组件会在两种情况下发生重新渲染。第一种，当组件自身的state发生变化时。第二种，当组件的父组件重新渲染时；

为了减少子组件的渲染成本，React为我们提供了一个方法 `React.memo()`。该方法是一个高阶函数，可以用来根据组件的props对组件进行缓存，当一个组件的父组件发生重新渲染，而子组件的props没有发生变化时，它会直接将缓存中的组件渲染结果返回而不是再次触发子组件的重新渲染，这样一来就大大的降低了子组件重新渲染的次数，memo只会根据props判断是否需要重新渲染，和state和context无关，state或context发生变化时，组件依然会正常的进行重新渲染。

`useMemo()` 包围起来的变量会放入缓存中进行监控比较,这便是 `useMemo` 的作用，它相当于把父组件需要传递的参数做了一个标记，无论父组件其他状态更新任何值，都不会影响要传递给子组件的对象。

`export default React.memo(B);`

## useCallback()

`useCallback()`可以缓存函数实例，`useMemo()`是用来缓存变量的


## Strapi

使用网页图形化界面，创建接口数据使用

## fetch API

React中并没有为我们提供向服务器中发送请求的方法（因为这本来就不是它所关注的事情）。所以在React中发送请求的方式和传统项目其实是一致的，无非就是使用浏览器自带的Ajax、Fetch或者是类似于Axios的第三方框架。

## 自定义hook

## redux

Redux可以理解为是reducer和context的结合体，使用Redux即可管理复杂的state，又可以在不同的组件间方便的共享传递state。当然，Redux主要使用场景依然是大型应用，大型应用中状态比较复杂，如果只是使用reducer和context，开发起来并不是那么的便利，此时一个有一个功能强大的状态管理器就变得尤为的重要。它并不是只能在React使用，而是可以应用到任意的JS应用中（包括前端JS，和服务器中Node.js）

Redux的核心思想中有一条叫做“单一数据源”，也就是所有的state都会存储到一课对象树中，并且这个对象树会存储到一个store中。所以到了React中，组件只需获取到store即可获取到Redux中存储的所有state。
