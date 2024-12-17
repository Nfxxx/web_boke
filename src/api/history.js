import request from '@/utils/request'
import constObj from './baseconfig'

export function getHistoryPOrder(data) {
  return request({
    url: constObj.gateway_url + 'order/getHisPOrder',
    method: 'post',
    data
  })
}

export function getHistoryPosition(data) {
  return request({
    url: constObj.gateway_url + 'position/getHisPosition',
    method: 'post',
    data
  })
}

export function getHistoryOrderDelay(data) {
  return request({
    url: constObj.gateway_url + 'monitor/getHisSubOrderDelay',
    method: 'post',
    data
  })
}

export function getSubOrderDelay(data) {
  return request({
    url: constObj.gateway_url + 'monitor/getSubDelayIntradayCombol',
    method: 'post',
    data
  })
}
