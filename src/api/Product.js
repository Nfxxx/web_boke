import request from '@/utils/request'
import constObj from './bokeconfig'

export function getProduct() {
  return request({
    url: constObj.BASE_URL + 'fundList',
    method: 'get'
  })
}


export function MonthIncome() {
  return request({
    url: constObj.BASE_URL + 'table/MonthIncome',
    method: 'get'
  })
}
export function cancelParentOrder(data) {
  return request({
    url: constObj.BASE_URL + 'order/cancelParentOrder',
    method: 'post',
    data
  })
}


export function getParentOrderQuerySelect() {
  return request({
    url: constObj.BASE_URL + 'get/parentorder/query/select',
    method: 'get',
  })
}

export function getPOrdersByAccount(params) {
  return request({
    url: constObj.BASE_URL + 'order/getPOrderByAccount',
    method: 'post',
    params
  })
}
