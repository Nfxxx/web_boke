<template>
  <div style="margin-left: 5px;margin-right: 5px;">
    <template>
      <el-row  type="flex" :gutter="10">
        <el-col :span="3">
          <vxe-input v-model="keyword" type="search" placeholder="search"
                     size="100px" @keyup="filterData" style="height: 40px;margin-left: 10px"></vxe-input>
        </el-col>
        <!-- accountId -->
        <el-col  :span="4">
          <el-select v-model="searchObj.Account" clearable placeholder="Select Account" class="search-input" filterable>
            <el-option v-for="num in accountlist" :key="num" :label="num" :value="num"></el-option>
          </el-select>
        </el-col>
        <el-col  :span="2">
          <el-button class="filter-item" type="primary" @click="Query" style="width: 100px">
            查询
          </el-button>
        </el-col>
        <el-col  :span="4">
          <el-button :type="status?'danger':'primary'"
                     @click="startclose" style="width: 100px">
            {{status? '停止刷新':'开启刷新'}}
          </el-button>
        </el-col>
      </el-row>


    </template>
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
      id="position_index"
      :sort-config="sortConfig"
      :custom-config="{storage:true}"

      :data="list2"
      :print-config="{}"
      :keyboard-config="{ isArrow: true }"
      :row-class-name="rowClassName"
    >
      <!-- 渠道 -->
      <vxe-table-column
        field="Channel"
        sortable
        title="Channel"
        :formatter="channelTypeFunc"
      >
      </vxe-table-column>
      <!-- 股票 -->
      <vxe-table-column
        field="Symbol"
        sortable
        title="Symbol"
      >
      </vxe-table-column>

      <!-- 总请求借券数量 -->
      <vxe-table-column
        field="RequestVol"
        sortable
        title="RequestVol"
        :formatter="formatterValue"
      >
      </vxe-table-column>

      <!-- 总手续费 -->
      <vxe-table-column
        field="Fee"
        sortable
        title="Fee"
        :formatter="formatterValue"
      >
      </vxe-table-column>

      <!-- 累计借到券数量-->
      <vxe-table-column
        field="ResponseVol"
        sortable
        title="ResponseVol"
        :formatter="formatterValue"
      >
      </vxe-table-column>

      <!-- 券商 -->
      <vxe-table-column
        field="Broker"
        sortable
        title="Broker"
      >
      </vxe-table-column>

      <!-- 当前总借券数量 -->
      <vxe-table-column field="AllVol" sortable title="AllVol" :formatter="formatterValue">
      </vxe-table-column>

      <!-- 可用借券-->
      <vxe-table-column
        field="AvailableVol"
        sortable
        title="AvailableVol"
        :formatter="formatterValue"
      >
      </vxe-table-column>

      <!--冻结借券数量-->
      <vxe-table-column
        field="FrozenVol"
        sortable
        title="FrozenVol"
        :formatter="formatterValue"
      >
      </vxe-table-column>

      <!-- 账户名称-->
      <vxe-table-column
        field="Account"
        sortable
        title="Account"
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
    import {orderMixin, commonMixin} from "@/mixins";

    import {getBorrow,getBorrowSelect} from "@/api/borrow"

    import {
        positionDirection,
        positionChannel,
        directionSelectList,
        channelSelectList
    } from "@/utils/common";
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
                list2:[],

                listMap: null,
                timer: 0, //由于记录定时刷新
                //symbol查询list
                symbolist: [],
                accountlist: [],
                channelList: [// 空头
                              { label: "CONNECT", value: 1 },
                              // 多头持仓
                              { label: "QFII", value: 2 },
                              { label: "INNER", value: 3 }],
                brokerlist: ["JPM", "BAML", "GS", "CS", "UBS","MS"],
                symbolDisplaylist:[],
                // 分页信息列表
                tablePage: {
                    PageNo: 1,
                    PageSize: 20,
                    TotalCount: 0
                },
                // input搜索条件对象
                searchObj: {
                    "Account": "",
                    "Symbol": "",
                    // "Broker": "",
                    // "Channel": null,
                },
                listLoading: true,
                status: false,

            };
        },
        created() {
            this.common = this.$t("common");
            this.listMap = {};
            this.accountlist = [];
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
                  if (this.status){
                    this.findList()
                  }
                }, 2000)
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
                const searchProps = ["Symbol", "Channel"]
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
            startclose(){
              this.status = !this.status
            },
            Query(){
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


            //重置查询条件
            clearFilter() {
                this.searchObj = {
                    "Account": "",
                    "Symbol": "",
                    // "Broker": null,
                    // "Channel": null,
                }
            },

            // 分页查询数据方法
            findList() {
                // 整理发送到后端的参数格式
                var pageOrderPara = {
                    "Account": this.searchObj.Account ,
                    "Symbol": this.searchObj.Symbol,
                    // // "Symbol": this.searchObj.Symbol,
                    // "Broker": this.searchObj.Broker ? this.searchObj.Broker : [],
                    // "Channel": this.searchObj.Channel ? this.searchObj.Channel : [],
                }
                setTimeout(() => getBorrow(pageOrderPara).then(result1 => {
                    var result = result1.data
                    // console.log(result)
                    this.list = result.Data
                    this.listMap = new Map(this.list.map((order) => [order.originId, order]));
                    this.tablePage.TotalCount=this.list.length
                    this.filterData()
                }), 300)

            },

            // // 页面改变方法
            handlePageChange({currentPage, pageSize}) {
                this.tablePage.PageNo = currentPage
                this.tablePage.PageSize = pageSize
                this.filterData()
            },

            //获取symbolist
            findAccSymList() {
               getBorrowSelect().then(result1 => {
                    // this.symbolist = result.data
                    this.accountlist = result1.data.accountNames
                    console.log(this.accountlist)

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

  .el-row{
    margin-top: 20px;
    margin-bottom: 20px;
    &:last-child{
      margin-bottom:0;
    }
  }

  .el-col{
    border-radius: 4px;
  }
</style>
