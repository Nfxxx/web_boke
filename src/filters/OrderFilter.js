// 去除年份
export const filterOrderTime = {
    func: value => {
        return value.split(" ")[1];
    }
}

// 排序方式
export const SortInfo = {
  func: value => {
    return [
      "lastupdatetime asc",
      "lastupdatetime desc",
      "inserttime asc",
      "inserttime desc",
    ][Number(value)]
  }
}

// 订单状态
export const filterOrderStatus = {
    func: value => {
        return [
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
        ][Number(value)];
    }
}

// 子单订单状态
export const filterSubOrderStatus = {
    func: value => {
        return [
          "STAGED",
          "NEW",
          "PARTIALLY_FILLED",
          "PENDING_CANCEL",
          "FILLED",
          "CANCELLED",
          "REJECTED"
        ][Number(value)];
    }
}

// 投资组合状态
export const filterPortfolioStatus = {
     func: value => {
        return [
          "All",
          "Finished",
          "Unfinished"
        ][Number(value)];
    }
}

// 时间状态
export const TimeStatus = {
  func: value => {
    return [
      "一周",
      "一个月",
      "三个月",
      "半年",
      "一年",
      "全部"
    ][Number(value)];
  }
}


// 投资状态
export const TouziStatus = {
  func: value => {
    return [
      "已投",
      "未投",
      "全部"
    ][Number(value)];
  }
}

// 业绩维度
export const YeijiWeiDu = {
  func: value => {
    return [
      "超额计算",
      "绝对净值"
    ][Number(value)];
  }
}


// 业绩维度
export const ValueName = {
    func: value => {
        return [
            "累计",
            "单位"
        ][Number(value)];
    }
}

// 业绩基准
export const YejiJizhunStatus = {
  func: value => {
    return [
      "沪深300",
      "中证500",
      "中证1000",
      "国证2000",
      "中证2000",
      "万得全A",
      "华证微盘",
      "万得微盘",
      "南华商品指数",
      "招商证券市场中性指数",
      "招商证券CTA指数",
      "国君期货中周期时序动量"
    ][Number(value)];
  }
}

export  const  SelfYears = {
  func: value => {
    return [
      "2022",
      "2023",
      "2024"
    ][Number(value)];
  }
}




// 策略类型1
export const CL1Status = {
  func: value => {
    return [
      "一周",
      "一个月",
      "三个月",
      "半年",
      "一年",
      "全部"
    ][Number(value)];
  }
}


// 策略类型2
export const CL2Status = {
  func: value => {
    return [
      "一周",
      "一个月",
      "三个月",
      "半年",
      "一年",
      "全部"
    ][Number(value)];
  }
}

// 订单方向
export const filterOrderActionStatus = {
    func: value => {
        return [
            "Unknown",
            "BuyToClose",
            "BuyToClsoeToday",
            "BuyToCloseYesterday",
            "BuyToOpen",
            "SellToClose",
            "SellToCloseToday",
            "SellTocloseYesterday",
            "SellToOpen"
        ][Number(value)]
    }
}




// 订单类型
export const filterOrderTypes = {
    func: value => {
        return ["Unknown", "Limit", "Market"][Number(value)]
    }
}
// 订单类型(子单)Stop_Sti
export const filterSubOrderTypes = {
    func: value => {
        return ["Market", "Limit", "Stop_Market", "Stop_Limit", ][Number(value)]
    }
}

export const formatterRuningStatus = {
  // const ParentOrderRuningStatus =

  func: value => {
    return [    "CREATED",
      "INITED",
      "STARTED",
      "RUNNING",
      "PAUSED",
      "STOPED",
      "FINISHED"][Number(value)]
  }
}

export const formatterSide = {
  func: value => {
    return [
            "Buy",
            "Sell",
            "Cover",
            "Sell Short",
            "Leveraged Buy",
            "Leveraged Sell",
          ][Number(value)]
  }
}



// 股票类型
export const filterStockTypes = {
    func: value => {
        // (value);
        return ["NULL", "CONN", "QFII"][Number(value)]
    }
}

// 价格显示
export const filterOrderPrice = {
    func: value => {
        return  Number(value).toFixed(3)

    }
}


