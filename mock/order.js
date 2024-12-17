const Mock = require('mockjs')

const data = Mock.mock({
  'items|3000': [{
    // 资金账号
    'accountId|1-309': 100,
    // 合约代码
    'symbol|1-309': 100,
    // 订单编号
    'order|4000-9999': 4000,

    // 'originId|+1': 1,

    // 券商编号
    'brancher|1-4000': 4000,

    // 订单状态
    'orderStatus|0-10':1,
    // 成交数量
    'filledQuantity|30-500': 30,
    // 委托价格
    'precatoryPrice|2000-9000':2000,
    // 委托数量
    'inputNumber|2000-9000':2000,
    // 订单类型
    'orderType|1': [
      0,
      1,
      2
    ],
    'stockType|1':[
      0,
      1,
      2
    ],
    // 订单方向 
    'orderAction|0-8': 1,
    // 平均成交价
    'avgPrice|2000-9000': 2000,

    // 库存类型
    'stockeType|0-200':20,
    // 算法 
    'algorithm':'@id',
    // 发送时间
    'sendingTime':'@datetime',
    // 交易员
    'trader|1':[
      'lz_0',
      'lz_2',
      'lz_3',
      'lz_4',
      'lz_5',
      'lz_6'
    ],
    'parentId':'@id',
    'orderQid':'@id',
 

    'insertTime': '@datetime',


    'strategyId|1-309': 100
  }]
})


module.exports = [
  {
    url: '/api/order/all',
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
