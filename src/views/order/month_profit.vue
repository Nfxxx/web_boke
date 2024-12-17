<template>
  <div style="padding: 12px;">
    <article>
      <el-form ref="form" :model="searchObj" label-width="80px" inline>
        <el-form-item label="年份">

          <el-date-picker v-model="searchObj.years" type="year" placeholder="选择年">
          </el-date-picker>

        </el-form-item>
        <el-select  v-model="searchObj.seriesName"  placeholder="基金" multiple filterable style="width: 100%">
          <el-option value="" disabled selected hidden>请选择</el-option>
          <el-option v-for="item in dailyName" :key="item" :value="item">{{ item }}</el-option>
        </el-select>
        <el-form-item label="">
          <el-button class="filter-item" type="primary" @click="findList" size="small">查 询</el-button>
<!--          <el-button class="filter-item"  @click="handleRest" size="small">重 置</el-button>-->
        </el-form-item>
      </el-form>
    </article>
    <article>
      <el-table :data="tableData" style="width: 100%;" :border="true">
        <el-table-column v-for="(item, index) in fundNames" :key="index" :prop="item.prop" :label="item.label"
                         :width="item.width" :minWidth="item.minWidth" :align="item.align" :headerAlign=item.headerAlign>
        </el-table-column>
      </el-table>
    </article>
  </div>
</template>

<script>
import {commonMixin, orderMixin} from "@/mixins";
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
      list:[],
      dailyName:[],
      // input搜索条件对象
      searchObj: {
        dailyName: [],
        years:[],
      },
      tableData: [],
      fundNames: [],
      tableDeflutTable:[],
    };
  },

  computed: {
    // 筛选 用户id
    orderAccountIdSelectList: function () {
      return this.genSubOrderSelecOptions("account");
    },
  },
  mounted() {
    this.fundName(); // 在组件挂载后获取数据
    // this.initTableColumn(this.list)
  },
  methods: {
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
      axios.post('http://172.18.103.142:5555/table/MonthIncome', this.searchObj, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.list=JSON.parse(response.data.data);
        this.initTableColumn(this.list);
      })
          .catch(error => {
            console.error(error);
          });
    },
    initTableColumn(data) {
      // 提取所有基金的名称
      let fundNames = Object.keys(data[Object.keys(data)[0]]);

      // 构造每个基金对应的行数据
      const tableData = fundNames.map(fundName => {
        const rowData = { fundName }; // 使用基金名称作为第一列的数据
        Object.entries(data).forEach(([timestamp, fundsData]) => {
          // 忽略非时间戳的key（比如"全年超额"）
          const date = isNaN(Number(timestamp)) ? timestamp : this.handleFormatDate(new Date(Number(timestamp)), 'yyyy-MM-dd');
          rowData[date] = fundsData[fundName] !== undefined ? fundsData[fundName].toFixed(10) : '-';
        });
        return rowData;
      });

      // 构造列信息，包括新的第一列
      let columns = [{ prop: 'fundName', label: '基金名称', minWidth: 260, }].concat(
        Object.keys(data).filter(timestamp => !isNaN(timestamp)).map(timestamp => {
          const date = isNaN(Number(timestamp)) ? timestamp : this.handleFormatDate(new Date(Number(timestamp)), 'yyyy-MM-dd');
          return { prop: date, label: date, minWidth: 130,headerAlign:'center',align:'right' };
        })
      );

      // 处理“全年超额”数据
      columns.push({ prop: '全年超额', label: '全年超额', minWidth: 130, fixed: 'right',headerAlign:'center',align:'right' });
      tableData.forEach(row => {
        row['全年超额'] = data['全年超额'][row.fundName].toFixed(10);
      });
      this.fundNames = columns;
      this.tableData = tableData;
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
</style>

