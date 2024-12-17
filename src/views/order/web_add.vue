<template>

  <div>
    <input type="text" v-model="searchObj.web" placeholder="请输入网址" style="width: 270px;height:50px;">
    <br>
    <br>
    <h3><button @click="fetchDataAndDrawChart">发送</button></h3>
    <h3><button @click="handleRest">重 置</button></h3>
    <h3>更新：{{post_data}}</h3>
  </div>

</template>

<script>
import axios from 'axios';
import echarts from 'echarts';
import {TimeStatus, YeijiWeiDu, YejiJizhunStatus} from "@/filters/OrderFilter";

export default {
  data() {
    return {
      searchObj: {
        web:[]
      },
      post_data:[],
    };
  },
  methods: {
    async fetchDataAndDrawChart() {
      try {
        // 发送 POST 请求获取数据
        const response = await axios.post('http://172.18.103.142:5555/web_add', this.searchObj);
        this.post_data = response.data.log;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    handleRest(){
      this.searchObj = {};
    },
  }
};
</script>

