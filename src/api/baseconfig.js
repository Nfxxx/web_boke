//定义baseurl
// const BASE_URL = "http://172.16.2.228:8998/" //实盘环境
// const SHORT_URL_W = "http://192.168.1.150:8090/" //张凯本机环境
// const SHORT_URL = "http://172.16.1.103:8038/" //张凯云上环境
// const SHORT_URL_V2 = "http://172.16.1.103:8048/" //张凯云上环境
// const SHORT_URL_In = "http://172.16.1.103:8090/" //张凯云上环境(intraday,monitor)
// const OMS_CONFIG_URL = 'http://172.16.1.51:9080/'
// const REBALANCE_URL = 'http://172.16.1.103:8028/'
//
// //导出为Vue可引入
// export default {
//   BASE_URL,
//   SHORT_URL,
//   SHORT_URL_V2,
//   OMS_CONFIG_URL,
//   SHORT_URL_W,
//   SHORT_URL_In,
//   REBALANCE_URL
// }

// //定义baseurl
// const BASE_URL = "http://172.16.200.248:8998/"
// const SHORT_URL_W = "http://172.16.200.248:8090/" //张凯本机环境
// const SHORT_URL = "http://172.16.200.248:8018/" //张凯云上环境
// const SHORT_URL_In = "http://172.16.200.248:8090/" //张凯云上环境(intraday,monitor)
// const OMS_CONFIG_URL = 'http://172.16.200.248:9080/'
// const REBALANCE_URL = 'http://172.16.2.34:8028/'
//
//
// //导出为Vue可引入
// export default {
//   BASE_URL,
//   SHORT_URL,
//   OMS_CONFIG_URL,
//   SHORT_URL_W,
//   SHORT_URL_In,
//   REBALANCE_URL
// }

//定义baseurl
// const gateway_url = "http://172.16.8.61:6026/"
const gateway_url = "http://0.0.0.0:5555/"
const oms_config_url = 'http://172.16.1.51:9080/'
const rebalance_strategy_url = 'http://192.168.1.150:8028/'
const shorting_v2_url = "http://192.168.1.150:8048/"
const intraday_strategy_url = "http://172.16.8.61:8090/"
const env = "dev"

// const gateway_url = "http://172.16.8.29:6026/"
// const oms_config_url = 'http://172.16.1.51:9080/'
// const rebalance_strategy_url = 'http://172.16.1.103:8028/'
// const shorting_v2_url = "http://172.16.1.103:8048/"
// const intraday_strategy_url = "http://172.16.8.29:8090/"
// const env = "prod"

//导出为Vue可引入
export default {
  gateway_url,
  oms_config_url,
  intraday_strategy_url,
  shorting_v2_url,
  rebalance_strategy_url,
  env
}
