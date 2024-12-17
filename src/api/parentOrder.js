import request from '@/utils/request'
import constObj from './baseconfig'

export function getParentOrder(data) {
  return request({
    url: constObj.gateway_url + 'order/getParentOrders',
    method: 'post',
    data
  })
}

export function cancelParentOrder(data) {
  return request({
    url: constObj.gateway_url + 'order/cancelParentOrder',
    method: 'post',
    data
  })
}


// export function getAllOrderList(params) {
//   return request({
//     url: '/api/order/all',
//     method: 'get',
//     params
//   })
// }


export function getParentOrderQuerySelect() {
  return request({
    url: constObj.gateway_url + 'get/parentorder/query/select',
    method: 'get',
  })
}

export function getPOrdersByAccount(params) {
  return request({
    url: constObj.gateway_url + 'order/getPOrderByAccount',
    method: 'post',
    params
  })
}
