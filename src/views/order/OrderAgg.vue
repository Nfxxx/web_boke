<template>
  <div style="margin-left: 5px; margin-right: 5px; margin-top: 15px">
    <el-select
        v-model="filterCondition.TimeDurationId"
        clearable
        multiple
        filterable
        placeholder="时间"
        class="search-input"
        style="width: 180px"
        collapse-tags
    >
      <el-option
          v-for="num in 6"
          :label="(num - 1) | TimeStatus"
          :key="num"
          :value="num - 1"
      ></el-option>
    </el-select>
    <el-select
        v-model="filterCondition.Strategy"
        clearable
        multiple
        filterable
        placeholder="策略"
        class="search-input"
        @change="findSelect"
        @remove-tag="removeTag('strategy')"
        style="width: 220px"
        collapse-tag
    >
      <el-option
          label="selectAll"
          value="selectAll"
          style="font-weight: bold"
          @click.native="selectAll('strategy')"
      >Select All Or Not</el-option
      >
      <el-option
          v-for="(item, index) in inputObj.Strategy"
          :key="index"
          :label="item"
          :value="item"
      ></el-option>
    </el-select>
    <el-select
        v-model="filterCondition.Investor"
        clearable
        multiple
        filterable
        placeholder="投资人"
        class="search-input"
        @change="findSelect"
        @remove-tag="removeTag('algo')"
        style="width: 220px"
        collapse-tags
    >
      <el-option
          label="selectAll"
          value="selectAll"
          style="font-weight: bold"
          @click.native="selectAll('algo')"
      >Select All Or Not</el-option
      >
      <el-option
          v-for="(item, index) in inputObj.Algo"
          :key="index"
          :label="item"
          :value="item"
      ></el-option>
    </el-select>

    <el-button
        class="filter-item"
        type="primary"
        @click="Query"
        style="width: 100px; margin-left: 10px"
    >
      查询
    </el-button>
    <br />
    <br />
    <el-row :gutter="10" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">本月收益</div>
            <div class="card-money-text">-5263万</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">本季度收益</div>
            <div class="card-money-text">-5263万</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">本年收益</div>
            <div class="card-money-text">4.335亿</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">总收益</div>
            <div class="card-money-text">8.986亿</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <article>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-card
              shadow="never"
              header="投资分布"
              :body-style="{ padding: 0 }"
          >
            <div>
              <pie-chart
                  width="100%"
                  height="350px"
                  :echart-data="echartData"
                  @handleEmitParams="handleEmitParams"
              />
            </div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="never" header="投资分布" :body-style="{ padding: 0,overflow:'auto'}">
            <article>
              <el-table ref="tableRight" :data="tableData" style="width: 100%;height:calc(100vh - 480px);overflow:auto">
                <el-table-column v-for="(item, index) in fundNames" :key="index" :prop="item.prop" :label="item.label"
                                 :width="item.width" :type="item.type" :minWidth="item.minWidth" :align="item.align" :headerAlign=item.headerAlign :showOverflowTooltip="item.showOverflowTooltip">
                </el-table-column>
              </el-table>
            </article>

          </el-card>
        </el-col>
      </el-row>
    </article>
  </div>
</template>

<script>
import DownLoadCsvButton from "@/components/Common/DownLoadCsvButton";
import footerCountInfoNew from "@/components/Common/footerCountInfo_new";
import PieChart from "@/components/Charts/PieChart";
import { commonMixin } from "@/mixins";
import axios from "axios";
const instance = axios.create({
  timeout: 5000 // 设置超时时间为5秒钟
});

export default {
  mixins: [commonMixin],

  components: {
    DownLoadCsvButton,
    footerCountInfoNew,
    PieChart,
  },
  created() {
    this.locale = this.$t("aggregation");
    this.common = this.$t("common");
    this.findSelect();
  },

  data() {
    return {
      list: [],
      tableData:[],
      showFooter: true,
      listLoading: false,
      timer: null,
      filterCondition: {
        Key: "",
        Strategy: [],
        Investor: [],
        TimeDurationId: [],
      },
      echartData:[],
      crileData: [],

      fundNames:[],

      inputObj: {
        Strategy: [],
        Algo: [],
        Portfolio: [],
        Broker: [],
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
      totalData:[],

    };
  },
  mounted() {
    this.findSelect()
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {

    async findSelect() {
      try {
        const response = await axios.get('http://172.18.103.142:5555/chart/getPineLine');
        console.log(this.response)
        // this.tableDatas = JSON.parse(response.data.data); // 假设服务器返回的数据在 response.data 中
        this.crileData=JSON.parse(response.data);
        this.handleCrileData(this.crileData);
        this.initTableColumn(this.crileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    /* 饼图数据整理传入 */
    handleCrileData(source){
      const uniqueClasses = Array.from(new Set(Object.values(source.fundclass)));
      const summary = uniqueClasses.map(uniqueClass => {
        let total = 0;
        for (let key in source.fundclass) {
          if (source.fundclass[key] === uniqueClass) {
            total += source.Amount[key];
          }
        }
        return { name: uniqueClass, value: total };
      });
      this.echartData = summary;
    },
    /* 列 */
    initTableColumn(data) {
      let fundNames = Object.keys(data[Object.keys(data)[0]]);
      const tableData = fundNames.map(fundName => {
        const rowData = { fundName }; // 使用基金名称作为第一列的数据
        Object.entries(data).forEach(([timestamp, fundsData],index) => {
          const date = timestamp;
          if(date ==='Application_date' && (fundsData[fundName]??'')!==''){
            rowData[date] =this.handleFormatDate(new Date(Number(fundsData[fundName])), 'yyyy-MM-dd');
          }else {
            rowData[date] = fundsData[fundName] !== undefined ? fundsData[fundName]: '-';
          }
        });
        return rowData;
      });
      let columns = Object.keys(data).filter(timestamp => timestamp).map(timestamp => {
        const date = isNaN(Number(timestamp)) ? timestamp : this.handleFormatDate(new Date(Number(timestamp)), 'yyyy-MM-dd HH:mm:ss');
        return {
          prop: date,
          label: date,
          minWidth: 155,
          headerAlign:'center',
          align:'center',
          showOverflowTooltip:true,

        };
      });
      columns.unshift({type:'index',label:'序号',width:55,align:'center'})
      this.fundNames = columns;
      this.totalData = tableData;
      this.tableData = this.totalData;

      this.$refs.tableRight.doLayout()
    },
    handleFormatDate(date, format) {
      const map = {
        'MM': date.getMonth() + 1, // 月份是从0开始的
        'dd': date.getDate(), // 日
        'yyyy': date.getFullYear(), // 年
        'HH': date.getHours(), // 时
        'mm': date.getMinutes(), // 分
        'ss': date.getSeconds() // 秒
      };

      for (let key in map) {
        // 用0补齐
        const value = map[key] < 10 ? '0' + map[key] : '' + map[key];
        // 替换格式字符串中对应的符号
        format = format.replace(key, value);
      }

      return format;
    },
    /* 点击返回数据 */
    handleEmitParams(val) {

      this.tableData = this.totalData.filter(k=> k.fundclass === val.name)
    },

  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },

};
</script>

<style scoped lang="scss">
.mytable-footer >>> .col-weight {
  background: grey;
  color: white;
}
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
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

.card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-money {
        background: #f4516c;
      }
    }

    .icon-money {
      color: #f4516c;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-money-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 1);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
