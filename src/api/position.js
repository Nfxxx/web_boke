import request from '@/utils/request'
import constObj from './baseconfig'


export function getPosition(data) {
  return request({
    url: constObj.gateway_url + 'position/getPosition',
    method: 'post',
    data
  })
}


export function getPositionSelect() {
  return request({
    url: constObj.gateway_url + 'get/position/query/select',
    method: 'get',
  })
}
