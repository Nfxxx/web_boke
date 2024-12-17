<template>
  <div style="margin-left: 5px;margin-bottom: 5px;margin-top: 10px;margin-right: 5px;">
    <article>
      <el-form ref="form" :model="searchObj" label-width="80px" inline>
        <el-select v-model="searchObj.fundclass" class="search-input" placeholder="策略类型1"  filterable style="width: 180px">
          <el-option value="" disabled selected hidden>请选择</el-option>
          <el-option v-for="item in fundclass" :key="item" :value="item">{{ item }}</el-option>
        </el-select>
        <el-select v-model="searchObj.fundclass2" class="search-input" placeholder="策略类型2"  filterable style="width: 180px">
          <el-option value="" disabled selected hidden>请选择</el-option>
          <el-option v-for="item in fundclass2" :key="item" :value="item">{{ item }}</el-option>
        </el-select>
        <el-select v-model="searchObj.wei" class="-input" placeholder="维度" filterable style="width: 180px">
          <el-option v-for="num in 2" :label="num-1|YeijiWeiDu" :key="wei" :value="num-1"></el-option>
        </el-select>
        <el-select v-model="searchObj.index" class="-input" placeholder="指数基准" filterable style="width: 180px">
          <el-option v-for="num in 13" :label="num-1|YejiJizhunStatus" :key="index" :value="num-1"></el-option>
        </el-select>
        <el-select v-model="searchObj.zhuangtai" class="-input" placeholder="投资状态" filterable style="width: 180px">
          <el-option v-for="num in 3" :label="num-1|TouziStatus" :key="index" :value="num-1"></el-option>
        </el-select>
        <el-select  v-model="searchObj.valueName"  placeholder="基金基准" filterable style="width: 180px ; padding: 0 6px">
          <el-option value="" disabled selected hidden>请选择</el-option>
          <el-option v-for="num in 2" :label="num-1|ValueName" :key="wei" :value="num-1"></el-option>
        </el-select >
        <el-form-item label="">
          <el-button class="filter-item" type="primary" @click="findList" size="small">查 询</el-button>
          <el-button class="filter-item"  @click="handleRest" size="small">重 置</el-button>
        </el-form-item>
      </el-form>
    </article>
    <br>
    <br>
    <h3>更新日期到：{{lastDate}}</h3>
    <article>
      <el-table :data="tableData" style="width: 100%" :border="true">
        <el-table-column prop="基金名称" label="基金名称" minWidth="230"></el-table-column>
        <el-table-column prop="策略类型1" label="策略类型1" width="180"></el-table-column>
        <el-table-column prop="策略类型2" label="策略类型2" width="180"> </el-table-column>
        <el-table-column prop="近一周收益" label="近一周收益" :formatter="formatPercentage"  sortable></el-table-column>
        <el-table-column prop="近一个月收益" label="近一个月收益" :formatter="formatPercentage"sortable> </el-table-column>
        <el-table-column prop="最大回撤" label="超额最大回撤" :formatter="formatPercentage" sortable> </el-table-column>
<!--        <el-table-column prop="最新回撤" label="最新回撤" :formatter="formatPercentage"  sortable> </el-table-column>-->
        <el-table-column prop="最新回撤" label="最新回撤"  sortable>
          <template v-slot="scope">
            <span :class="getColorClass(scope.row.最新回撤)">
                {{ getformatPercentage(scope.row.最新回撤) }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </article>
  </div>
</template>

<script>
import {commonMixin, orderMixin} from "@/mixins";
import DownLoadCsvButton from '@/components/Common/DownLoadCsvButton'
import footerCountInfo from "@/components/Common/footerCountInfo";
import {YeijiWeiDu,YejiJizhunStatus,TouziStatus} from "@/filters/OrderFilter";
import axios from "axios";

export default {
  mixins: [orderMixin, commonMixin],
  components: {
    DownLoadCsvButton,
    footerCountInfo
  },


  data() {
    return {
      lastDate:[],
      tableDataString:[],
      tableData:[],
      // input搜索条件对象
      searchObj: {
        fundclass: [],
        fundclass2: [],
        index: [],
        wei:[],
        zhuangtai:[],
        valueName:[]
      }
    };
  },

  computed: {
    YejiJizhunStatus() {
      return YejiJizhunStatus
    },
    YeijiWeiDu(){
      return YeijiWeiDu
    },

  },
  mounted() {
    this.fundName();
    this.fundDaily()
  },
  methods: {
    formatPercentage(row, column, cellValue) {
      // 将小数转换为百分比，并保留两位小数
      const percentage = (cellValue * 100).toFixed(2);
      return `${percentage}%`;
    },
    getColorClass(cellValue) {
      const percentage = (cellValue * 100).toFixed(2);
      if(this.searchObj["fundclass2"]=='锐进') {
        if (percentage < -15) return 'low';
      }
      if(this.searchObj["fundclass2"]=='稳健') {
        if (percentage < -3) return 'low';
      }
      if(this.searchObj["fundclass2"]=='平衡') {
        if (percentage < -6) return 'low';
      }
    },
    getformatPercentage(cellValue) {
      // 将小数转换为百分比，并保留两位小数
      const percentage = (cellValue * 100).toFixed(2);
      return `${percentage}%`;
    },
  async fundName() {
      try {

        const response = await axios.get('http://172.18.103.142:5555/list/fundclass');
        console.log(this.response)
        this.fundclass = response.data.fundclass; // 假设服务器返回的数据在 response.data 中
        this.fundclass2 = response.data.fundclass2;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fundDaily() {
      try {

        const response = await axios.get('http://172.18.103.142:5555/list/lastDate');
        console.log(this.response)
        this.lastDate=response.data.lastDate;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    //
    async findList() {
      axios.post('http://172.18.103.142:5555/table/indexList',this.searchObj, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.tableDataString = JSON.parse(response.data.data)
        this.tableData = this.handleParseTableData(JSON.parse(response.data.data));
        // this.initTableColumn(JSON.parse(response.data.data));
      })
          .catch(error => {
            console.error(error);
          });
    },

    handleParseTableData(data){
      if(!data || Object.keys(data).length <=0) return
      const processedData = Object.keys(data["基金名称"]).map(index => {
        const obj = {};
        Object.keys(data).forEach(key => {

          obj[key] = data[key][index];
        });
        return obj;
      });
      return processedData
    },
    /* 重置 */
    handleRest(){
      this.searchObj = {};
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
    }


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

.parent-order-box {
  margin: 0 20px;

  .parent-order-box-row {
    height: 3em;
    display: flex;
  }

  .parent-order-box-title {
    display: inline-block;
    text-align: center;
    width: 30%;
    border: 1px solid rgb(193, 193, 204);
    height: 100%;
    line-height: 2.6;
    font-size: 14px;

    background: darkgray;
    color: dimgray;

  }

  .parent-order-box-content {
    border: 1px solid rgb(193, 193, 204);
    // border-left: 0;

    height: 100%;
    line-height: 2.6;
    font-size: 14px;
    display: inline-block;
    width: 70%;
    text-align: center;

    background: cornsilk;
  }
}
.low {
  /* 其他样式如 color: transparent; 以显示渐变背景 */
  background: #78d278;
}
.medium {
  background: white;
}
.high {
  background: #da9393;

}
.search-input {
  width: 130px;
  margin-left: 10px;
}
</style>

