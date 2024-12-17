<template>
  <div style="margin-left: 5px;margin-bottom: 5px;margin-top: 10px;margin-right: 5px;">
    <article>
      <el-form ref="form" :model="searchObj" label-width="80px" inline>
        <el-select v-model="searchObj.findname" class="search-input" placeholder="产品"  filterable style="width: 180px">
          <el-option value="" disabled selected hidden>请选择</el-option>
          <el-option v-for="item in fundclass" :key="item" :value="item">{{ item }}</el-option>
        </el-select>
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
        <el-table-column prop="公司" label="公司" minWidth="200"></el-table-column>
        <el-table-column
            sortable
            width="200"
            field="公司规模"
            prop="公司规模"
            label="公司规模"
            :filters="scaleOptions" :filter-method="filterMethod"
          >

        </el-table-column>
        <el-table-column prop="金额市值" label="金额市值" width="200"></el-table-column>
        <el-table-column prop="占比" label="占比" :formatter="formatPercentage"  sortable></el-table-column>
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
        findname: [],
      },
      fundclass:['锐进','平衡','稳健','汇总'],
      filters: {
        公司规模: '', // 初始值为空字符串或默认选中的值
      },
      scaleOptions: [ // 公司规模选项列表
        { value: '5亿以下', text: '5亿以下' },
        { value: '5-100亿', text: '5-100亿' },
        { value: '100亿', text: '100亿' },
      ],
    };
  },

  computed: {
    YejiJizhunStatus() {
      return YejiJizhunStatus
    },
    YeijiWeiDu(){
      return YeijiWeiDu
    },
    BrokersSelectList() {
      return this.genSelecOptions("broker_id")
    },
  },
  mounted() {
    this.fundDaily()
  },
  methods: {
    filterMethod(value, row) {
      return row.公司规模 === value;
    },

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
      axios.post('http://172.18.103.142:5555/table/TI_Control',this.searchObj, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.tableDataString = JSON.parse(response.data.data)
        this.tableData = this.handleParseTableData(JSON.parse(response.data.data));

      })
          .catch(error => {
            console.error(error);
          });
    },

    handleParseTableData(data){
      if(!data || Object.keys(data).length <=0) return
      const processedData = Object.keys(data["公司"]).map(index => {
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

