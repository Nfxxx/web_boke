<template>

  <div>

    <el-select v-model="searchObj.year" @change="updateChart" placeholder="年份" style="width: 180px ; padding: 0 6px">
      <el-option value="" disabled selected hidden>请选择</el-option>
      <el-option v-for="item in years" :key="item" :value="item">{{ item }}</el-option>
    </el-select>

    <el-select v-model="searchObj.wei" @change="updateChart" placeholder="维度"  style="width: 180px ; padding: 0 6px">
      <el-option value="" disabled selected hidden>请选择</el-option>
      <el-option v-for="num in 2" :label="num-1|YeijiWeiDu" :key="wei" :value="num-1"></el-option>
    </el-select>
    <el-select v-model="searchObj.index" class="-input" placeholder="指数基准" filterable style="width: 180px ; padding: 0 6px">
      <el-option v-for="num in 12" :label="num-1|YejiJizhunStatus" :key="index" :value="num-1"></el-option>
    </el-select>
    <el-select  v-model="searchObj.valueName"  placeholder="基金基准" filterable style="width: 180px ; padding: 0 6px">
      <el-option value="" disabled selected hidden>请选择</el-option>
      <el-option v-for="num in 2" :label="num-1|ValueName" :key="wei" :value="num-1"></el-option>
    </el-select >
    <el-select  v-model="searchObj.series2Data"  placeholder="基金" multiple filterable style="width: 100%">
      <el-option value="" disabled selected hidden>请选择</el-option>
      <el-option v-for="item in dailyName" :key="item" :value="item">{{ item }}</el-option>
    </el-select >
    <br>
    <br>
    <button @click="fetchDataAndDrawChart">更新图表</button>
    <div ref="chart" style="width: 1000px;height:700px;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import echarts from 'echarts';
import {TimeStatus, YeijiWeiDu, YejiJizhunStatus} from "@/filters/OrderFilter";

export default {
  data() {
    return {
      transformedSeries:null,
      dataName:[],
      TsJson:[],
      chartInstance: null,
      categories:[],
      dailyName:[],
      series2Data: 'data2',
      fundyear:null,
      option:null,
      searchObj: {
        year:[],
        series2Data:[],
        wei:[],
        index:[],
        valueName:[]

      },
      // series3Data: 'data3',
      data1: [], // 假设这是从某个API或其他来源获取的数据
      data2: [],
      chart:null,
      years:['2020','2021','2022','2023','2024']
    };
  },
  computed: {
    YejiJizhunStatus() {
      return YejiJizhunStatus
    },
    YeijiWeiDu() {
      return YeijiWeiDu
    },

  },
  mounted() {
    this.fetchDataAndDrawChart();
    this.fundName();

  },
  created() {
    this.transformSeries(series);
    this.dateName(series);
    this.toJson(series);
  },
  methods: {
    async fetchDataAndDrawChart() {
      try {
        // 发送 POST 请求获取数据
        const response = await axios.post('http://172.18.103.142:5555/line/Demo', this.searchObj,);
        const {categories, series} = response.data;

        // 初始化图表
        this.chart = echarts.init(this.$refs.chart);
        TS:this.transformSeries(series);
        js:this.toJson()
        De:this.dateName(series)
        // 配置图表选项
        const option = {
          title: {
            text: '对比图片',
            left: 'center', // 水平居中
            verticalAlign: 'middle', // 文本垂直居中
            top: '10%', // 距离容器顶部 10% 的位置
          },
          legend: {
            // data: [series[0].name, series[1].name]
            // data: this.categories
            data:this.dataName,
          },
          tooltip: {},
          xAxis: {
            data: categories,
          },
          yAxis: {},
          series:series.map(series => ({
            name: series.name,
            type: 'line',
            data: series.data,
          })),

          // series:this.TsJson,

          dataZoom: [
            {
              realtime: true, //拖动滚动条时是否动态的更新图表数据
              height: 70, //滚动条高度
              start: 0, //滚动条开始位置（共6等份）
              end: this.endValue,//滚动条结束位置
              top: '92%',
              bottom: '4%',
              zoomLock: false, //控制面板是否进行缩放
              startValue: categories[0], // 从头开始。
              endValue: categories[-1],// 一次性展示6个
              // showDetail: false, // 关闭滚动条提示
              fillerColor: 'rgba(255, 255, 255,0.5)',
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(option);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
    transformSeries(series) {
      this.transformedSeries = series.map(series => ({
        name: series.name,
        type: 'line',
        data: series.data,
      }));
    },
    dateName(series){
      this.dataName = series.map(series => series.name)
    },
    toJson(){
      // 将 transformedSeries 数组转换为 JSON 字符串
      const jsonString = JSON.stringify(this.transformedSeries);
      // 现在你可以使用 jsonString，比如打印到控制台或发送到服务器
      console.log(jsonString);
      // 如果需要，你也可以将其赋值给 data 中的一个属性来在模板中使用
      this.TsJson = jsonString;
    }
  }
};
</script>

