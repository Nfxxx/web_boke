<template>
  <div style="margin-left: 5px;margin-right: 5px;">
    <br>
    <template>
      <el-row type="flex" :gutter="10">
        <el-col :span="3">
          <vxe-input v-model="keyword" type="search" placeholder="search"
                     size="100px" @keyup="filterData" style="height: 40px;margin-left: 10px"></vxe-input>
        </el-col>
        <el-col :span="3">
          <el-select
            v-model="searchObj.AccountId"
            clearable
            placeholder="Select Account"
            class="search-input"
            filterable
          >
            <el-option v-for="num in accountlist" :key="num" :label="num" :value="num"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="searchObj.Direction"
            clearable
            placeholder="Select Direction"
            class="search-input"
            filterable
          >
            <el-option v-for="(item,index) in directionSelectList" :key="index" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" @click="Query" style="width: 100px">
            查询
          </el-button>
        </el-col>
        <el-col :span="4">
          <el-button :type="status?'danger':'primary'"
                     @click="startclose" style="width: 100px">
            {{ status ? '停止刷新' : '开启刷新' }}
          </el-button>
        </el-col>

      </el-row>
    </template>
    <br>
    <br>
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
      id="position_index"
      :sort-config="sortConfig"
      :custom-config="{storage:true}"

      :data="list2"
      :print-config="{}"
      :keyboard-config="{ isArrow: true }"
      :row-class-name="rowClassName"
    >
      <!-- 资金账号 -->
      <vxe-table-column
        field="accountId"
        sortable
        :title="locale.accountId"
      >
      </vxe-table-column>
      <!-- 合约代码 -->
      <vxe-table-column
        field="symbol"
        sortable
        :title="locale.symbol"
      >
      </vxe-table-column>

      <!-- 持仓数量 -->
      <vxe-table-column
        field="allQuantity"
        sortable
        :title="locale.allQuantity"
        :formatter="formatterValue"
      >
      </vxe-table-column>

      <!-- 可用数量 -->
      <vxe-table-column
        field="availableQuantiy"
        sortable
        :title="locale.availableQuantiy"
        :formatter="formatterValue"
      >
      </vxe-table-column>

      <vxe-table-column
        field="frozenQuantity"
        sortable
        title="frozenQuantity"
        :formatter="formatterValue"
      >
      </vxe-table-column>

      <!-- 昨日持仓 -->
      <vxe-table-column
        field="yesterdayVol"
        sortable
        :title="locale.yesterdayVol"
        :formatter="formatterValue"
      >
      </vxe-table-column>

      <!-- 今日持仓 -->
      <vxe-table-column field="todayVol" sortable :title="locale.todayVol">
      </vxe-table-column>


      <!--       持仓成本-->
      <vxe-table-column
        field="positionAvgPrice"
        sortable
        :title="locale.positionAvgPrice"
        :visible="false"
      >
      </vxe-table-column>
      <vxe-table-column
        field="occupationMargin"
        sortable
        title="occupationMargin"
        :visible="false"
      >
      </vxe-table-column>

      <vxe-table-column
        field="createTime"
        sortable
        title="CreateTime"
        :visible="false"
      >
      </vxe-table-column>

      <!-- 持仓方向 -->
      <vxe-table-column
        field="direction"
        sortable
        :title="locale.direction"
        :formatter="formatterPositionDirection"
      >
      </vxe-table-column>

      <!-- 浮动盈亏 -->
      <vxe-table-column field="openPI" sortable :title="locale.openPI" :visible="false">
      </vxe-table-column>


      <vxe-table-column
        field="StrategyId"
        sortable
        :title="locale.StrategyId"
      >
      </vxe-table-column>

      <!-- 通道 -->
      <vxe-table-column
        field="channel"
        sortable
        :title="locale.channel"
        :formatter="formatterPositionChannel"
      >
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

import {getPosition, getPositionSelect} from "@/api/position"

