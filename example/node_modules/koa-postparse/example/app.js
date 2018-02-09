/**
 * koa-postparse - index.js
 * Copyright(c) 2018
 * MIT Licensed
 *
 * @author  luwuer<html6@foxmail.com>
 */

'use strict'

const Koa = require('koa')
const parsePostData = require('koa-postparse')
// const parsePostData = require('./postparse')

const app = new Koa()

app.use(parsePostData)
app.use(async ctx => {
  if (ctx.method === 'GET') {
    let html = `
      <h1>postparse test</h1>
      <form method="POST" action="/">
        <p>name</p>
        <input name="name" /><br/>
        <p>age</p>
        <input name="age" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.method === 'POST') {
    ctx.body = ctx.submit
    // ctx.body = ctx.request.submit
  } else {
    ctx.body = '<h1>404~</h1>'
  }
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
