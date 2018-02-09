## koa-postparse
koa-postparse middleware can parse koa(Node.js) POST params. 

As if String `'name=luwuer&age=18'` or JSON`{name: 'luwuer', age: 18}`. And store the parsed data into ctx.submitstring/ctx.request.submitstring or ctx.submit/ctx.request.submit, so that you can use data just like GET do. 


该中间件用于把koa(Node.js) POST请求传递的参数解析为String或JSON，并且调用原则遵循GET请求：
- 获取String格式参数：`ctx.submitstring/ctx.request.submitstring //'name=luwuer&age=18'`
- 获取JSON格式参数：`ctx.submit/ctx.request.submit //{name: 'luwuer', age: 18}`


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
        // the parsed data will store in ctx.submit/ctx.request.submit 
        // just like GET (which store in ctx.query / ctx.request.query)
        ctx.body = {
            'ctx.submit': ctx.submit,
            'ctx.request.submit': ctx.request.submit,
            'ctx.submitstring': ctx.submitstring,
            'ctx.request.submitstring': ctx.request.submitstring,
        }
    }
})
```
