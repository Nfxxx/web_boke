<template>
  <div style="margin-left: 5px;margin-right: 5px;">
    <br>
    <template>
      <el-select v-model="searchObj.AccountIds" class="search-input" placeholder="Account" multiple filterable
                 style="width: 180px">
        <el-option v-for="num in accountlist" :key="num" :value="num" :label="num"></el-option>
      </el-select>
      <el-select v-model="searchObj.Brokers" class="search-input" placeholder="Broker" multiple filterable
                 style="width: 150px">
        <el-option v-for="num in brokerDisplaylist" :key="num" :value="num" :label="num"></el-option>
      </el-select>
      <el-select v-model="searchObj.Portfolios" class="search-input" placeholder="Portfolio" multiple filterable
                 style="width: 250px">
        <el-option v-for="num in portfoliosDisplaylist" :label="num" :key="num" :value="num"></el-option>
      </el-select>
      <el-select v-model="searchObj.TradingBatchIds" class="search-input" placeholder="TimeDuration" multiple
                 filterable style="width: 150px">
        <el-option v-for="num in tradingBatchidsDisplaylist" :label="num" :key="num" :value="num"></el-option>
      </el-select>
      <el-select v-model="searchObj.OrderStatus" class="search-input" placeholder="OrderStatus" multiple filterable
                 style="width: 180px">
        <el-option v-for="num in 12" :label="num-1|filterOrderStatus" :key="num" :value="num-1"></el-option>
      </el-select>
      <el-select v-model="searchObj.StrategyIds" class="search-input" placeholder="Strategy" multiple filterable
                 style="width: 230px">
        <el-option v-for="num in strategyList" :label="num" :key="num" :value="num"></el-option>
      </el-select>
      <el-select v-model="searchObj.OrderActions" class="search-input" placeholder="OrderAction" multiple filterable
                 style="width: 200px">
        <el-option v-for="num in 9" :label="num-1|filterOrderActionStatus" :key="num" :value="num-1"></el-option>
      </el-select>
    </template>
    <br>
    <br>
    <vxe-toolbar zoom custom>
      <template v-slot:buttons>
        <el-button class="filter-item" type="primary" @click="Query" style="width: 100px;margin-left: 10px">
          查询
        </el-button>
        &ensp;
        <el-button :type="status?'danger':'primary'"
                   @click="startclose" style="width: 100px">
          {{ status ? '停止刷新' : '开启刷新' }}
        </el-button>
        &ensp;
        <vxe-input v-model="keyword" type="search" placeholder="search"
                   size="100px" @keyup="filterData" style="height: 40px;margin-left: 10px"></vxe-input>
      </template>
    </vxe-toolbar>
    <br>
    <vxe-table
      ref="xTable"
      height="680"
      size="small"
      border
      resizable
      auto-resize
      filter-multiple
      show-overflow
      highlight-hover-row
      highlight-current-row
      align="center"
      id="sub_order"
      :custom-config="{storage:true}"

      :scroll-y="{ gt: 20 }"
      :data="list2"
      :loading="loading1"
      :cell-class-name="cellClassName"
      :row-class-name="rowClassName"
      :print-config="{}"
      :keyboard-config="{ isArrow: true }"
      :sort-config="sortConfig"
      @cell-dblclick="cellDBLClickEvent"
    >
      <vxe-table-column
        field="originId"
        :title="locale.originId"
      >
      </vxe-table-column>
      <vxe-table-column
        field="accoutId"
        :title="locale.accountId"
      >
      </vxe-table-column>
      <vxe-table-column
        field="portfolio"
        :title="locale.portfolio"
      >
      </vxe-table-column>
      <vxe-table-column
        field="symbol"
        :title="locale.symbol"
      ></vxe-table-column>
      <vxe-table-column
        width="80"
        field="orderStatus"
        :title="locale.orderStatus"
        :formatter="formatterOrderStatus"
        :filters="[{ data: { sVal:[]} }]"
        :filter-render=" {
          name: 'FilterSelect',
          options: orderStateSelectList,
          props: { multiple: true, filterable: true, placeholder: '请选择' }
        }"
      >
      </vxe-table-column>
      <vxe-table-column
        field="insertTime"
        sortable
        :title="locale.insertTime"
        :formatter="formatterParentTime"
      >
      </vxe-table-column>
      <vxe-table-column
        field="filledQuantity"
        :title="locale.filledQuantity"
        width="80px"
        :formatter="formatterValue"
      >
      </vxe-table-column>
      <vxe-table-column
        field="avgPrice"
        :title="locale.avgPrice"
        :formatter="formatterPriceFixed3"
        width="80px"
      >
      </vxe-table-column>
      <vxe-table-column
        field="inputPrice"
        :title="locale.inputPrice"
        width="80px"
        :formatter="formatterPriceFixed3"
      >
      </vxe-table-column>
      <vxe-table-column
        field="inputVol"
        :title="locale.inputNumber"
        width="80px"
        :formatter="formatterValue"
      >
      </vxe-table-column>
      <vxe-table-column
        field="tradingBatchId"
        :title="locale.tradingBatchId"
      >
      </vxe-table-column>
      <vxe-table-column
        field="channel"
        :title="locale.channel"
        :formatter="channelTypeFunc"
      >
      </vxe-table-column>
      <vxe-table-column
        field="algo"
        width="150px"
        :title="locale.algorithm"
      >
      </vxe-table-column>
      <vxe-table-column
        field="orderAction"
        :title="locale.orderAction"
        width="100px"
        :formatter="formatterOrderActionStatus"
      >
      </vxe-table-column>
      <vxe-table-column
        field="broker"
        :title="locale.broker"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="signalId"
        :title="locale.siganlid"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="strategyId"
        :title="locale.strategyId"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="orderType"
        :title="locale.orderType"
        :formatter="formatterOrderTypes"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="group"
        :title="locale.group"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="params"
        :title="locale.params"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="runingStatus"
        :title="locale.runingStatus"
        :formatter="formatterorderRunigStatus"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column field="errorMsg" :title="locale.errorMsg">
      </vxe-table-column>
      <vxe-table-column
        field="latestUpdateTime"
        :title="locale.latestUpdateTime"
        :formatter="formatterParentTime"
        sortable
      >
      </vxe-table-column>
      <vxe-table-column
        field="remark"
        :title="locale.remark"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column :title="locale.operation" width="100">
        <template slot-scope="scope">
          <vxe-button
            status="danger"
            size="mini"
            :content="locale.cacelOrder"
            @click="cancelOrder(scope.row)"
          >
          </vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <vxe-pager
      :current-page="tablePage.PageNo"
      :page-size="tablePage.PageSize"
      :total="tablePage.TotalCount"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange"
    >
    </vxe-pager>
  </div>
