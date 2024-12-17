



// 冻结对象属性，禁止添加属性
export function Freeze(obj) {
  return Object.freeze(obj)
}


// // 未知
// UNKNOW = 0;
// // 订单本地创建
// CREATE = 1;
// // 订单通过本地柜台检查
// LOCAL = 2;
// // 报单的初始状态，表示单子刚开始，尚未报到柜台：在交易通道
// STARTED = 3;
// // 柜台已接收，但尚未报到交易所
// TRIGGERED = 4;
// // 交易所已接收，但尚未成交
// PLACED = 5;
// // 部分成交还在队列中
// PARTIAL = 6;
// // 全部成交
// FILLED = 7;
// // 已撤单
// CANCELED = 8;
// // 错误
// ERROR = 9;
// // 订单已过期：如限价单或交易日切换
// EXPIRED = 10;
// //撤单中
// PENDING_CANCEL=11;

//父订单状态
export const orderStateSelectList = [
  // 未知
  { label: "Unknown", value: 0 },

  // 本地创建
  { label: "Create", value: 1 },

  // 订单通过本地柜台检查
  { label: "Local", value: 2 },

  // 报道的初始状态，表示单子刚开始，尚未报到柜台： 在交易通道
  { label: "Started", value: 3 },

  // 柜台已接受，但尚未报道交易所
  { label: "Triggered", value: 4 },

  // 交易所已接收，但尚未成交
  { label: "Placed", value: 5 },

  // 部分成交还在队列中
  { label: "Partial", value: 6 },

  // 全部成交
  { label: "Filled", value: 7 },

  // 已撤单
  { label: "Canceled", value: 8 },

  // 错误
  { label: "Error", value: 9 },

  // 订单已过期
  { label: "Expired", value: 10 },

  // 撤单中
  { label: "Pending Cancel", value: 11 },
]
// 子订单状态

export const subOrderStateSelectList = [
  { label: "STAGED", value: 0 },

  { label: "NEW", value: 1 },

  { label: "PARTIALLY_FILLED", value: 2 },
  // 撤单中
  { label: "PENDING_CANCEL", value: 3 },
  // 全部成交
  { label: "FILLED", value: 4 },
  // 已撤单
  { label: "CANCELLED", value: 5 },

  { label: "REJECTED", value: 6 }
]

// 订单类型（母单）

export const orderTypeSelectList = [
  // 未知
  { label: "Unknown", value: 0 },

  // 限价单
  { label: "Limit", value: 1 },

  // 市价单
  { label: "Market", value: 2 },
]

// 订单类型（子单）

export const orderTypeSubSelectList = [

  { label: "Market", value: 0 },

  { label: "Limit", value: 1 },

  { label: "Stop_Market", value: 2 },

  { label: "Stop_Limit", value: 3 },
]

// 订单方向

export const orderActionSelectList = [
  // 未知
  { label: "Unknown", value: 0 },

  // 买入平仓: 股票
  { label: "Buy To Close", value: 1 },

  // 买入平仓: 期货
  { label: "Buy To Clsoe Today", value: 2 },

  //  买入平仓 昨天: 期货
  { label: "Buy To Close Yesterday", value: 3 },

  // 买入开仓
  { label: "Buy To Open", value: 4 },

  // 卖出平仓: 股票
  { label: "Sell To Close", value: 5 },

  // 卖出平仓: 期货
  { label: "Sell To Close Today", value: 6 },

  // 卖出平仓 昨天: 期货
  { label: "Sell To Close Yesterday", value: 7 },

  // 卖出开仓
  { label: "Sell To Open", value: 8 }

]
//父订单运行状态

export const orderRunigStatusSelectList = [
  { label: "Created", value: 0 },
  { label: "Inited", value: 1 },
  { label: "Started", value: 2 },
  { label: "Runing", value: 3 },
  { label: "Paused", value: 4 },
  { label: "Stoped", value: 5 },
  { label: "Finished", value: 6 },
]
// 股票类型
export const stockTypeSelectList = [
  { label: "Null", value: 0 },

  { label: "CONN", value: 1 },

  { label: "QFII", value: 2 }

]

// 订单方向单元格状态类名

export const orderActionCellClassList = [
  "order-action-unknown",

  "order-action-buy-to-close",
  "order-action-buy-to-close-today",
  "order-action-buy-to-close-yesterday",
  "order-action-buy-to-open",

  "order-action-sell-to-close",
  "order-action-sell-to-close-today",
  "order-action-sell-to-close-yesterday",
  "order-action-sell-to-open",
]

// 订单状态行类名

export const orderStatusRowClassList = [
  "order-status-unknown",

  "order-status-create",
  "order-status-local",
  "order-status-started",
  "order-status-triggered",

  "order-status-placed",
  "order-status-partial",
  "order-status-filled",
  "order-status-canceled",

  "order-status-error",
  "order-status-expired",
  "order-status-pending-cancel",
]

// 子订单状态行类名

export const subOrderStatusRowClassList = [
  "suborder-status-started",

  "suborder-status-new",
  "suborder-status-partially-filled",
  "suborder-status-paending-cancel",
  "suborder-status-filled",

  "suborder-status-cancelled",
  "suborder-status-rejected"
]



// 持仓方向
export const positionDirection = [
  // 未知
  "Unknown",
  // 多头持仓
  "Long",
  // 空头
  "Short"
]

// 持仓 channel

// UnKnow = 0
// #
//   QFII = 2
// CONNECT = 1
// INNER = 3

export const positionChannel = [
  // 未知
  "Unknown",

  // 空头
  "CONNECT",
  // 多头持仓
  "QFII",

  "INNER"
]


// 账户类型
export const AccountType = [
  "UnKnow",
  // 现金
  "STOCK",
  // 期货
  "FUTURE",

  // 保证金账户
  "MARGIN",
  // 期权账户
  "OPTION"
]

// 账户环境
export const AccountEnvType = [
  "UnKnow",
  // 实盘账户
  "Real",
  // 模拟账户
  "Simulation"
]


// 账户类型选择

export const accountTypeSelectList = [

  { label: "UnKnow", value: 0 },
  // 现金
  { label: "STOCK", value: 1 },
  // 期货
  { label: "FUTURE", value: 2 },


  // 保证金账户
  { label: "MARGIN", value: 3 },
  // 期权账户
  { label: "OPTION", value: 4 }
]

export const orderMarketSideSelectList=[
  { label: "Buy", value: 0 },
  { label: "Sell", value: 1 },
  { label: "Cover", value: 2 },
  { label: "Sell Short", value: 3 },
  { label: "Leveraged Buy", value: 4 },
  { label: "Leveraged Sell", value: 5 }
  ]
// 账户环境选择框

export const accountEnvTypeSelectList = [
  { label: "UnKnow", value: 0 },

  { label: "Real", value: 1 },

  { label: "Simulation", value: 2 }
]


export const directionSelectList = [

  { label: "UnKnow", value: 0 },
  // 现金
  { label: "Long", value: 1 },
  // 期货
  { label: "Short", value: 2 }
]


export const StrategyIdSelectList = [

  { label: "UnKnow", value: 0 },
  // 现金
  { label: "Long", value: 1 },
  // 期货
  { label: "Short", value: 2 }
]


export const channelSelectList = [
  { label: "UnKnow", value: 0 },

  // 空头
  { label: "CONNECT", value: 1 },

  // 多头持仓

  { label: "QFII", value: 2 },

  { label: "INNER", value: 3 },

]

export const boolenSelectList = [
  { label: "true", value: true },
  { label: "false", value: false }
]

