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
 * @param {String} contentType POST传值类型
 * @return {JSON}
 */
function parseToJson (reqStr, contentType) {
  if (contentType.indexOf('multipart/form-data') !== -1) {
    return toJson.formdata(reqStr)
  } else {
    return toJson.defaut(reqStr)
  }
}

/**
 * 将类GET参数字符串（name=cc&age=12）转换为JSON格式
 * @param {String} reqStr 参数字符串
 * @param {String} contentType POST传值类型
 * @return {String}
 */
function parseToStr (reqStr, contentType) {
  if (contentType.indexOf('multipart/form-data') !== -1) {
    return toStr.formdata(reqStr)
  } else {
    return toStr.defaut(reqStr)
  }
}

let toJson = {
  /**
   * @description form-data
   */
  'formdata': function (reqStr) {
    let parsed = {}
    let reqArr = reqStr.split('=')
    reqArr.shift()
    reqArr.forEach(item => {
      let itemList = item.match(/[\w_\u4e00-\u9fa5]+/g)
      parsed[decodeURIComponent(itemList[0])] = decodeURIComponent(itemList[1])
    })
    return parsed
  },
  /**
   * @description file
   */
  'file': function (reqStr) {
    // loading
  },
  /**
   * @description application/x-www-form-urlencoded 默认
   */
  'defaut': function (reqStr) {
    let parsed = {}
    reqStr.split('&').forEach(item => {
      let itemList = item.split('=')
      if (itemList.length === 2)
        parsed[decodeURIComponent(itemList[0])] = decodeURIComponent(itemList[1])
    })
    return parsed
  }
}

let toStr = {
  /**
   * @description form-data
   */
  'formdata': function (reqStr) {
    let parsed = ''
    let reqArr = reqStr.split('=')
    reqArr.shift()
    reqArr.forEach((item, index) => {
      if (index > 0) parsed += '&'
      let itemList = item.match(/[\w_\u4e00-\u9fa5]+/g)
      parsed += decodeURIComponent(itemList[0])
      parsed += '='
      parsed += decodeURIComponent(itemList[1])
    })
    return parsed
  },
  /**
   * @description file
   */
  'file': function (reqStr) {
    // loading
  },
  /**
   * @description application/x-www-form-urlencoded 默认
   */
  'defaut': function (reqStr) {
    return decodeURIComponent(reqStr)
  }
}

module.exports = async function (ctx, next) {
  if (ctx.method !== 'POST') return await next()
  if (ctx.submit !== undefined || ctx.request.submit !== undefined) return await next()
  await new Promise((resolve, reject) => {
    let contentType = ctx.request.header['content-type']
    let postdata = ''
    try {
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener('end', function () {
        ctx.submitstring = ctx.request.submitstring = parseToStr(postdata, contentType)
        ctx.submit = ctx.request.submit = parseToJson(postdata, contentType)
        resolve(1)
      })
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
  await next()
}
