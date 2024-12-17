import request from '@/utils/request'

export function getService(params) {
  return request({
    url: '/api/index',
    method: 'get',
    params
  })
}

