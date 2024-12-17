import router from '@/router'

export const orderMixin = {
  methods: {
    getOrderDetail(parentOrderId) {
      console.log(parentOrderId);
      window.open(`#/order/ParentOrderSubOrder?parentOrderId=${parentOrderId}`)
    },
    getPorderAccount(TimedurationId, PortfolioId) {
      window.open(`#/order/parentOrder?TimeDurationId=${TimedurationId}&PortfolioId=${PortfolioId}`)
    },
    getPorderRebalance(TimedurationId, Account) {
      window.open(`#/order/parentOrder?TimeDurationId=${TimedurationId}&Account=${Account}`)
    },
    getPorderIntraday(Account) {
      window.open(`#/order/parentOrder?Account=${Account}`)
    },
    //******************格式化**********************/
    //
    // 时间戳转为月日时分秒(子单)
    formatterRemoveYearTime({cellValue}) {
      if (typeof cellValue === "string"){
        return cellValue
      } else if (cellValue) {
        const date = new Date(cellValue.seconds * 1000);
        const h = date.getHours() < 10 ? "0" + date.getHours() + ':' : date.getHours() + ":";
        const m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ':' : date.getMinutes() + ":";
        const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return h + m + s
      } else {
        return ""
      }
    },

    // 时间戳转为时分秒(母单)
    formatterParentTime({cellValue}) {
      if (typeof cellValue === "string"){
        return cellValue
      } else if (cellValue){
        const secondsTime = parseInt(cellValue / 1000000);
        const date = new Date(secondsTime);
        const h = date.getHours() < 10 ? "0" + date.getHours() + ':' : date.getHours() + ":";
        const m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ':' : date.getMinutes() + ":";
        const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return h + m + s
      } else {
        return ""
      }
    },
    // 时间戳转为年月日(历史母单)
    formatterParentDate({cellValue}) {
      if (typeof cellValue === "string"){
        return cellValue
      } else if (cellValue){
        const secondsTime = parseInt(cellValue / 1000000);
        const date = new Date(secondsTime);
        const h = date.getHours() < 10 ? "0" + date.getHours() + ':' : date.getHours() + ":";
        const M = date.getMinutes() < 10 ? "0" + date.getMinutes() + ':' : date.getMinutes() + ":";
        const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        const y = date.getFullYear();

        const m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return y + m + d + " " + h + M +s
      } else {
        return ""
      }
    },


    // 整数或者小数如果没有传值，则置为0
    formatterValue({cellValue}) {
      if (typeof cellValue === 'undefined') {
        return 0
      } else {
        return cellValue
      }
    },
    // Exchange 展示（日内延迟查询）
    formatterIntraday({cellValue}) {
      const ExchangeDisplay = ["", "Shanghai", "Shenzhen", "All"];
        return ExchangeDisplay[cellValue]
    },

    formatterMarketSide({cellValue}) {
      if (typeof cellValue === 'undefined') {
        return this.orderMarketSideOptions[0]
      }
      const value = Number(cellValue);
      return this.orderMarketSideOptions[value];
    },
    // 父订单状态
    formatterOrderStatus({cellValue}) {
      if (typeof cellValue === 'undefined') {
        return this.orderStateOptions[0]
      }
      const value = Number(cellValue);

      return this.orderStateOptions[value];
    },

    // 子订单状态
    formatterSubOrderStatus({cellValue}) {
      if (typeof cellValue === 'undefined') {
        return this.subOrderStateOptions[0]
      }
      const value = Number(cellValue);

      // console.log(cellValue)
      // console.log(this.$t("orderStateOptions")[cellValue])
      return this.subOrderStateOptions[value];
    },

    // 订单方向
    formatterOrderActionStatus({cellValue}) {
      if (typeof cellValue === 'undefined') {
        return this.orderActionOptions[0]
      }
      const value = Number(cellValue);
      return this.orderActionOptions[value];
    },

    formatterorderRunigStatus({cellValue}) {
      if (typeof cellValue === 'undefined') {
        return this.orderRuningStatusOptions[0]
      }
      const value = Number(cellValue);
      return this.orderRuningStatusOptions[value]
    },

    // 订单类型(母单)
    formatterOrderTypes({cellValue}) {
      const orderTypeOptions = ["Unknown", "Limit", "Market"];
      if (typeof cellValue === 'undefined') {
        return orderTypeOptions[0]
      }
      return orderTypeOptions[cellValue];
    },

    // 订单类型(子单)
    formatterSubOrderTypes({cellValue}) {
      const orderTypeOptions = ["Market", "Limit", "Stop_Market", "Stop_Limit"];
      if (typeof cellValue === 'undefined') {
        return orderTypeOptions[0]
      }
      return orderTypeOptions[cellValue];
    },


    //股票类型
    formatterStockTypes({cellValue}) {
      const stockTypeOptions = ["NULL", "CONN", "QFII", "INNER"];
      if (typeof cellValue === 'undefined') {
        return stockTypeOptions[0]
      }
      return stockTypeOptions[cellValue];
    },
    // 固定价格格式
    formatterPriceFixed3({cellValue}) {
      // return Number(cellValue).toFixed(3)
      // this._.floor(cellValue * 100)
      return cellValue ? Math.floor(Number(cellValue) * 1000) / 1000 : 0
      // return Number(cellValue).toFixed(3)

    },

    // 固定价格格式
    formatterPriceFixed2({cellValue}) {
      // return Number(cellValue).toFixed(3)
      // this._.floor(cellValue * 100)
      return cellValue ? Math.round(Number(cellValue)) : 0
      // return Number(cellValue).toFixed(3)

    },

    //*********************************************/

    //******************过滤方法**********************/
    //
    // 筛选资金账户
    filterAccountId({option, row}) {
      return row.accountId === Number(option.data);
    },

    // =========== Select 筛选方法 =======================
    // 筛选交易员
    filterStrategyId({option, row}) {
      return row.strategyId === Number(option.data);
    },
    // 筛选 订单ID
    filteroriginIdMethod({option, row}) {
      return row.originId === option.data;
    },
    filterMethod(query) {
      //query是输入的关键字
      if (query == "") this.options = options.slice(0, 10);
      else {
        let result = []; //存储符合条件的下拉选项
        options.forEach((val) => {
          if (val.label.indexOf(query) != -1) result.push(val);
        });
        this.options = result.slice(0, 10); //只取前10个
      }
    },

    genSubOrderSelecOptions(attr) {
      if (this.list === null) {
        return null
      }
      let a = Array.from(
        new Set(
          this.list.map(function (item) {
            return item['order'][attr];
          })
        )
      )
        .sort(function (a, b) {
          return a - b;
        })
        .map(function (item) {
          return {
            label: item,
            value: item,
          };
        });
      // console.log(a)
      return a;
    },
    //*********************************************/
    cellClassName({row, rowIndex, column, columnIndex}) {
      if (column.property === "orderAction") {
        return this.orderActionCellClass[row.orderAction];
      }
    },

    rowClassName({row, rowIndex}) {
      return this.orderStatusRowClass[row.orderStatus];
    },

    subOrderRowClassName({row, rowIndex}) {
      return this.orderStatusRowClass[row.status];
    },

    cancelOrderFunc(row) {
      // console.log("row ==》", row.originId);
      let order = this.listMap.get(row.originId)
      // console.log(order)
      order.symbol = "78"
    },

    channelTypeFunc({cellValue}) {
      const ChannelObj = {0: "UNKNOW", 1: "CONNECT", 2: "QFII", 3: "INNER"}
      if (typeof cellValue === "undefined") {
        return ChannelObj[0]
      }
      return ChannelObj[cellValue]
    },
    AggchannelTypeFunc({cellValue}) {
      const ChannelObj = {"0": "ALL", "1": "CONNECT", "2": "QFII", "3": "INNER"}
      if (typeof cellValue === "undefined") {
        return ChannelObj["0"]
      }
      return ChannelObj[cellValue]
    },

    ExchangeTypeFunc({cellValue}) {
      const ExchangeObj = {"0": "ALL", "1": "Shanghai", "2": "Shenzhen"}
      if (typeof cellValue === "undefined") {
        return ExchangeObj["0"]
      }
      return ExchangeObj[cellValue]
    },
  }
}

export const commonMixin = {
  methods: {
    // 生成 筛选框的 选择框选项
    genSelecOptions(attr) {
      if (this.list === null) {
        return null
      }
      let a = Array.from(
        new Set(
          this.list.map(function (item) {
            return item[attr];
          })
        )
      )
        .sort(function (a, b) {
          return a - b;
        })
        .map(function (item) {
          return {
            label: item,
            value: item,
          };
        });
      // console.log(a)
      return a;
    },
    genSelecOptions1(table,attr) {
      if (table === null) {
        return null
      }
      let a = Array.from(
        new Set(
          table.map(function (item) {
            return item[attr];
          })
        )
      )
        .sort(function (a, b) {
          return a - b;
        })
        .map(function (item) {
          return {
            label: item,
            value: item,
          };
        });
      // console.log(a)
      return a;
    },

    // 母单account下拉框的筛选框
    accountFilter(query){
      let arr = this.symbolist.filter((symbol) => {
        return symbol.includes(query)
      })
      if (arr.length > 50) {this.symbolDisplaylist = arr.slice(0, 50)}
      else {this.symbolDisplaylist = arr}
    }
  }
}
