## koa-postparse
koa-postparse middleware can parse koa(Node.js) POST params which is like `'name=luwuer&age=18'` to JSON`{name: 'luwuer', age: 18}`,and store the parsed data into `ctx.submit/ctx.request.submit`. So that you can use data just like GET do. 
And alse you can call `ctx.submitstring/ctx.request.submitstring` to get the primary string data.

该中间件用于把koa(Node.js) POST请求传递的参数(`'name=luwuer&age=18'`)转换为JSON格式的参数(`{name: 'luwuer', age: 18}`)，并且把转换后的参数存储在`ctx.submit/ctx.request.submit`，保持和GET请求一致的格式，方便使用者调用。
当然，如果你想获取字符串数据，调用`ctx.submitstring/ctx.request.submitstring`就行了。


## Installation

Koa-postparse requires node v8.5.4 / koa 2.0.0 or higher for (async/await) support.

[![NPM](https://nodei.co/npm/koa-postparse.png)](https://nodei.co/npm/koa-postparse/)

## Usage
```js
const Koa = require('koa')
const postParse = require('koa-postparse')

let app = new Koa()
app.use(postParse)
app.use(async ctx => {
    if (ctx.method === 'POST') {
        // the parsed data will store in ctx.submit / ctx.request.submit just like GET (which store in ctx.query / ctx.request.query)
        ctx.body = ctx.submit
    }
})
```
