<template>
  <div style="margin-left: 5px;margin-right: 5px;">
    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input
          v-model="parentOrderId"
          class="search-input"
          placeholder="parent order id"
          style="width: 400px"
        >
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button class="filter-item" type="primary" @click="ok" style="width: 100px">
          确定
        </el-button>
      </el-col>
    </el-row>
      <el-descriptions  border :column="5"  >
        <template  v-for="(item, key) in parentOrder" >
          <el-descriptions-item :key="key">
            <template slot="label">
              {{ key }}
            </template>
            <template v-if="key === 'orderType'">
              {{ item | filterOrderTypes }}
            </template>
            <template v-else-if="key == 'orderAction'">
              {{ item | filterOrderActionStatus }}
            </template>
            <template v-else-if="key == 'orderStatus'">
              {{ item | filterOrderStatus }}
            </template>
            <template v-else-if="key == 'avgPrice'|| key == 'inputPrice'">
              {{ item.toFixed(3) }}
            </template>
            <template v-else-if="key == 'insertTime'">
              {{ formatterTime(item) }}
            </template>
            <template v-else-if="key == 'latestUpdateTime'">
              {{ formatterTime(item) }}
            </template>
            <template v-else-if="key == 'runingStatus'">
              {{ orderRuningStatusOptions[item] }}
            </template>
            <template v-else-if="key == 'avgPrice'|| key == 'inputPrice'">
              {{ item.toFixed(3) }}
            </template>
            <template v-else-if="key == 'params'">
            </template>
            <template v-else>
              {{ item }}
            </template>
          </el-descriptions-item>
        </template>

      </el-descriptions>


    <h2 class="page-title">{{ locale.subOrderInfo }}</h2>
    <vxe-table
      ref="xTable"
      height="500"
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
      :data="list"
      :cell-class-name="cellClassName"
      :row-class-name="subOrderRowClassName"
      :print-config="{}"
      :keyboard-config="{ isArrow: true }"
      :sort-config="sortConfig"
    >
      <vxe-table-column
        field="order.strategy"
        sortable
        title="Strategy"
        :visible="false"
      ></vxe-table-column>

      <vxe-table-column
        field="order.account"
        sortable
        :title="locale.accountId"
        :visible="false"
      >
      </vxe-table-column>

      <!-- 合约代码 -->
      <vxe-table-column
        field="order.symbol"
        sortable
        :title="locale.symbol"
        :visible="false"
      ></vxe-table-column>
      <!-- 订单状态 -->

      <vxe-table-column
        field="orderId"
        sortable
        :title="locale.ordeNumber"
        :visible="false"
      ></vxe-table-column>

      <!-- 子订单编号 -->

      <vxe-table-column
        field="status"
        sortable
        :title="locale.orderStatus"
        :filters="[{ data: { sVal:[]} }]"
        :filter-render=" {
          name: 'FilterSelect',
          options: subOrderStateSelectList,
          props: { multiple: true, filterable: true, placeholder: '请选择' }
        }"
        :formatter="formatterSubOrderStatus"
      ></vxe-table-column>


      <vxe-table-column
        field="order.orderQid"
        sortable
        title="orderQId"
        :filters="[{ data: null }]"
        :filter-render="{
          name: 'FilterInput'
        }"
      ></vxe-table-column>

      <vxe-table-column
        field="order.params"
        sortable
        :title="locale.params"
        :visible="false"
      >
      </vxe-table-column>

      <vxe-table-column
        field="order.parentId"
        sortable
        title="parentId"
        :filters="[{ data: null }]"
        :filter-render="{
          name: 'FilterInput'
        }"
        :visible="false"
      ></vxe-table-column>


      <vxe-table-column
        width="120"
        field="order.broker"
        sortable
        :title="locale.brancher"
        :visible="false"
      >
      </vxe-table-column>
      <!-- 成交数量 -->
      <vxe-table-column
        field="filledQuantity"
        sortable
        :title="locale.filledQuantity"
        :formatter="formatterValue"
      >
      </vxe-table-column>
      <!-- 委托价格 -->
      <vxe-table-column
        field="order.price"
        sortable
        :title="locale.inputPrice"
        :formatter="formatterPriceFixed3"
      >
      </vxe-table-column>

      <vxe-table-column
        field="order.quantity"
        sortable
        :title="locale.inputNumber"
        :formatter="formatterValue"
      >
      </vxe-table-column>
      <vxe-table-column
        field="order.orderType"
        sortable
        :title="locale.orderType"
        :filters="[{ data: { sVal:[]}}]"
        :filter-render=" {
          name: 'FilterSelect',
          options: orderTypeSubSelectList,
        }"
        :formatter="formatterSubOrderTypes"
      >
      </vxe-table-column>

      <vxe-table-column
        field="execAvgPrice"
        sortable
        :title="locale.avgPrice"
        :formatter="formatterPriceFixed3"
      >
      </vxe-table-column>

      <vxe-table-column
        field="order.stockType"
        sortable
        :title="locale.stockType"
        :filters="[{ data: { sVal:[]} }]"
        :filter-render=" {
          name: 'FilterSelect',
          options: stockTypeSelectList,
        }"
        :formatter="formatterStockTypes"
      >
      </vxe-table-column>
      <vxe-table-column
        field="order.side"
        sortable
        title="side"
        :formatter="formatterMarketSide"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="sendingTime"
        sortable
        :title="locale.sendingTime"
        :formatter="formatterRemoveYearTime"
      >
      </vxe-table-column>
      <vxe-table-column
        field="order.reqTime"
        sortable
        :title="locale.reqTime"
        :formatter="formatterRemoveYearTime"
      >
      </vxe-table-column>
      <vxe-table-column
        field="order.remark"
        sortable
        title="remark"
      >
      </vxe-table-column>
      <vxe-table-column
        field="securityID"
        sortable
        title="securityID"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="note"
        sortable
        :title="locale.note"
      >
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import {commonMixin, orderMixin} from "@/mixins";

