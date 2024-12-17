<template>
  <div style="margin-right: 5px;margin-left: 5px;">
    <div style="overflow: hidden">
      <el-descriptions border :column="5">
        <template v-for="(item, key) in timeTradeDiff">
          <el-descriptions-item :key="key">
            <template slot="label">
              {{ key }}
            </template>
            <template v-if="key === 'TimeRange'">
              {{ item }}
            </template>
            <template v-else-if="key == 'UnfinishOrders' || key == 'FinishOrders' || key == 'ErrorOrders'">
              {{ item }}
            </template>
            <template v-else>
              {{ formaterColumn2(item) }}
            </template>
          </el-descriptions-item>
        </template>
      </el-descriptions>
      <vxe-input v-model="keyword"
                 width="250px" type="search" placeholder="search"
                 style="margin-top: 8px;margin-bottom: 8px;">
      </vxe-input>
    </div>


    <vxe-table
      ref="xTable"
      height="720"
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
      :sort-config="{multiple: true,defaultSort: {field: 'PortfolioId'}}"
      :data="filterData"
      :keyboard-config="{ isArrow: true }"
      @cell-dblclick="cellDBLClickEvent"
    >
      <!-- 时间点ID -->
      <vxe-table-column
        field="TimeDurationId"
        title="TimeId"
        sortable
        width="90"
        :filters="[{ data: { sVal:[]} }]"
        :filter-render="{
          name: 'FilterSelect',
          options: this.genSelecOptions1(this.tableData, 'TimeDurationId')
        }"
      >
      </vxe-table-column>
      <!-- 投资组合名称 -->
      <vxe-table-column
        field="PortfolioId"
        title="PortfolioId"
        width="170"
        :filters="[{ data: { sVal:[]} }]"
        :filter-render="{
          name: 'FilterSelect',
          options: this.genSelecOptions1(this.tableData, 'PortfolioId')
        }"
      >
      </vxe-table-column>

      <!-- Account -->
      <vxe-table-column
        field="AccountName"
        title="AccountName"
        width="120"
      >
      </vxe-table-column>
      <vxe-table-column
        field="Broker"
        title="Broker"
        width="90"
        :filters="[{ data: { sVal:[]} }]"
        :filter-render="{
          name: 'FilterSelect',
          options: this.genSelecOptions1(this.tableData, 'Broker')
        }"
      >
      </vxe-table-column>

      <!-- ActualBuyTargetBuy -->
      <vxe-colgroup title="Input">
        <vxe-table-column
          field="InputBuyAmount"
          sortable
          title="Buy$"
          width="80"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
        <vxe-table-column
          field="InputSellAmount"
          sortable
          title="Sell$"
          width="80"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DiffInputAmount"
          sortable
          title="Diff$"
          width="70"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
      </vxe-colgroup>

      <vxe-colgroup title="Filled">
        <vxe-table-column
          field="FilledBuyAmount"
          sortable
          title="Buy$"
          width="80"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
        <vxe-table-column
          field="FilledSellAmount"
          sortable
          title="Sell$"
          width="80"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
        <vxe-table-column
          field="DiffFilledAmount"
          sortable
          title="Diff$"
          width="70"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
      </vxe-colgroup>
      <vxe-colgroup title="FilledPrecent">
        <vxe-table-column
          field="BuyCpt%"
          sortable
          title="Buy%"
          width="70"
          :formatter="formaterColumnBuy"
        >
        </vxe-table-column>
        <vxe-table-column
          field="SellCpt%"
          sortable
          title="Sell%"
          width="70"
          :formatter="formaterColumnSell"
        >
        </vxe-table-column>
      </vxe-colgroup>
      <vxe-colgroup title="Error">
        <vxe-table-column
          field="ErrorBuyAmount"
          sortable
          width="70"
          title="Buy$"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
        <vxe-table-column
          field="ErrorSellAmount"
          sortable
          width="70"
          title="Sell$"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
      </vxe-colgroup>
      <vxe-colgroup title="Order">
        <vxe-table-column
          field="ErrorOrders"
          sortable
          title="Error"
          width="65"
        >
        </vxe-table-column>
        <vxe-table-column
          field="UnfinishOrders"
          sortable
          title="Unfinish"
          width="70"
        >
        </vxe-table-column>
        <vxe-table-column
          field="FinishOrders"
          sortable
          title="Finish"
          width="65"
        >
        </vxe-table-column>
      </vxe-colgroup>


      <!-- 操作 -->
      <vxe-table-column
        title="Operate"
      >
        <template slot-scope="scope">
          <vxe-button status="success" content="resend" @click="ResendMonitor(scope.row)"></vxe-button>
          <vxe-button status="danger" content="cancel" @click="CancelMonitor(scope.row)"></vxe-button>
        </template>
      </vxe-table-column>

    </vxe-table>

  </div>

