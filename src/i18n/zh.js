export const message = {
    "common": {
        "Home": "首页",
        "Console": "控制台",
        "Order": "订单",


        "QueryOrder": "查询订单",
        "QueryParentOrder": "查询父订单",
        "QuerySubOrder": "查询子订单",
        "subOrderDelay":"子订单延时统计",
        "historyOrderDelay":"历史订单延时统计",
        "Position": "持仓信息",
        "ViewBasicAccountInfo": "查询账户基础信息",
        "AddAccount": "添加账户",
        "PressEntertoCnfirmFilter": "按回车确认筛选"
    },

    "console": {
        "server_state": "服务连接状态",
        "ems_connection_status": "ems连接",
        "algo_connection_status": "algo连接",
        "risk_status": "risk"

    },

    "parentOrder": {
        // 表头
        "accountId": "资金账号",
        "symbol": "合约代码",
        "originId": "本地ID",
        "orderStatus": "订单状态",
        "insertTime": "下单时间",
        "filledQuantity": "成交数量",
        "avgPrice": "平均成交价",
        "inputPrice": "委托价格",
        "inputNumber": "委托数量",
        "trader": "交易员",
        "orderAction": "订单方向",
        "errorMsg": "异常消息",
        "strategyId": "策略 ID",
        "latestUpdateTime": "最新更新时间",
        "user": "用户",
        "detail": "详情",
        "algorithm": "算法",
        "cacelOrder": "撤单",
        "operation": "操作",

        "brancher": "券商编号",
        "stockType": "股票类型",
        "sendingTime": "发送时间",

        // 详情
        "orderType": "订单类型",
        "channel": "渠道编号",
        "runingStatus": "运行状态",

        "subOrder": "子订单",
        "subOrderInfo": "子订单信息",


        "order": "订单",
        "ordeNumber": "订单编号",

        // 其他
        "parentOrderInfo": "母订单信息",
        "allRowExpansion": "所有行展开",
        "closeAllRowExpansions": "所有行收缩",
        "resetAllFilters": "重置所有筛选条件",
        "orderDetail": "订单详情",
        "status":"状态"
    },
    "orderStateOptions": [
        "Unknown",
        "Create",
        "Local",
        "Started",
        "Triggered",
        "Placed",
        "Partial",
        "Filled",
        "Canceled",
        "Error",
        "Expired",
        "PendingCancel"
    ],
    "orderOptions": [
        "Unknown",
        "Limit",
        "Market"
    ],
    "orderActionOptions": [
        "Unknown",

        "BuyToClose",
        "BuyToClsoeToday",
        "BuyToCloseYesterday",
        "BuyToOpen",

        "SellToClose",
        "SellToCloseToday",
        "SellTocloseYesterday",
        "SellToOpen"
    ],

    "position": {
        "search":"查找",
        "selectAccountId":"选择资金账号",

        "accountId": "资金账号",
        "symbol": "合约代码",
        "allQuantity": "持仓数量",
        "availableQuantiy":"可用数量",
        "todayVol":"今日持仓",
        "yesterdayVol":"昨日持仓",
        "positionAvgPrice":"持仓成本",
        "openPI":"浮动盈亏",
        "direction":"持仓方向",
        "channel":"通道"
    },

    "basicAccount": {
        "title":"基础账户信息",

        // table
        "accountId":"资金账号",
        "password":"资金密码",
        "name":"账号名称",
        "brokerName":"经纪商名称",
        "brokerCode":"经纪商代码",

        "productId":"产品ID",
        "active":"是否启用",
        "accountType":"账户类型",
        "accountEnvType":"账号环境",
        "holdingUrl":"持仓获取路径",
        "channels": "channels",

        // "quoteUrl":"行情交易地址",
        "authRequired":"是否需要验证",
        "authCode":"验证码",
        // 需要查看字段名

        "edit":"编辑",

        "accountEnvType_Real":"实盘账户",
        "accountEnvType_Simulation":"模拟账户"
    }


}
