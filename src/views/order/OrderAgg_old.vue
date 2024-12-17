<template>
  <div style="margin-left: 5px;margin-right: 5px;;margin-top: 15px;">
    <template>
      <el-select
        v-model="filterCondition.Key"
        clearable
        placeholder="Select GroupKey"
        class="search-input"
      >
        <el-option v-for="(item,index) in inputObj.Group"
                   :key="item"
                   :label="item"
                   :value="item"
        >
        </el-option>
      </el-select>
      <el-select v-model="filterCondition.AccountId" clearable multiple filterable placeholder="Account" class="search-input"r @change="findSelect" @remove-tag="removeTag('account')" style="width: 180px" collapse-tags>
        <el-option label="selectAll" value="selectAll" style="font-weight:bold;" @click.native="selectAll('account')">Select All Or Not</el-option>
        <el-option v-for="(item,index) in inputObj.Account" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="filterCondition.StrategyId" clearable multiple filterable placeholder="Strategy" class="search-input" @change="findSelect" @remove-tag="removeTag('strategy')" style="width: 220px" collapse-tag>
        <el-option label="selectAll" value="selectAll" style="font-weight:bold;" @click.native="selectAll('strategy')">Select All Or Not</el-option>
        <el-option v-for="(item,index) in inputObj.Strategy" :key="item" :label="item" :value="item"></el-option>
      </el-select>
<!--      <el-select v-model="filterCondition.Group" clearable multiple filterable placeholder="Group" class="search-input" @change="findSelect" @remove-tag="removeTag('group')" collapse-tags>-->
<!--        <el-option label="selectAll" value="selectAll" style="font-weight:bold;" @click.native="selectAll('group')">Select All Or Not</el-option>-->
<!--        <el-option v-for="(item,index) in inputObj.Group" :key="item" :label="item" :value="item"></el-option>-->
<!--      </el-select>-->
      <el-select v-model="filterCondition.Algo" clearable multiple filterable placeholder="Algo" class="search-input" @change="findSelect" @remove-tag="removeTag('algo')" style="width: 220px" collapse-tags>
        <el-option label="selectAll" value="selectAll" style="font-weight:bold;" @click.native="selectAll('algo')">Select All Or Not</el-option>
        <el-option v-for="(item,index) in inputObj.Algo" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="filterCondition.Broker" @change="findSelect" class="search-input" placeholder="Broker" clearable multiple filterable @remove-tag="removeTag('broker')" style="width: 180px" collapse-tags>
        <el-option  label="selectAll" value="selectAll" style="font-weight:bold;" @click.native="selectAll('broker')">Select All Or Not</el-option>
        <el-option v-for="num in inputObj.Broker" :key="num" :value="num" :label="num"></el-option>
      </el-select>


      <el-select v-model="filterCondition.Portfolio" clearable multiple filterable placeholder="Portfolio" class="search-input" @change="findSelect" style="width: 250px" @remove-tag="removeTag('portfolio')" collapse-tags>
        <el-option label="selectAll" value="selectAll" style="font-weight:bold;" @click.native="selectAll('portfolio')">Select All Or Not</el-option>
        <el-option v-for="(item,index) in inputObj.Portfolio" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="filterCondition.TimeDurationId" clearable multiple filterable placeholder="TimeDurationId" class="search-input" @change="findSelect" style="width: 150px"  @remove-tag="removeTag('batchId')" collapse-tags>
        <el-option label="selectAll" value="selectAll" style="font-weight:bold;" @click.native="selectAll('batchId')">Select All Or Not</el-option>
        <el-option v-for="(item,index) in inputObj.TimeDurationId" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="filterCondition.Channel" clearable multiple filterable placeholder="Channel" class="search-input" @change="findSelect">
        <el-option v-for="(item,index) in inputObj.Channel" :key="item" :label="item" :value="item"></el-option>
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
      </template>
    </vxe-toolbar>

    <vxe-table
      class="mytable-footer"

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
      id="aggregation_index"
      :custom-config="{storage:true}"
      :data="tableData"
      :loading="listLoading"
      :keyboard-config="{ isArrow: true }"
      :sort-config="sortConfig"
      :show-footer="showFooter"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
    >

      <vxe-colgroup title="Key" fixed="left">
        <vxe-table-column
          field="Group"
          :title="filterCondition.Key"
          width="160"
          sortable
          :formatter="formatterKey"
          :filters="[{ data: { sVal:[]} }]"
          :filter-render="{
          name: 'FilterSelect',
          options: this.genSelecOptions1(this.tableData, 'Group')
        }"
        ></vxe-table-column>
      </vxe-colgroup>

      <vxe-colgroup title="Total">
        <!-- Total Traded Notional -->
        <vxe-table-column field="TotalFilledAmount" title="Fill($)" sortable :formatter="formatW2f"></vxe-table-column>
        <vxe-table-column field="TotalInputVol" title="TgtQty" sortable></vxe-table-column>
        <vxe-table-column field="TotalFilledVol" title="FillQty" sortable></vxe-table-column>
        <vxe-column sortable title="AvgPrice" field="TotalAvgPrice" :formatter="format2f"></vxe-column>
      </vxe-colgroup>
      <vxe-table-column field="ArrivalCost" title="ArrivalCost" sortable  :formatter="format2f"></vxe-table-column>
      <vxe-colgroup title="Orders" >
        <vxe-table-column field="ParentOrderNum" title="Parent" sortable></vxe-table-column>
        <vxe-table-column field="SubOrderNum" title="Slice" sortable></vxe-table-column>
      </vxe-colgroup>]
      <vxe-table-column field="TotalFilledPrecent" title="Fill(%)" sortable :formatter="format2f"></vxe-table-column>
      <vxe-table-column field="TotalCancelPrecent" title="Cxl(%)" :formatter="format2f" sortable></vxe-table-column>

      <vxe-colgroup title="BuyNotional" >
        <vxe-table-column field="BuyFilledAmount" title="Filled" sortable :formatter="formatW2f"></vxe-table-column>
        <vxe-table-column field="BuyInputAmount" title="Target" sortable :formatter="formatW2f"></vxe-table-column>
        <vxe-table-column title="Rate(%)" sortable :formatter="formaterPctBuy"></vxe-table-column>
      </vxe-colgroup>

      <vxe-colgroup title="SellNotional" >
        <vxe-table-column field="SellFilledAmount" title="Filled" sortable :formatter="formatW2f"></vxe-table-column>
        <vxe-table-column field="SellInputAmount" title="Target" sortable :formatter="formatW2f"></vxe-table-column>
        <vxe-table-column field="SellNotionalRate" title="Rate(%)" sortable :formatter="formaterPctSell"></vxe-table-column>
      </vxe-colgroup>

      <vxe-colgroup title="B-S" >
        <vxe-table-column field="TradedDiff" title="TradedDiff" sortable :formatter="formatW2f"></vxe-table-column>
      </vxe-colgroup>
    </vxe-table>

