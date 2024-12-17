<template>
  <div style="margin-left: 5px;margin-right: 5px;">
    <h2 class="page-title">ContinuousRebalance</h2>
    <span></span>

    <el-row class="raw-filter-box1">
<!--      <el-col :span="3">-->
<!--        <el-select v-model="Broker" @change="fetchData"  class="search-input" placeholder="Select Brokers" filterable clearable>-->
<!--          <el-option v-for="num in BrokersDisplayList" :key="num" :value="num" :label="num"></el-option>-->
<!--        </el-select>-->
<!--      </el-col>-->
      <el-button type="warning" @click="dialogFormVisible2 = true">OverwriteTimeDuration</el-button>
      <el-button class="filter-item" type="info" @click="CalculRebalance">
        Calculating
      </el-button>
      <el-button type="primary" @click="dialogFormVisible = true">CancelBroker</el-button>
      <el-button class="filter-item" type="danger" @click="CancelAll">
        CancelAll
      </el-button>
      <DownLoadCsvButton ref="csv" fileName="rebalance.csv" @click.native="downLoadCsvFile"></DownLoadCsvButton>
    </el-row>


    <el-dialog title="OverwriteTimeDuration":visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="Timeduration":label-width="formLabelWidth">
          <el-select v-model="timeduration" class="search-input" placeholder="Select TimeDurationId" style="margin-left: 8px">
            <el-option v-for="num in tradingBatchidsDisplaylist" :label="num" :key="num" :value="num"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IsOverWrite":label-width="formLabelWidth">
          <el-select v-model="over_write" class="search-input" placeholder="Select OverWrite">
            <el-option v-for="obj in BoolList" :key="obj" :value="obj" :label="obj"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-foot">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button  type="primary" @click="UpdateTimeduration">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="CancelByBroker":visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Borker":label-width="formLabelWidth">
          <el-select v-model="brokerid" class="search-input" placeholder="Select Borker"  filterable>
            <el-option v-for="num in BrokersDisplayList" :key="num" :value="num" :label="num"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-foot">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button  type="primary" @click="CancelByBroker">确定</el-button>
      </div>
    </el-dialog>

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
          title="Broker"
          fixed="left"
          width="75"
          :filters="[{ data: { sVal: [] } }]"
          :filter-render="{
          name: 'FilterSelect',
          options: BrokersSelectList
        }"
        ></vxe-column>
        <vxe-column
          field="account_id"
          sortable
          title="Id"
          fixed="left"
          width="75"
          :filters="[{ data: { sVal: [] } }]"
          :filter-render="{
          name: 'FilterSelect',
          options: AccountIdSelectList
        }"
        ></vxe-column>
        <vxe-column
          field="account_name"
          sortable
          title="Name"
          fixed="left"
          width="100"
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
          title="TimeDuration"
          fixed="left"
          width="80"
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

      <vxe-colgroup title="ForwardUnfinished">
        <vxe-column title="Amount/Orders">
          <vxe-column title="Buy"
                      :formatter="formaterColumn3"
          >
          </vxe-column>
          <vxe-column title="Sell"
                      :formatter="formaterColumn4"
          >
          </vxe-column>
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

        <vxe-column title="LeftPct">
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
        <vxe-colgroup title="Finished">
          <vxe-column
            field="finished_diff"
            sortable
            title="Differ"
            :formatter="formaterColumn"
          >
          </vxe-column>
        </vxe-colgroup>
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
      <vxe-colgroup title="Position">
        <vxe-colgroup title="Target">
          <vxe-column
            field="target_value"
            sortable
            title="Config"
            :formatter="formaterColumn"
          >
          </vxe-column>
          <vxe-column
            field="target_amount"
            sortable
            title="Real"
            :formatter="formaterColumn"
          >
          </vxe-column>
          <vxe-column
            field="current_amount"
            sortable
            title="Current"
            :formatter="formaterColumn"
          >
          </vxe-column>
        </vxe-colgroup>

        <vxe-colgroup title="Differ">
          <vxe-column
            field="difference"
            sortable
            title="R-C"
          >
            <template #default="{row}">
              <span>{{differ(row)}}</span>
            </template>
          </vxe-column>
          <vxe-column
            field="difference2"
            sortable
            title="Cfg-C"
          >
            <template #default="{row}">
              <span>{{differ2(row)}}</span>
            </template>
          </vxe-column>
        </vxe-colgroup>

      </vxe-colgroup>

      <vxe-table-column
        title="Operate"
        width="90px"
      >
        <template slot-scope="scope">
          <vxe-button status="danger" content="cancel" @click="CancelByAccount(scope.row)"></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

  </div>

</template>

<script>


import {
  getChangeRebalance,
  UpdateRebalanceTimeduration,
  CalculRebalance,
  CancelByAccount,
  CancelByBroker,
  CancelAll,
  CancelPortfolio
} from '@/api/monitor'
// import { getAccountSymbolList } from "@/api/parentOrder"
import {commonMixin, orderMixin} from "@/mixins";
import { getParentOrderQuerySelect } from '@/api/parentOrder'
const BoolList = [true,false]
import DownLoadCsvButton from '@/components/Common/DownLoadCsvButton'
import footerCountInfoNew from '@/components/Common/footerCountInfo_new'

