<template>
  <div
      style="padding: 12px;">
    <article>
      <el-form ref="form" :model="searchObj" label-width="80px" inline>
        <el-form-item label="年份">
          <el-select v-model="searchObj.year" class="-input" placeholder="年份" filterable size="small">
            <el-option v-for="num in 6" :label="num - 1 | TimeStatus" :key="num" :value="num - 1"></el-option>
          </el-select>
        </el-form-item>
        <el-select v-model="searchObj.wei" class="-input" placeholder="维度" filterable style="width: 180px">
          <el-option v-for="num in 2" :label="num-1|YeijiWeiDu" :key="wei" :value="num-1"></el-option>
        </el-select>
        <el-select v-model="searchObj.index" class="-input" placeholder="指数基准" filterable style="width: 180px">
          <el-option v-for="num in 13" :label="num-1|YejiJizhunStatus" :key="index" :value="num-1"></el-option>
        </el-select>
        <el-select  v-model="searchObj.valueName"  placeholder="基金基准" filterable style="width: 180px ; padding: 0 6px">
          <el-option value="" disabled selected hidden>请选择</el-option>
          <el-option v-for="num in 2" :label="num-1|ValueName" :key="wei" :value="num-1"></el-option>
        </el-select >
        <el-select  v-model="searchObj.seriesName"  placeholder="基金" multiple filterable style="width: 100%">
          <el-option value="" disabled selected hidden>请选择</el-option>
          <el-option v-for="item in dailyName" :key="item" :value="item">{{ item }}</el-option>
        </el-select>
        <el-form-item label="">
          <el-button class="filter-item" type="primary" @click="findList" size="small">查 询</el-button>
          <el-button class="filter-item"  @click="handleRest" size="small">重 置</el-button>
        </el-form-item>
      </el-form>
    </article>
    <article>
      <el-table :data="tableData" style="width: 100%" :border="true">
        <el-table-column prop="基金名称" label="基金名称" minWidth="230">
        </el-table-column>
        <el-table-column prop="收益率" label="收益率" width="180" :formatter="formatPercentage" sortable>
          <template v-slot="scope">
            <span :class="getColorClass(scope.row.收益率)">
                {{ getformatPercentage(scope.row.收益率) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="卡玛比率" label="卡玛比率" :formatter="formatPercentage" width="180" sortable>
        </el-table-column>
        <el-table-column prop="年化波动率" label="年化波动率" :formatter="formatPercentage" sortable> </el-table-column>
        <el-table-column prop="最新回撤" label="最新回撤" :formatter="formatPercentage" sortable>
          <template v-slot="scope">
            <span :class="getColorClass(scope.row.最新回撤)">
                {{ getformatPercentage(scope.row.最新回撤) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="夏普比率" label="夏普比率" :formatter="formatPercentage" sortable> </el-table-column>
        <el-table-column prop="计算起始时间" label="计算起始时间" sortable> </el-table-column>
      </el-table>
    </article>
  </div>
</template>
<script>
import {commonMixin, orderMixin} from "@/mixins";

import $ from 'jquery';
import {getProduct} from "@/api/Product"
import DownLoadCsvButton from '@/components/Common/DownLoadCsvButton'
import footerCountInfo from "@/components/Common/footerCountInfo";
import axios from "axios";
const instance = axios.create({
  timeout: 5000 ,// 设置超时时间为5秒钟
  changeOrigin: true
});
export default {
  mixins: [orderMixin, commonMixin],
  components: {
    DownLoadCsvButton,
    footerCountInfo
  },


  data() {
    return {
      dailyName:[],
      list: [],
      searchObj: {
        year:[],
        wei:[],
        index:[],
        seriesName:[],
        valueName:[]
      },
      tableDataString:[],
      tableData:[],
    };
  },
  mounted() {
    this.fundName();
  },

  methods: {
    formatPercentage(row, column, cellValue) {
      // 将小数转换为百分比，并保留两位小数
      const percentage = (cellValue * 100).toFixed(2);
      return `${percentage}%`;
    },

    getformatPercentage(cellValue) {
      // 将小数转换为百分比，并保留两位小数
      const percentage = (cellValue * 100).toFixed(2);
      return `${percentage}%`;
    },
    getColorClass(cellValue) {
      const percentage = (cellValue * 100).toFixed(2);
      if (percentage < 0) return 'low';
      if (percentage > 0) return 'high';
      return 'medium';
    },
    async fundName() {
      try {

        const response = await axios.get('http://172.18.103.142:5555/list/fundname');
        console.log(this.response)
        this.dailyName = response.data.name; // 假设服务器返回的数据在 response.data 中
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async findList() {
      axios.post('http://172.18.103.142:5555/table/PostNetValue', this.searchObj, {
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
    /* 处理表格数据 */
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

.search-input {
  width: 130px;
  margin-left: 10px;
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

</style>

