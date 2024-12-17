import request from "@/utils/request";
import constObj from "@/api/baseconfig";


export function getServerInfo(data) {
  return request({
    url: constObj.gateway_url + 'get/service/config',
    method: 'post',
    data
  })
}

export function ping(ip) {
  return request({
    url: 'http://'+ ip + '/ping',
    method: 'get',
  })
}

export function getServerDetail(ip) {
  return request({
    url: 'http://'+ ip + '/get/system/info',
    method: 'get',
  })
}