</template>

<script>


import {CancelPortfolio, getUnfinishPortfolio, ResendPortfolio} from "@/api/monitor"
import {commonMixin, orderMixin} from "@/mixins";

export default {
  name: "monitor.vue",
  mixins: [orderMixin, commonMixin],
  data() {
    return {
      tableData: [],
      timeTradeDiff: null,
      timeID: null,
      keyword: "",
    }
  },
  computed: {
    filterData() {
      const lowerkeyword = this.keyword.toLowerCase();
      return lowerkeyword ? this.tableData.filter(
        (row) =>
          row.TimeDurationId.toLowerCase().includes(lowerkeyword) ||
          row.PortfolioId.toLowerCase().includes(lowerkeyword) ||
          row.AccountName.toLowerCase().includes(lowerkeyword) ||
          row.Broker.toLowerCase().includes(lowerkeyword)
      ) : this.tableData;
    },
  },
  methods: {
    formaterColumn2(amount) {
      return parseFloat(amount / 10000).toFixed(2)
    },
    formaterColumn({cellValue}) {
      return parseFloat(cellValue / 10000).toFixed(2)
    },
    formaterColumnBuy({row}) {
      return parseFloat(row.FilledBuyAmount / row.InputBuyAmount * 100).toFixed(2)
    },
    formaterColumnSell({row}) {
      return parseFloat(row.FilledSellAmount / row.InputSellAmount * 100).toFixed(2)
    },
    cellDBLClickEvent({row, column}) {
      this.getPorderAccount(row.TimeDurationId, row.PortfolioId)
    },

    fetchData() {
      getUnfinishPortfolio().then(result => {
        this.tableData = result.data.Data
        this.timeTradeDiff = result.data.TimeTradeDiff
      })
    },
    ResendMonitor(row) {
      this.$confirm("是否确认重发订单?！ TimeDurationId:" + row.TimeDurationId + ",PortfolioId:" + row.PortfolioId, '重置组合确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ResendPortfolio({TimeDurationId: row.TimeDurationId, AccountName: row.AccountName, PortfolioId: row.PortfolioId}
        ).then(result => {
          if (result.data.ErrorId === 0) {
            this.$XModal.message({
              content: "账户" + row.AccountName + '，时间点ID' + row.TimeDurationId + 'resend success',
              status: 'success'
            })
          } else {
            this.$XModal.message({
              content: "账户" + row.AccountName + ', 时间点ID' + row.TimeDurationId + 'resend fail:' + result.data.Err_Msg,
              status: 'error'
            })
          }
        })
      }).catch(e => e)
    },
    CancelMonitor(row) {
      this.$confirm("是否确认撤单?！ TimeDurationId:" + row.TimeDurationId + ",PortfolioId:" + row.PortfolioId, '撤单确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CancelPortfolio({TimeDurationId: row.TimeDurationId, AccountName: row.AccountName, PortfolioId: row.PortfolioId}
        ).then(result => {
          if (result.data.ErrorId === 0) {
            this.$XModal.message({
              content: "账户" + row.AccountName + '，时间点ID' + row.TimeDurationId + 'cancel success',
              status: 'success'
            })
          } else {
            this.$XModal.message({
              content: "账户" + row.AccountName + '，时间点ID' + row.TimeDurationId + ' cancel fail:' + result.data.Err_Msg,
              status: 'error'
            })
          }
        })
      }).catch(e => e)
    },
  },
  created() {
    this.fetchData()
    this.timeID = setInterval(this.fetchData, 3 * 1000)
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

.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}

:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

</style>
