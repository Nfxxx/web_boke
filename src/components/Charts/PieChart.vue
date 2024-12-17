<template>

  <div>
    <div ref="main" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
//import resize from './mixins/resize'

export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    echartData:{
      type: Array,
      default: ()=> [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  },
  data() {
    return {
      chart: null,
      data:[...this.echartData]
    }
  },
  mounted() {
    this.initChart(this.data);
    console.log(this.echartData,"009987")
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  methods: {
    initChart(data) {
      // 基于准备好的 dom，初始化 echarts 实例
      var chartDom = this.$refs.main;
      var myChart = echarts.init(chartDom, 'dark');
      var option = {
        // 将你的 option 配置项放这里
        title: {
          title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
          },
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart.on('click', (params) => {
        // 事件回调函数
        this.handleChartClick(params);
      });
    },
    handleChartClick(params) {
      // 这里处理点击事件
      this.$emit('handleEmitParams',params)
    }
  },
  watch:{
    echartData:{
      handler(val){
        this.data = [...val];
        this.initChart(this.data);
      },
      deep:true
    }
  }
}
</script>
