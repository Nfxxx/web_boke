const Mock = require('mockjs')

const data = Mock.mock([{
    id: '@id',
    'ems|1': "@boolean",
    'algo|1': "@boolean",
    'risk|1': "@boolean"
}])

module.exports = [
  {
    url: '/api/index',
    type: 'get',
    response: config => {
      // const items = data.items
      console.log("mock,  ", data)

      return {
        code: 20000,
        data
      }
    }
  }
]
