import request from '@/utils/request'

export function getBasicAccountInfo(params) {
  return request({
    url: '/api/account/basicinfo',
    method: 'get',
    params
  })
}