import {channelSelectList, directionSelectList, positionChannel, positionDirection} from "@/utils/common";
import DownLoadCsvButton from "@/components/Common/DownLoadCsvButton";
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
      listMap: null,
      timer: 0, //由于记录定时刷新
      //account查询list
      accountlist: [],
      // 分页信息列表
      tablePage: {
        PageNo: 1,
        PageSize: 20,
        TotalCount: 0
      },
      // input搜索条件对象
      searchObj: {
        "AccountId": "",
        "Symbol": "",
        "Direction": null,
      },
      listLoading: true,
      status: false,
      keyword: "",
    };
  },
  created() {
    this.locale = this.$t("position");
    this.common = this.$t("common");
    this.listMap = {};

    this.directionSelectList = directionSelectList;
    this.channelSelectList = channelSelectList;
    this.temp_list = null;

    this.amount = {
      total: 0,
      long: 0,
      short: 0
    }

    //读取数据
    // this.findList()

    this.findAccSymList()
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
        // console.log
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
    accountIdSelectList: function () {
      return this.genSelecOptions("accountId");
    },

    StrategyIdSelectList: function () {
      return this.genSelecOptions("StrategyId");
    }
  },
  methods: {
    filterData() {
      const filterName = this.$utils.toValueString(this.keyword).trim().toLowerCase()
      if (filterName) {
        this.searchflag = true
        const searchProps = ["symbol", "channel"]
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
    startclose() {
      this.status = !this.status
    },
    Query() {
      this.findList()
    },
    downLoadCsvFile() {
      this.$refs.csv.downLoadCsvFile(this.list);
    },

    formatterPositionDirection({cellValue}) {
      return positionDirection[cellValue];
    },

    formatterPositionChannel({cellValue}) {
      return positionChannel[cellValue];
    },

    rowClassName({row, rowIndex}) {
      return "position-" + positionDirection[row.direction];
    },

    updateTicketData(data) {
      let codes = Object.keys(data);

      codes.forEach(ticketItmeCode => {
        this.updateTicketItme(ticketItmeCode, data[ticketItmeCode]);
      });
    },

    updateTicketItme(code, ticketItme) {
      let positionItmes = this.listMap[code];
      if (positionItmes) {
        positionItmes.forEach(itme => {
          itme.price = ticketItme.price;
          itme.amount = ticketItme.price * itme.allQuantity;
        });
      }
    },


    updateListPriceAmount() {
      if (this.temp_list) {
        for (let i = 0, len = this.temp_list.length; i < len; i++) {
          this.list[i].price = this.temp_list[i].price
          this.list[i].amount = this.temp_list[i].amount

        }
      }
    },

    updateAmount() {
      let amount = {
        "total": 0,
        "long": 0,
        "short": 0
      }
      if (this.temp_list) {

        for (let i = 0, len = this.temp_list.length; i < len; i++) {
          let item = this.temp_list[i]
          if (this._.isNumber(item["amount"])) {
            // if( item["amount"]!='--') {

            amount["total"] += item["amount"]
            if (item["direction"] == 1) {
              amount["long"] += item["amount"]
            }
            if (item["direction"] == 2) {
              amount["short"] += item["amount"]
            }
          }
        }
      }
      this.amount = amount
    },

    // 分页查询数据方法
    findList() {
      // 整理发送到后端的参数格式
      var pageOrderPara = {
        "accountId": this.searchObj.AccountId,
        "symbol": this.searchObj.Symbol,
        "Direction": this.searchObj.Direction,
      }

      // setTimeout(() =>, 300)
      getPosition(pageOrderPara).then(result1 => {
        this.list = result1.data.Data
        this.listMap = new Map(this.list.map((order) => [order.originId, order]));
        this.tablePage.TotalCount = this.list.length
        this.filterData()
      }).catch(error => {
      })
    },

    // 页面改变方法
    handlePageChange({currentPage, pageSize}) {
      this.tablePage.PageNo = currentPage
      this.tablePage.PageSize = pageSize
      this.filterData()
    },

    //获取accountlist
    findAccSymList() {
      getPositionSelect().then(result1 => {
        console.log(result1.data);
        this.accountlist = result1.data.accountIds
      })
    }

  },
};
</script>

<style scoped lang="scss">
.footer-box {
  margin-top: 20px;
  display: flex;

  div {
    border: 1px solid black;
    flex: 1;
    display: flex;

    b {
      background: grey;
      color: white;
      width: 50%;
      line-height: 30px;
      height: 30px;
      text-align: center;
    }

    span {
      background: orange;
      color: black;
      width: 50%;
      padding: 5px;
      text-align: center;
    }
  }
}

.search-input {
  width: 200px;
  margin-left: 10px;
}
</style>