import {getParSubOrder} from "@/api/subOrder"

import {
  orderActionCellClassList,
  orderActionSelectList,
  orderMarketSideSelectList,
  orderTypeSelectList,
  orderTypeSubSelectList,
  stockTypeSelectList,
  subOrderStateSelectList,
  subOrderStatusRowClassList,
} from "@/utils/common";
import DownLoadCsvButton from '@/components/Common/DownLoadCsvButton'
import footerCountInfo from "@/components/Common/footerCountInfo";
import parentOrder from "./parentOrder";

export default {
  mixins: [orderMixin, commonMixin],
  components: {
    DownLoadCsvButton,
    footerCountInfo
  },

  data() {
    return {
      list: [],
      listMap: null,
      timer: 0,
      pstimer: 0,
      execPId: "",
      parentOrderId: "",
      parentOrder: null,
      // 总母订单数
      totalParentOrder: 0,
      loading1: false,
      status: false,
      // 分页信息列表
      tablePage: {
        PageNo: 1,
        PageSize: 100,
        TotalCount: 0
      },

      // input搜索条件对象
      searchObj: {
        "AccountIds": null,
        "Symbols": null,
        "OrderQid": null,
        "OrderStatus": null,
        "BrokerNumber": null,
        "OrderType": null,
        "SocketType": null,
        "Algorithm": null,
        "Side": null
      }

    };
  },
  created() {
    // 重新连接时在等待父订单获取全部过程中，获得的 更新项目缓冲区
    this.listWaitForUpdate = []
    //
    this.listWaitForUpdateing = false

    // 订单方向
    this.orderActionSelectList = orderActionSelectList
    // 订单状态
    // this.orderStateSelectList = orderStateSelectList
    // 子订单状态
    this.subOrderStateSelectList = subOrderStateSelectList

    // 订单类型
    this.orderTypeSelectList = orderTypeSelectList
    // 股票类型
    this.stockTypeSelectList = stockTypeSelectList
    // 子订单 side
    this.orderMarketSideSelectList = orderMarketSideSelectList
    // 子单状态
    this.orderTypeSubSelectList = orderTypeSubSelectList
    this.locale = this.$t("parentOrder")
    this.common = this.$t("common")

    this.orderActionOptions = this.$t("orderActionOptions")
    this.orderStateOptions = this.$t("orderStateOptions")
    this.subOrderStateOptions = this.$t("subOrderStateOptions")
    // 父订单 RuningStatus
    this.orderRuningStatusOptions = this.$t("orderRuningStatusOptions")
    this.orderMarketSideOptions = this.$t("orderMarketSideOptions")
    this.orderStatusRowClass = subOrderStatusRowClassList
    this.orderActionCellClass = orderActionCellClassList
    this.listWaitForUpdateing = false
    this.parentOrderId = null
    this.sub_order_all_data_request_lock = false

    this.formatRule = {
      "order": {
        "price": this.formatterPriceFixed3,
        "orderType": this.formatterSubOrderTypes,
        "stockType": this.formatterStockTypes,
        "ReqTime": this.formatterRemoveYearTime,
      },
      "execAvgPrice": this.formatterPriceFixed3,
      "sendingTime": this.formatterRemoveYearTime
    }

    // 判断当前页面url是否包含母单ID
    const domain = window.location.href;
    if (domain.indexOf("parentOrderId") > -1){
      // 包含母单
      this.parentOrderId = domain.split("=")[1]
      this.ok()
      this.findListParSub()
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
          this.findListParSub()
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
      return this.genSelecOptions("status");
    },
    // 筛选算法
    orderAlgorithmSelectList: function () {
      return this.genSelecOptions("algorithm");
    },
  },
  methods: {
    ok() {
      if (this.parentOrderId.length > 0) {
        this.execPId = this.parentOrderId
        this.status = true
      } else {
        alert("不能为空")
      }
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

    // 分页数据查询(包含母单)
    findListParSub() {
      const param = {OriginId: this.execPId};
      getParSubOrder(param).then(result1 => {
        this.loading1 = false
        const result = result1.data;
        this.list = result.SubOrders
        this.parentOrder = result.ParentOrder
        var st = this.parentOrder.orderStatus
        if (st!==7 && st!==8 && st!==9){
          return
        }
        this.status=false
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

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.search-input {
  width: 130px;
  margin-left: 10px;
}

.el-row {
  margin-top: 20px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}
</style>
