/**
 * koa-postparse - index.js
 * Copyright(c) 2018
 * MIT Licensed
 *
 * @author  luwuer<html6@foxmail.com>
 */

'use strict'

/**
 * 将类GET参数字符串（name=cc&age=12）转换为JSON格式
 * @param {String} reqStr 参数字符串
 * @return {JSON}
 */
function parseReqStr (reqStr) {
  let reqData = {}
  reqStr.split('&').forEach(item => {
    let itemList = item.split('=')
    reqData[itemList[0]] = decodeURIComponent(itemList[1])
  })
  return reqData
}

module.exports = async function (ctx, next) {
  if (ctx.method !== 'POST') return await next()
  if (ctx.submit !== undefined || ctx.request.submit !== undefined) return await next()
  await new Promise((resolve, reject) => {
    let postdata = ''
    try {
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener('end', function () {
        let parseData = parseReqStr(postdata)
        ctx.submitstring = ctx.request.submitstring = postdata
        ctx.submit = ctx.request.submit = parseData
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
  await next()
}