</template>

<script>
import {commonMixin, orderMixin} from "@/mixins";

import {cancelParentOrder, getParentOrder, getParentOrderQuerySelect} from '@/api/parentOrder'

import {
  channelSelectList,
  orderActionCellClassList,
  orderActionSelectList,
  orderRunigStatusSelectList,
  orderStateSelectList,
  orderStatusRowClassList,
  orderTypeSelectList
} from "@/utils/common";

import DownLoadCsvButton from '@/components/Common/DownLoadCsvButton'
import footerCountInfo from "@/components/Common/footerCountInfo";

export default {
  mixins: [orderMixin, commonMixin],
  components: {
    DownLoadCsvButton,
    footerCountInfo
  },
  data() {
    return {
      list: [],
      list2: [],
      searchflag: false,
      status: false,
      downloadList: [],

      listMap: null,
      loading1: false,

      symbolist: [],
      accountlist: [],
      strategyList: [],
      portfoliosDisplaylist: [],
      tradingBatchidsDisplaylist: [],
      brokerDisplaylist: [],
      symbolDisplaylist: [],

      // 分页信息列表
      tablePage: {
        PageNo: 1,
        PageSize: 100,
        TotalCount: 0
      },

      // input搜索条件对象
      searchObj: {
        "AccountIds": null,
        "Brokers": null,
        "Symbols": null,
        "OriginIds": null,
        "OrderStatus": null,
        "Algos": null,
        "OrderActions": null,
        "StrategyIds": null,
        "RuningStatus": null,
        "Portfolios": null,
        "TradingBatchIds": null,
      },
      keyword: "",
    };
  },
  created() {
    // 重新连接时在等待父订单获取全部过程中，获得的 更新项目缓冲区
    this.listWaitForUpdate = []
    //
    this.listWaitForUpdateing = false
    this.parent_order_all_data_request_lock = false

    // 订单方向
    this.orderActionSelectList = orderActionSelectList
    // 订单状态
    this.orderStateSelectList = orderStateSelectList
    // // 订单类型
    this.orderTypeSelectList = orderTypeSelectList
    // 渠道类型
    this.channelSelectList = channelSelectList

    this.locale = this.$t("parentOrder")
    this.common = this.$t("common")

    this.orderActionOptions = this.$t("orderActionOptions")
    this.orderRuningStatusOptions = this.$t("orderRuningStatusOptions")
    this.orderStateOptions = this.$t("orderStateOptions")
    this.orderStatusRowClass = orderStatusRowClassList
    this.orderRunigStatusSelectList = orderRunigStatusSelectList
    this.orderActionCellClass = orderActionCellClassList
    this.listWaitForUpdateing = false

    // 读取数据
    // this.findList()

    //读取列表
    this.findAccSymList()

    const domain = window.location.href;
    if (domain.indexOf("TimeDurationId") > -1 && domain.indexOf("PortfolioId") > -1) {
      const TimeDurationId = domain.split("?")[1].split("&")[0].split("=")[1];
      const PortfolioId = domain.split("?")[1].split("&")[1].split("=")[1];
      this.searchObj.Portfolios = [PortfolioId];
      this.searchObj.TradingBatchIds = [TimeDurationId];
      this.findList();
    }

    if (domain.indexOf("TimeDurationId") > -1 && domain.indexOf("Account") > -1) {
      const TimeDurationId = domain.split("?")[1].split("&")[0].split("=")[1];
      const Account = domain.split("?")[1].split("&")[1].split("=")[1];
      this.searchObj.AccountIds = [Account];
      this.searchObj.TradingBatchIds = [TimeDurationId];
      this.findList();
    } else if (domain.indexOf("Account") > -1) {
      const Account = domain.split("?")[1].split("=")[1];
      this.searchObj.AccountIds = [Account];
      this.findList();
    }
  },
  beforeMount() {
    this.cuurrentSortConfig = localStorage.getItem("VXESortConfig") === "false" ? false : true
    this.sortConfig = {trigger: 'cell', multiple: this.cuurrentSortConfig}
  },
  mounted() {
    // 定时刷新
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        if (this.status) {
          this.findList()
        }
      }, 3000)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  computed: {
    // 筛选订单状态
    orderStatusSelectList: function () {
      return this.genSelecOptions("orderStatus");
    },
    // 筛选 用户id
    orderAccountIdSelectList: function () {
      return this.genSelecOptions("accoutId");
    },
    // 筛选broker
    orderBrokerSelectList: function () {
      return this.genSelecOptions("broker")
    },
    // 筛选group
    orderGroupSelectList: function () {
      return this.genSelecOptions("group")
    },
    //筛选Portfolio
    orderPortfolioSelectList: function () {
      return this.genSelecOptions("portfolio")
    },
    // 筛选合约代码
    // orderSymbolSelectList: function() {
    //   return this.genSelecOptions("symbol");
    // },

    // 筛选订单编号
    // orderOrginIdSelectList: function() {
    //   return this.genSelecOptions("originId");
    // },
    // 筛选策略ID
    orderStrategyIdSelectList: function () {
      return this.genSelecOptions("strategyId");
    },
    // 筛选用户
    orderUserSelectList: function () {
      return this.genSelecOptions("user");
    },
    // 筛选算法
    orderAlgoSelectList: function () {
      return this.genSelecOptions("algo");
    },
  },
  methods: {
    startclose() {
      this.status = !this.status
    },
    filterData() {
      const filterName = this.$utils.toValueString(this.keyword).trim().toLowerCase()
      if (filterName) {
        this.searchflag = true
        const searchProps = ["symbol", "originId", "algo"]
        const rest = this.list.filter(item => searchProps.some(key => this.$utils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
        this.list2 = rest.slice(
          (this.tablePage.PageNo - 1) * this.tablePage.PageSize, this.tablePage.PageNo * this.tablePage.PageSize
        );
      } else {
        this.searchflag = false
        this.list2 = this.list.slice(
          (this.tablePage.PageNo - 1) * this.tablePage.PageSize, this.tablePage.PageNo * this.tablePage.PageSize
        );
      }
    },

    Query() {
      this.findList()
    },

    cellDBLClickEvent({row, column}) {
      this.getOrderDetail(row.originId)
    },

    // 时间戳转为时分秒
    formatterTime(timeobj) {
      if (timeobj) {
        const secondsTime = parseInt(timeobj / 1000000);
        const date = new Date(secondsTime);
        const h = date.getHours() < 10 ? "0" + date.getHours() + ':' : date.getHours() + ":";
        const m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ':' : date.getMinutes() + ":";
        const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return h + m + s
      } else {
        return ""
      }
    },

    async cancelOrder(row) {
      const type = await this.$XModal.confirm("您确定要撤单" + row.originId.toString() + "?")
      if (type === 'confirm') {
        cancelParentOrder({OriginId: row.originId}).then(result => {
          if (result.data.Err_code === 0) {
            this.findList()
          } else if (result.data.Err_Msg) {
            this.$XModal.message({
              content: result.data.Err_Msg,
              status: "error"
            })
          }
        })
      } else {
        return new Error()
      }
    },

    // 分页查询数据方法
    findList() {
      // 整理发送到后端的参数格式
      const pageOrderPara = {
        "AccountIds": this.searchObj.AccountIds ? this.searchObj.AccountIds : [],
        "Brokers": this.searchObj.Brokers ? this.searchObj.Brokers : [],
        "OrderStatus": this.searchObj.OrderStatus ? this.searchObj.OrderStatus : [],
        "OrderActions": this.searchObj.OrderActions ? this.searchObj.OrderActions : [],
        "StrategyIds": this.searchObj.StrategyIds ? this.searchObj.StrategyIds : [],
        "Portfolios": this.searchObj.Portfolios ? this.searchObj.Portfolios : [],
        "TradingBatchIds": this.searchObj.TradingBatchIds ? this.searchObj.TradingBatchIds : [],
      };

      setTimeout(() => getParentOrder(pageOrderPara).then(result1 => {
        const result = result1.data;
        // console.log(result, this.searchflag)
        this.list = result.Data
        this.listMap = new Map(this.list.map((order) => [order.originId, order]));
        this.tablePage.TotalCount = this.list.length
        this.filterData()
      }), 300)
    },

    // // 页面改变方法
    handlePageChange({currentPage, pageSize}) {
      this.tablePage.PageNo = currentPage
      this.tablePage.PageSize = pageSize
      this.filterData()
    },

    //获取accountlist和symbolist
    findAccSymList() {
      getParentOrderQuerySelect().then(result1 => {
        const result = result1.data;
        console.log(result)
        this.accountlist = result1.data.accountIds
        this.brokerDisplaylist = result1.data.brokers
        this.portfoliosDisplaylist = result1.data.portfolios
        this.tradingBatchidsDisplaylist = result1.data.timeDurationIds
        this.strategyList = result1.data.strategyIds
      })

    },
  },
};
</script>

<style scoped lang="scss">
.line {
  text-align: center;
}

.filter-container {
  margin: 10px;
  text-align: end;

  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px;
  }
}

.expand-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0 20px;
  margin: 0;

  li {
    list-style: none;
    padding: 4px 0;

    b {
      width: 150px;
      display: inline-block;
      text-align: left;
    }

    span {
      padding-left: 15px;
    }
  }
}

.search-input {
  width: 130px;
  margin-left: 10px;
}
</style>
