import request from '@/utils/request'
import constObj from './baseconfig'


export function getBorrow(data) {
  return request({
    url: constObj.gateway_url + 'borrow/getBorrowPool',
    method: 'post',
    data
  })
}

export function getBorrowConfig(data) {
  return request({
    url: constObj.gateway_url + 'borrow/borrow_config/list',
    method: 'get',
    data
  })
}


export function insertBorrowConfig(data) {
  return request({
    url: constObj.gateway_url + 'borrow/borrow_config/create',
    method: 'post',
    data
  })
}

export function updateBorrowConfig(data) {
  return request({
    url: constObj.gateway_url + 'borrow/borrow_config/update',
    method: 'post',
    data
  })
}


export function getBorrowSelect() {
  return request({
    url: constObj.gateway_url + 'get/borrow/query/select',
    method: 'get',
  })
}
