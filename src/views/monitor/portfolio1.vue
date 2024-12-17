<template>
  <div style="margin-left: 5px;margin-right: 5px;">
    <br>
    <vxe-input v-model="keyword" type="search" placeholder="search"></vxe-input>
    <br>
    <br>
    <vxe-table
      ref="xTable"
      height="790"
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
        sortable
        title="TimeId"
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
        sortable
        width="180"
        title="PortfolioId"
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
          width="80"
          :formatter="formaterColumnBuy"
        >
        </vxe-table-column>
        <vxe-table-column
          field="SellCpt%"
          sortable
          title="Sell%"
          width="80"
          :formatter="formaterColumnSell"
        >
        </vxe-table-column>
      </vxe-colgroup>
      <vxe-colgroup title="Error">
        <vxe-table-column
          field="ErrorBuyAmount"
          sortable
          width="80"
          title="Buy$"
          :formatter="formaterColumn"
        >
        </vxe-table-column>
        <vxe-table-column
          field="ErrorSellAmount"
          sortable
          width="80"
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
          width="60"
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
          width="70"
        >
        </vxe-table-column>
      </vxe-colgroup>


      <!-- 操作 -->
      <vxe-table-column
        title="Operate"
        width="160"
      >
        <template slot-scope="scope">
          <vxe-button status="success" content="resend" @click="ResendMonitor(scope.row)"></vxe-button>
        </template>
      </vxe-table-column>

    </vxe-table>

  </div>

</template>

<script>


import {getFinishPortfolio, ResendPortfolio} from "@/api/monitor"
import {commonMixin, orderMixin} from "@/mixins";

export default {
  name: "monitor.vue",
  mixins: [orderMixin, commonMixin],
  data() {
    return {
      tableData: [],
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
      getFinishPortfolio().then(result => {
        this.tableData = result.data.Data
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
  },
  created() {
    this.fetchData()
  },
  destroyed() {
  }
}
</script>

<style scoped>

</style>
