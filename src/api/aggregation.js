import request from '@/utils/request'
import constobj from '@/api/baseconfig'


export function getOrderAggregation(data) {
  return request({
    url: constobj.gateway_url+'order/aggregation',
    method: 'post',
    data
  })
}


export function getSelect() {
  return request({
    url: constobj.gateway_url+'get/order/aggregation/query/select',
    method: 'post',
  })
}