<!--    <footerCountInfoNew :total="total" :filters="filters"></footerCountInfoNew>-->

  </div>
</template>

<script>
import DownLoadCsvButton from '@/components/Common/DownLoadCsvButton'
import footerCountInfoNew from "@/components/Common/footerCountInfo_new";

import XEUtils from 'xe-utils'
import {commonMixin} from "@/mixins";

import {getOrderAggregation,getSelect} from '@/api/aggregation'

const SIDEOBJ = {
  "0": "buy",
  "1": "sell",
  "2": "cover",
  "3": "sell_short"
}

export default {
  mixins: [commonMixin],

  components: {
    DownLoadCsvButton,
    footerCountInfoNew
  },
  created() {
    this.locale = this.$t("aggregation");
    this.common = this.$t("common");

    // 记录分组后的统计结果
    this.groupOptions = [
      {
        value: 'accoutId',
        label: 'accountId'
      },
      {
        value: 'symbol',
        label: 'symbol'
      },
      {
        value: 'originId',
        label: 'OriginId'
      },
      {
        value: 'strategyId',
        label: 'strategyId'
      },
      {
        value: 'group',
        label: 'group'
      },
      {
        value: 'algo',
        label: 'algo'
      },

    ]
    this.findSelect()
  },

  data() {
    return {
      list: [],
      tableData: [],
      showFooter: true,
      listLoading: false,
      timer: null,
      SIDEOBJ,
      filterCondition: {
        "Key": "",
        "AccountId": [],
        "StrategyId": [],
        "Algo": [],
        // "Symbol": [],
        "Portfolio": [],
        "TimeDurationId": [],
        "Channel": [],
        "Broker": [],
        // "Side": [],

      },
      inputObj:{
        Strategy: [],
        Algo: [],
        Portfolio: [],
        Broker:[],
        TimeDurationId: [],
        Channel: [],
        Side: [],
        symbol: [],
        Account: [],
      },
      status: false,
      keyword: "",

      total: null,
      filters: null,
      grand: [],
    };
  },
  beforeMount() {
    this.cuurrentSortConfig = localStorage.getItem("VXESortConfig") === "false" ? false : true
    this.sortConfig = {
      trigger: 'cell',
      multiple: this.cuurrentSortConfig,
    }
  },
  mounted() {
    // 定时刷新
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        if (this.status) {
          this.Query()
        }
      }, 3000)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    startclose() {
      this.status = !this.status
    },
    Query() {
      const pageOrderPara = {
        "Group": this.filterCondition.Key,
        "AccountId": this.filterCondition.AccountId,
        "Broker": this.filterCondition.Broker,
        "Portfolio": this.filterCondition.Portfolio,
        "Algorithm": this.filterCondition.Algo,
        "TimeDurationId":  this.filterCondition.TimeDurationId,
        "Channel": this.filterCondition.Channel,
        "StrategyId": this.filterCondition.StrategyId,
      };

      getOrderAggregation(pageOrderPara).then(
        result => {
          const res = result.data
          console.log( res)
          this.tableData = res.OrderAggregations
          this.grand = res.SumOrderAggregation
        }
      )
    },
    differTatget1(row){
      return parseFloat(row.TotalTradNotional/row.TotalFilledQuantity ).toFixed(3)
    },

    selectAll(key){
      if (key === "account"){
        if ( this.filterCondition.AccountId.length < this.inputObj.Account.length) {
          this.filterCondition.AccountId=[]
          this.filterCondition.AccountId = this.inputObj.Account
          // this.filterCondition.AccountId.unshift('account')
        }else {
          this.filterCondition.AccountId = []
        }
      }else if (key === "strategy"){
        if ( this.filterCondition.StrategyId.length < this.inputObj.Strategy.length) {
          this.filterCondition.StrategyId=[]
          this.filterCondition.StrategyId = this.inputObj.Strategy
          // this.filterCondition.StrategyId.unshift('strategy')
        }else {
          this.filterCondition.StrategyId = []
        }
      }else if (key === "group"){
        if ( this.filterCondition.Group.length < this.inputObj.Group.length) {
          this.filterCondition.Group=[]
          this.filterCondition.Group = this.inputObj.Group
          // this.filterCondition.Group.unshift('group')
        }else {
          this.filterCondition.Group = []
        }
      }else if (key === "algo"){
        if ( this.filterCondition.Algo.length < this.inputObj.Algo.length) {
          this.filterCondition.Algo=[]
          this.filterCondition.Algo = this.inputObj.Algo
          // this.filterCondition.Algo.unshift('algo')
        }else {
          this.filterCondition.Algo = []
        }
      }else if (key === "broker"){
        if ( this.filterCondition.Broker.length < this.inputObj.Broker.length) {
          this.filterCondition.Broker=[]
          this.filterCondition.Broker = this.inputObj.Broker
          // this.filterCondition.Broker.unshift('broker')
        }else {
          this.filterCondition.Broker = []
        }
      }else if (key === "portfolio"){
        if ( this.filterCondition.Portfolio.length < this.inputObj.Portfolio.length) {
          this.filterCondition.Portfolio=[]
          this.filterCondition.Portfolio = this.inputObj.Portfolio
          // this.filterCondition.Portfolio.unshift('portfolio')
        }else {
          this.filterCondition.Portfolio = []
        }
      // }else if (key === "symbol"){
      //   if ( this.filterCondition.Symbol.length < this.symbolDisplaylist.length) {
      //     this.filterCondition.Symbol=[]
      //     this.filterCondition.Symbol = this.symbolDisplaylist
      //   }else {
      //     this.filterCondition.Symbol = []
      //   }
      }else if (key === "batchId"){
        if ( this.filterCondition.TimeDurationId.length < this.inputObj.TimeDurationId.length) {
          this.filterCondition.TimeDurationId=[]
          this.filterCondition.TimeDurationId = this.inputObj.TimeDurationId
          // this.filterCondition.BatchId.unshift('batchId')
        }else {
          this.filterCondition.TimeDurationId = []
        }
      }
    },
    removeTag(val) {
      if (val === 'account') {
        this.filterCondition.AccountId=[]
      }else if (val === "strategy"){
        this.filterCondition.StrategyId = []
      }if (val === "group"){
        this.filterCondition.Group = []
      }else if (val === "algo"){
        this.filterCondition.Algo=[]
      }else if (val === "broker"){
        this.filterCondition.Broker=[]
      }else if (val === "portfolio"){
        this.filterCondition.Portfolio=[]
      }else if (val === "batchId"){
        this.filterCondition.TimeDurationId=[]
      }else if (val === "symbol"){
        this.filterCondition.Symbol=[]
      }
    },

    findSelect() {
      getSelect(this.filterCondition).then(result => {
        const res = result.data
        console.log(res)
        this.inputObj.Account = res.AccountId
        this.inputObj.Algo = res.Algorithm
        this.inputObj.Broker = res.Broker
        this.inputObj.Channel = res.Channel
        this.inputObj.Group = res.Group
        this.inputObj.Portfolio = res.Portfolio
        this.inputObj.Strategy = res.StrategyId
        this.inputObj.TimeDurationId = res.TimeDurationId
        if (this.filterCondition.Key==="" &&this.inputObj.Group.length>0){
          this.filterCondition.Key = this.inputObj.Group[0]
        }
        // this.inputObj.orderChannelSelectList = res.Channel
        // this.inputObj.orderSideSelectList = res.Side
        // this.inputObj.orderBatchIdSelectList = res.BatchId
      })
    },
    formatW2f({cellValue}) {
      return parseFloat(cellValue/10000).toFixed(2)+"万"
    },
    format2f({cellValue}) {
      return parseFloat(cellValue).toFixed(2)
    },
    formaterPctBuy({row}){
      return parseFloat(row.BuyFilledAmount/row.BuyInputAmount*100).toFixed(2)
    },
    formaterPctSell({row}){
      return parseFloat(row.SellFilledAmount/row.SellInputAmount*100).toFixed(2)
    },
    formatterKey({cellValue}) {
      if (cellValue === '0' || cellValue === "1" || cellValue === "2" || cellValue === "3") {
        return SIDEOBJ[cellValue]
      } else {
        return cellValue
      }
    },

    formatNumberToFixed({cellValue}) {
      return this._.floor(cellValue * 100)
      // return (cellValue * 100).toFixed(1) + "%";
    },

    footerMethod() {

      return [[
        'Grand',
        parseFloat(this.grand.TotalFilledAmount/10000).toFixed(1)+"万",
        this.grand.TotalInputVol/10000,
        this.grand.TotalFilledVol/10000,
        null,
        this.grand.ArrivalCost.toFixed(2),
        this.grand.ParentOrderNum,
        this.grand.SubOrderNum,
        this.grand.TotalFilledPrecent.toFixed(2),
        this.grand.TotalCancelPrecent.toFixed(2),
        parseFloat(this.grand.BuyFilledAmount/10000).toFixed(1)+"万",

        null,
        null,
        parseFloat(this.grand.SellFilledAmount/10000).toFixed(1)+"万",
        null,
        null

      ]]

    },
    footerCellClassName({$rowIndex, column, columnIndex}) {
      if (columnIndex === 0) {
        return "col-weight"
      } else {
        return "col-footer-cell"
      }
    },

  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
};
</script>

<style scoped>
.mytable-footer >>> .col-weight {

  background: grey;
  color: white;
}

.mytable-footer >>> .col-footer-cell {
  color: black;
  background: orange;
  border-left: 1px solid black;
}

.raw-filter-box .el-select {
  width: 100%;
  /*padding-right: 20px;*/
  /*padding:5px 10px;*/
}

.search-input {
  width: 150px;
  margin-left: 10px;
}
</style>