export default {
  name: "monitorzk.vue",
  mixins: [orderMixin, commonMixin],
  components: {
    DownLoadCsvButton,
    footerCountInfoNew
  },
  data() {
    return {
      list: [],
      tableData: [],
      timeID: null,
      Broker: "",
      loading1: false,
      BrokersDisplayList: [],
      dialogFormVisible:false,
      dialogFormVisible2:false,
      formLabelWidth: '120px',
      BoolList,
      tradingBatchidsDisplaylist: [],
      accountNamelist: [],
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
    differ(row){
      // console.log(row.target_amount, row.current_amount)
      return parseInt((row.target_amount-row.current_amount)/10000)
    },
    differ2(row){
      // console.log(row.target_amount, row.current_amount)
      return parseInt((row.target_value-row.current_amount)/10000)
    },
    downLoadCsvFile() {
      this.loading1 = true
      // for (let i=0;i<this.tableData.length; i++) {
      //   this.tableData[i].insertTime = this.formatterTime(this.downloadList[i].insertTime)
      //   this.tableData[i].latestUpdateTime = this.formatterTime(this.downloadList[i].latestUpdateTime)
      // }
      this.$refs.csv.downLoadCsvFile(this.tableData)
      this.loading1 = false
    },
    cellDBLClickEvent({row, column}) {
      this.getPorderRebalance(row.time_duration_id, row.account_name)
    },
    CancelAll() {
      this.$confirm("是否全部撤单?！",  '撤单确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CancelAll({
        }).then(response => {
          if (response.data.error_id===0){
            this.$XModal.message({content: 'All cancel success', status: 'success'})
          }
          else{
            this.$XModal.message({content: ' cancel fail:'+result.data.err_msg, status: 'error'})
          }
        })
      }).catch(e=>e)
    },
    CancelByBroker() {
      this.$confirm("是否确认撤单?！ broker:"+this.brokerid,  '撤单确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CancelByBroker({
          "broker_id": this.brokerid
        }).then(result => {
          if (result.data.error_id===0){
            this.$XModal.message({content: "broker:"+this.brokerid+  'cancel success', status: 'success'})
          }
          else{
            this.$XModal.message({content: "broker:"+this.brokerid+ ' cancel fail:'+result.data.err_msg, status: 'error'})
          }
        })
      }).catch(e=>e)
      this.dialogFormVisible=false
    },
    CancelByAccount(row) {
      this.$confirm("是否确认撤单?！ account:"+row.account_name,  '撤单确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CancelByAccount({
          "account_id": row.account_name
        }).then(result => {
          if (result.data.error_id===0){
            this.$XModal.message({content: "account:"+row.account_name+  'cancel success', status: 'success'})
          }
          else{
            this.$XModal.message({content: "account:"+row.accountName+ ' cancel fail:'+result.data.err_msg, status: 'error'})
          }
        })
      }).catch(e=>e)
    },
    UpdateTimeduration() {
      this.$confirm("是否更新?！ timeduration是"+this.timeduration+"，over_write="+this.over_write,  '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        UpdateRebalanceTimeduration({
          "time_duration_id": this.timeduration,
          "over_write": this.over_write
        }).then(result => {
          if (result.data.error_id===0){
            this.$XModal.message({content: "timeduration是"+this.timeduration+"，over_write="+this.over_write+  ' update success', status: 'success'})
          }
          else{
            this.$XModal.message({content: "timeduration是"+this.timeduration+"，over_write="+this.over_write+  ' update fail:'+result.data.err_msg, status: 'error'})
          }
        })
      }).catch(e=>e)
      this.dialogFormVisible2=false
    },
    CalculRebalance() {
      this.$confirm("是否计算?！",  '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CalculRebalance({
        }).then(result => {
          if (result.data.error_id===0){
            this.$XModal.message({content: 'CalculRebalance success', status: 'success'})
          }
          else{
            this.$XModal.message({content: 'CalculRebalance fail:'+result.data.err_msg, status: 'error'})
          }
        })
      }).catch(e=>e)
    },
    checkBoxMethod2({row}){
      console.log(row)
    },
    formaterColumn({cellValue}){
      return parseInt(cellValue/10000)
    },
    formaterColumn2({cellValue}){
      return parseFloat(cellValue*100).toFixed(2)+'%'
    },
    formaterColumn3({row}){
      return parseInt(row.forward_unfinished_buy_amount/10000)+"万/"+row.forward_unfinished_buy_num
    },
    formaterColumn4({row}){
      return parseInt(row.forward_unfinished_sell_amount/10000)+"万/"+row.forward_unfinished_sell_num
    },
    formaterColumn5({row}){
      return parseInt(row.current_unfinished_buy_amount/10000)+"万/"+row.current_unfinished_buy_num
    },
    formaterColumn6({row}){
      return parseInt(row.current_unfinished_sell_amount/10000)+"万/"+row.current_unfinished_sell_num
    },
    fetchData() {
      // console.log(this.Broker)
      getChangeRebalance().then(result => {
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
      getParentOrderQuerySelect({Type: "batch_id"}).then(result1 => { // 获取batchid
        var result = result1.data
        this.tradingBatchidsDisplaylist = result.data
      })
      getParentOrderQuerySelect({Type: "account_id"}).then(result1 => {
        var result = result1.data
        this.accountNamelist = result.data
      })
    }
  },
  created() {
    this.findAccSymList()
    this.fetchData()
    this.timeID = setInterval(this.fetchData,2*1000)
  },
  destroyed() {
    // console.log('clearInterval')
    clearInterval(this.timeID)
  }
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
