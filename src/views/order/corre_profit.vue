<template>
  <div style="margin-left: 5px;margin-bottom: 5px;margin-top: 10px;margin-right: 5px;">
    <template>
      <el-select v-model="searchObj.year" class="-input" placeholder="年份" filterable style="width: 180px">
        <el-option v-for="num in 6" :label="num-1|TimeStatus" :key="year" :value="num-1"></el-option>
      </el-select>
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
      </el-select >
      <el-button class="filter-item" type="primary" @click="findList" style="width: 100px;margin-left: 10px">
        查询
      </el-button>
      <el-button class="filter-item"  @click="handleRest" size="small">重 置</el-button>
    </template>

    <br>
    <br>
    <br>
    <article>
      <el-table :data="tableData" style="width: 100%;" :border="true">
        <el-table-column
          v-for="(item,index) in fundNames"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align">
        </el-table-column>
      </el-table>
    </article>
  </div>
</template>

<script>
import {commonMixin, orderMixin} from "@/mixins";
import 'vxe-table/lib/style.css';
import DownLoadCsvButton from '@/components/Common/DownLoadCsvButton'
import footerCountInfo from "@/components/Common/footerCountInfo";
import axios from "axios";
import {TimeStatus, YejiJizhunStatus} from "@/filters/OrderFilter";
const instance = axios.create({
  timeout: 5000 // 设置超时时间为5秒钟
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
      msg:null,
      // input搜索条件对象
      searchObj: {
        year:[],
        wei:[],
        index:[],
        seriesName:[],
        valueName:[]
      },
      tableDatas:[],
      // JSON 数据转变后的表格数据
      tableData: [],
      // 从数据提取的基金名称列表
      fundNames: [],
    };
  },

  computed: {
    YejiJizhunStatus() {
      return YejiJizhunStatus
    },
    TimeStatus() {
      return TimeStatus
    },

    // 筛选 用户id
    orderAccountIdSelectList: function () {
      return this.genSubOrderSelecOptions("account");
    },
  },
  mounted() {
    // this.fetchData(); // 在组件挂载后获取数据
    // this.initTableColumn(this.tableDatas);
    this.fundName();
  },
  methods: {
    //
    //
    async findList() {
        axios.post('http://172.18.103.142:5555/table/PostRevenueList',this.searchObj, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          // this.tableDatas = JSON.parse(response.data.data)
            this.initTableColumn(JSON.parse(response.data.data));
          })
          .catch(error => {
          console.error(error);
        });
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

    initTableColumn(data) {
      let columns = Object.keys(data);

      columns.forEach(item=>{
        let obj = {
          label: item,
          prop:item,
          minWidth:210,
        };
        this.fundNames.push(obj);

        this.tableData.push({...this.handleparesData(data[item]),index:item});

      })
      this.fundNames.unshift({label:'index',prop:'index',minWidth:230,align:'center'})
    },
    handleparesData(data){
      console.log(data)
      if(!data || Object.keys(data).length <=0) return ({});
      let listKey = Object.keys(data);

      let obj = {};
      listKey.forEach(k=> {
        obj[k] = data[k]

      })
      return obj
    },
    /* 重置 */
    handleRest(){
      this.searchObj = {};
    }
  },
  created(){
    console.log(Object.keys(this.tableData))
  }
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

