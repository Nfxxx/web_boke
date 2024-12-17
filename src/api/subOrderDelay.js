import request from '@/utils/request'
import constObj from './baseconfig'

export function getSubOrderDelay(params) {
  return request({
    url: constObj.gateway_url + 'monitor/getSubOrderDelay',
    method: 'get',
    params
  })
}

export function getHistoryOrderDelay(data) {
  return request({
    url: constObj.gateway_url + 'monitor/getHisSubOrderDelay',
    method: 'post',
    data
  })
}

export function getIntradayDelayToday(data) {
  return request({
    url: constObj.gateway_url + 'monitor/getSubDelayIntradayCombol',
    method: 'post',
    data
  })
}

