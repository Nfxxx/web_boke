const Mock = require('mockjs')

const data = Mock.mock({
  'items|150': [{
    // 资金账号
    'accountId|1-309': 100,
    // 合约代码
    'symbol|1-309': 100,
    'originId|+1': 1,
    'algo':'@id',
    'orderStatus|0-10':1,
    'insertTime': '@datetime',
    'filledQuantity|30-500': 30,

    'avgPrice|2000-9000': 2000,
    'precatoryPrice|2000-9000':2000,
    'inputNumber|2000-9000':2000,
    'orderType|1': [
      0,
      1,
      2
    ],
    'orderAction|0-8': 1,
    'strategyId|1-309': 100,
    'runingStatus|1': [
      '已关闭',
      '正常',
      '异常'
    ],
    'errorMsg':'@csentence(3, 5)',
    'latestUpdateTime': '@datetime',
    'user': '@word',
    'channel':'@word'
  }]
})


module.exports = [
  {
    url: '/api/order/parent',
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
