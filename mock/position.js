const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    // 昨日持仓
    'yesterdayVol|1-309': 100,
    // 今日持仓
    'todayVol|1-400':100,
    // 占用保证金
    'occupationAvgPrice|2000-20000':2000,
    // 持仓成本
    'positionAvgPrice|1000-3000':2000,
    // 浮动盈亏
    'openPI':5,
    // 全部持仓
    'allQuantity|1000-3000':1000,
    // 持仓方向
    'direction|0-2':0,
    // 可卖持仓
    'availableQuantiy|4000-5000':4000,
    // 合约对象
    'symbol|1-309': 100,
    // 冻结数量
    'frozenQuantity|1-9000':200,
    // 仓位的创建时间
    'createTime':'@datetime',
    // 资金账号
    'accountId':'@id',
    // 策略编号
    'StrategyId':'@id',
    // 通道
    'channel':'@word'

    
  }]
})


module.exports = [
  {
    url: '/api/position',
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
