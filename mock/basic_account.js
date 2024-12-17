const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    // 产品ID
    "productId":'@id',
    // 资金账号
    'accountId':'@id',
    // 资金密码
    'password':'@word',
    // 账号名称
    'name|1-309': 100,
    // 经纪商名称
    'brokerName':'@name',
    // 经纪商代码
    'brokerCode|2000-20000':2000,
    // 行情交易地址
    'quoteUrl':'@url',

    // 是否需要验证
    'authRequired':'@boolean',

    // 验证码
    'authCode':'@word(6)',

    // 账户类型
    'accountType|0-4':0,

    // 账号类型
    'accountEnvType|0-2':0,
    
    // 持仓获取路径
    'holdingUrl':'@url',

    // 是否启用
    'active':'@boolean',

    "channels": "@word"
  }]
})


module.exports = [
  {
    url: '/api/account/basicinfo',
    type: 'get',
    response: config => {
      const items = data.items
      // console.log(data)
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
