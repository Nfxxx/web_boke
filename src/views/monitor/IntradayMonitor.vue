<template>
  <div style="margin-left: 5px;margin-right: 5px;">
    <h2 class="page-title"> Intraday Monitor</h2>
    <vxe-toolbar zoom custom>
    </vxe-toolbar>
    <vxe-table
      ref="xTable"
      height="750"
      size="small"
      border
      resizable
      auto-resize
      filter-multiple
      show-overflow
      highlight-hover-row
      highlight-current-row
      align="center"
      id="userInfo_index"
      :custom-config="{storage:true}"

      :data="list"
      :keyboard-config="{ isArrow: true }"
      @cell-dblclick="cellDBLClickEvent"
    >
      <vxe-colgroup title="Account">
        <vxe-table-column
          field="account_name"
          title="name"
        >
        </vxe-table-column>

        <vxe-table-column
          field="product_id"
          title="id"
        >
        </vxe-table-column>
      </vxe-colgroup>

      <vxe-colgroup title="time">
        <vxe-table-column
          field="start_time"
          title="start"
        >
        </vxe-table-column>

        <vxe-table-column
          field="end_time"
          title="end_time"
        >
        </vxe-table-column>
        <vxe-table-column
          field="last_deal_time"
          width="120"
          title="last_deal_time"
          :formatter="formatterParentTime"
        >
        </vxe-table-column>

        <!-- TotalSlices -->
        <vxe-table-column
          field="last_trade_time"
          title="last_trade_time"
          width="120"
          :formatter="formatterParentTime"
        >
        </vxe-table-column>
      </vxe-colgroup>

      <vxe-table-column
        field="trading"
        width="60"
        title="trading"
      >
      </vxe-table-column>

      <vxe-table-column
        field="enable"
        width="60"
        title="enable"
      >
      </vxe-table-column>
      <vxe-table-column
        field="exposure"
        sortable
        title="exposure"
        :formatter="formaterColumn"
      >
      </vxe-table-column>

      <vxe-table-column
        field="shorting"
        sortable
        title="shorting"
        :visible="false"
      >
      </vxe-table-column>

      <vxe-table-column
        field="username"
        sortable
        title="username"
        :visible="false"
      >
      </vxe-table-column>

      <vxe-table-column
        field="trade_start_time"
        sortable
        title="trade_start_time"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="trade_end_time"
        sortable
        title="trade_end_time"
        :visible="false"
      >
      </vxe-table-column>

      <vxe-table-column
        field="all_buy_mount"
        sortable
        title="all_buy_mount"
        :visible="false"
        :formatter="formaterColumn"
      >
      </vxe-table-column>

      <vxe-table-column
        field="all_sell_amount"
        sortable
        title="all_sell_amount"
        :visible="false"
        :formatter="formaterColumn"
      >
      </vxe-table-column>

      <vxe-colgroup title="Filled">
        <vxe-table-column
          field="finish_buy_amount"
          sortable
          title="buy_amount"
          :formatter="formaterColumn"
        >
        </vxe-table-column>

        <vxe-table-column
          field="finish_sell_amount"
          sortable
          title="sell_amount"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
      </vxe-colgroup>

      <vxe-table-column
        field="commission"
        sortable
        title="commission"
        :formatter="formatterPriceFixed2"
      >
      </vxe-table-column>

      <vxe-table-column
        field="close_pl"
        sortable
        width="80"
        title="close_pl"
        :formatter="formatterPriceFixed2"
      >
      </vxe-table-column>

      <vxe-table-column
        field="open_pl"
        sortable
        width="80"
        title="open_pl"
        :formatter="formatterPriceFixed2"
      >
      </vxe-table-column>
      <vxe-table-column
        field="transfer"
        sortable
        width="80"
        title="transfer"
        :formatter="formatterPriceFixed2"
      >
      </vxe-table-column>

      <vxe-table-column
        field="profit"
        sortable
        width="80"
        title="profit"
        :formatter="formatterPriceFixed2"
      >
      </vxe-table-column>

      <vxe-colgroup title="Order">
        <vxe-table-column
          field="finish_order_num"
          sortable
          width="60"
          title="finish"
        >
        </vxe-table-column>

        <vxe-table-column
          field="un_finish_order_num"
          sortable
          width="60"
          title="unfinish"
        >
        </vxe-table-column>

        <vxe-table-column
          field="error_order_num"
          sortable
          width="60"
          title="error"
        >
        </vxe-table-column>
      </vxe-colgroup>
      <!-- 操作 -->
      <!--      <vxe-table-column-->
      <!--        title="Operate"-->
      <!--        width="150"-->
      <!--      >-->
      <!--        <template slot-scope="scope">-->
      <!--          <vxe-button status="success" content="resend" @click="ResendMonitor(scope.row)"></vxe-button>-->
      <!--          <vxe-button status="danger" content="cancel" @click="CancelMonitor(scope.row)"></vxe-button>-->
      <!--        </template>-->
      <!--      </vxe-table-column>-->

    </vxe-table>

  </div>

</template>

<script>
import {orderMixin, commonMixin} from "@/mixins"
import {getIntradayInfo} from "@/api/monitor"

export default {
  mixins: [orderMixin, commonMixin],
  name: "monitor.vue",
  data() {
    return {
      list: [],
      tableData: [],
      searchflag: false,
      timeID: null,
      PortfolioStatus: "All",
      Broker: "",
      BrokersDisplayList: [],
      searchAlltable: null
    }
  },
  methods: {
    formaterColumn({cellValue}) {
      return parseFloat(cellValue / 10000).toFixed(2)
    },
    fetchData() {
      getIntradayInfo().then(result1 => {
        var result = result1.data
        if (result.errorId === 0) {
          this.list = result.data
        } else {
          this.$message({
            message: `访问出错 ${result.errorMsg}`,
            type: "error",
            duration: 3000
          })
        }
      })
    },
    cellDBLClickEvent({row, column}) {
      this.getPorderIntraday(row.account_name)
    },
  },
  created() {
    this.fetchData()
    this.timeID = setInterval(this.fetchData, 5 * 1000)
  },
  destroyed() {
    // console.log('clearInterval')
    clearInterval(this.timeID)
  }
}
</script>

<style scoped>
.search-input {
  width: 130px;
  margin-left: 10px;
}
</style>
