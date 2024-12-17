import request from '@/utils/request'
import constObj from './baseconfig'

export function getSubOrder(data) {
  return request({
    url: constObj.gateway_url + 'order/getSubOrders',
    method: 'post',
    data
  })
}


export function getParSubOrder(data) {
  return request({
    url: constObj.gateway_url + 'order/getSubsByPOrder',
    method: 'post',
    data
  })
}

export function getSubQuerySelect() {
  return request({
    url: constObj.gateway_url + 'get/suborder/query/select',
    method: 'get',
  })
}
