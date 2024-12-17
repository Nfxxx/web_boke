<template>
  <div style="margin-left: 5px;margin-right: 5px;">
    <h2 class="page-title">New Rebalance Monitor His</h2>
    <span></span>

    <el-row class="raw-filter-box">
<!--      <el-col :span="3">-->
<!--        <el-select v-model="Broker" @change="fetchData"  class="search-input" placeholder="Select Brokers" filterable clearable>-->
<!--          <el-option v-for="num in BrokersDisplayList" :key="num" :value="num" :label="num"></el-option>-->
<!--        </el-select>-->
<!--      </el-col>-->
      <el-col :span="1">
        <el-button class="filter-item" type="info" @click="fetchData">
          查询
        </el-button>
      </el-col>
      <el-col :span="2">
        <DownLoadCsvButton ref="csv" fileName="rebalanceHistory.csv" @click.native="downLoadCsvFile"></DownLoadCsvButton>
      </el-col>
    </el-row>

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
      :checkbox-config="{checkMedthod: checkBoxMethod2}"
      :data="list"
      :keyboard-config="{ isArrow: true }"
      @cell-dblclick="cellDBLClickEvent"

    >
      <vxe-colgroup title="Basic" fixed="left">
        <vxe-column
          field="broker_id"
          sortable
          title="BrokerId"
          fixed="left"
          width="80"
          :filters="[{ data: { sVal: [] } }]"
          :filter-render="{
          name: 'FilterSelect',
          options: BrokersSelectList
        }"
        ></vxe-column>
        <vxe-column
          field="account_id"
          sortable
          title="AccountId"
          fixed="left"
          width="80"
          :filters="[{ data: { sVal: [] } }]"
          :filter-render="{
          name: 'FilterSelect',
          options: AccountIdSelectList
        }"
        ></vxe-column>
        <vxe-column
          field="account_name"
          sortable
          title="AccountName"
          fixed="left"
          width="110"
          :filters="[{ data: { sVal: [] } }]"
          :filter-render="{
          name: 'FilterSelect',
          options: AccountNameSelectList
        }"
        >
        </vxe-column>
        <vxe-column
          field="time_duration_id"
          sortable
          title="TimeDurationId"
          fixed="left"
          width="110"
          :filters="[{ data: { sVal: [] } }]"
          :filter-render="{
          name: 'FilterSelect',
          options: TimeDurationSelectList
        }"
        >
        </vxe-column>
        <vxe-column
          field="error_orders"
          sortable
          title="Errors"
          fixed="left"
        >
        </vxe-column>
      </vxe-colgroup>

      <vxe-colgroup title="CurrentUnfinished">
        <vxe-column title="Amount/Orders">
          <vxe-column title="Buy"
                      :formatter="formaterColumn5"
          >
          </vxe-column>
          <vxe-column title="Sell"
                      :formatter="formaterColumn6"
          >
          </vxe-column>

        </vxe-column>
        <vxe-column title="Pct">
          <vxe-column
            field="current_unfinished_buy_precent"
            sortable
            title="Buy"
            :formatter="formaterColumn2"
          >
          </vxe-column>
          <vxe-column
            field="current_unfinished_sell_precent"
            sortable
            title="Sell"
            :formatter="formaterColumn2"
          >
          </vxe-column>
        </vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="CurrentAllAmount">
        <vxe-column
          field="current_all_buy_amount"
          sortable
          title="Buy"
          :formatter="formaterColumn"
        >
        </vxe-column>
        <vxe-column
          field="current_all_sell_amount"
          sortable
          title="Sell"
          :formatter="formaterColumn"
        >
        </vxe-column>
        <vxe-column
          field="finished_diff"
          sortable
          title="FinishedDiffer"
          :formatter="formaterColumn"
        >
        </vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="TargetAmount">
        <vxe-column
          field="target_buy_amount"
          sortable
          title="Buy"
          :formatter="formaterColumn"
        >
        </vxe-column>
        <vxe-column
          field="target_sell_amount"
          sortable
          title="Sell"
          :formatter="formaterColumn"
        >
        </vxe-column>
        <vxe-column
          sortable
          title="Differ"
        >
          <template #default="{row}">
            <span>{{differTatget1(row)}}</span>
          </template>
        </vxe-column>
      </vxe-colgroup>
    </vxe-table>

  </div>

</template>

<script>


import {
  getChangeRebalanceHis
} from '@/api/monitor'
// import { getAccountSymbolList } from "@/api/parentOrder"
import {commonMixin, orderMixin} from "@/mixins";
import { getParentOrderQuerySelect } from '@/api/parentOrder'
import DownLoadCsvButton from '@/components/Common/DownLoadCsvButton'
import footerCountInfoNew from '@/components/Common/footerCountInfo_new'

export default {
  name: "monitorhis.vue",
  mixins: [orderMixin, commonMixin],
  components: {
    DownLoadCsvButton,
    footerCountInfoNew
  },
  data() {
    return {
      list: [],
      tableData: [],
      // timeID: null,
      Broker: "",
      BrokersDisplayList: [],
      dialogFormVisible:false,
      dialogFormVisible2:false,
      timeduration: null,
      over_write: null,
      accountName: null,
      brokerid: null,
      form: null    }
  },
  computed: {
    TimeDurationSelectList: function () {
      return this.genSelecOptions("time_duration_id");
    },
    AccountIdSelectList() {
      return this.genSelecOptions("account_id")
    },
    AccountNameSelectList() {
      return this.genSelecOptions("account_name")
    },
    BrokersSelectList() {
      return this.genSelecOptions("broker_id")
    }
  },
  methods: {
    differTatget1(row){
      // console.log(row.target_amount, row.current_amount)
      return parseInt((row.target_buy_amount-row.target_sell_amount)/10000)
    },
    downLoadCsvFile() {
      this.loading1 = true
      this.$refs.csv.downLoadCsvFile(this.tableData)
      this.loading1 = false
    },
    cellDBLClickEvent({row, column}) {
      console.log(row.time_duration_id, row.account_name)
      this.getPorderRebalance(row.time_duration_id, row.account_name)
    },
    checkBoxMethod2({row}){
      console.log(row)
    },
    formaterColumn({cellValue}){
      return parseInt(cellValue/10000)
    },
    formaterColumn2({cellValue}){
      return parseInt(cellValue*100)+'%'
    },
    formaterColumn5({row}){
      return parseInt(row.current_unfinished_buy_amount/10000)+"万/"+row.current_unfinished_buy_num
    },
    formaterColumn6({row}){
      return parseInt(row.current_unfinished_sell_amount/10000)+"万/"+row.current_unfinished_sell_num
    },
    fetchData() {
      // console.log(this.Broker)
      getChangeRebalanceHis().then(result => {
        this.list = result.data
        this.tableData = result.data

      })
    },

    //获取Broker
    findAccSymList() {
      getParentOrderQuerySelect({Type: "broker"}).then(result1 => {
        var result = result1.data
        this.BrokersDisplayList = result.data
      })
    }
  },
  created() {
    this.findAccSymList()
    this.fetchData()
    // this.timeID = setInterval(this.fetchData,20*1000)
  },
  // destroyed() {
  //   // console.log('clearInterval')
  //   clearInterval(this.timeID)
  // }
}
</script>

<style>
.el-row{
  margin-bottom: 20px;
}
.el-col{
  border-radius: 4px;
}
.raw-filter-box {
  padding: 0 10px;
}
</style>
