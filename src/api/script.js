import request from '@/utils/request'
import constObj from './baseconfig'

//运行换仓策略
export function fixTimeDuration(data) {
  return request({
    url: constObj.SHORT_URL + 'run/fix/time_duration',
    method: 'post',
    data
  })
}

//运行特定组合
export function fixPortfolio(data) {
  return request({
    url: constObj.SHORT_URL + 'run/fix/portfolio',
    method: 'post',
    data
  })
}

//换仓策略测试
export function rebalanceStrategy() {
  return request({
    url: constObj.SHORT_URL + 'test/rebalance/strategy',
    method: 'post',
  })
}

//shorting策略测试
export function shortingStrategy(data) {
  return request({
    url: constObj.SHORT_URL + 'test/shorting/strategy',
    method: 'post',
    data
  })
}

