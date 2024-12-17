import request from '@/utils/request'
import constObj from './baseconfig'

export function getUnfinishPortfolio() {
  return request({
    url: constObj.gateway_url + 'get/unfinish/portfolio',
    method: 'get',
  });
}

export function getFinishPortfolio() {
  return request({
    url: constObj.gateway_url + 'get/finish/portfolio',
    method: 'get',
  });
}

export function getPositionAggregation(data) {
  return request({
    url: constObj.gateway_url + 'monitor/getPositionAggregation',
    method: 'post',
    data
  })
}


export function ResendPortfolio(data) {
  return request({
    url: constObj.gateway_url + 'resend/portfolio/trade',
    method: 'post',
    data
  })
}

export function CancelPortfolio(data) {
  return request({
    url: constObj.gateway_url + 'cancel/portfolio/trade',
    method: 'post',
    data
  })
}

export function getWarePorder(params) {
  return request({
    url: constObj.gateway_url + 'order/getPordersbyWarehouse', //测试环境
    method: 'get',
    params
  })
}

export function getRebalancePorder(params) {
  return request({
    url: constObj.gateway_url + 'order/getPOrderByRebalance',
    method: 'get',
    params
  })
}

// Short Monitor V2
export function getShortInfoV2() {
  return request({
    url: constObj.shorting_v2_url + 'get/shorting/info/V2',
    method: 'get',
    // params
  })
}

//Post trade
export function UpdateShortTradeV2(data) {
  return request({
    url: constObj.shorting_v2_url + 'update/shorting/trade/V2',
    method: 'post',
    data
  })
}

//Post running
export function UpdateShortRunningV2(data) {
  return request({
    url: constObj.shorting_v2_url + 'update/shorting/running/V2',
    method: 'post',
    data
  })
}

//Post TimeDuration
export function UpdateShortTimedurationV2(data) {
  return request({
    url: constObj.shorting_v2_url + 'update/shorting/time_duration/V2',
    method: 'post',
    data
  })
}

//TimeDuration Get
export function getShortingStrategyConfig(params) {
  return request({
    url: constObj.oms_config_url + 'get/shortingstrategy',
    method: 'get',
    params
  })
}

/////Intraday Monitor
export function getIntradayInfo() {
  return request({
    url: constObj.intraday_strategy_url + 'api/intraday/info',
    method: 'get',
    // params
  })
}

export function getChangeRebalance(params) {
  return request({
    url: constObj.rebalance_strategy_url + 'get/rebalance/info',
    method: 'get',
    params
  })
}

export function getChangeRebalanceHis() {
  return request({
    url: constObj.rebalance_strategy_url + 'get/all/rebalance/info',
    method: 'get',
    // params
  })
}

export function UpdateRebalanceTimeduration(data) {
  return request({
    url: constObj.rebalance_strategy_url + 'update/rebalance/time_duration',
    method: 'post',
    data
  })
}

export function CalculRebalance(data) {
  return request({
    url: constObj.rebalance_strategy_url + 'calcuating/rebalance',
    method: 'post',
    data
  })
}

export function CancelByAccount(data) {
  return request({
    url: constObj.rebalance_strategy_url + 'cancel/account/order',
    method: 'post',
    data
  })
}

export function CancelByBroker(data) {
  return request({
    url: constObj.rebalance_strategy_url + 'cancel/broker/order',
    method: 'post',
    data
  })
}

export function CancelAll(data) {
  return request({
    url: constObj.rebalance_strategy_url + 'cancel/all/order',
    method: 'post',
    data
  })
}
