<template>
  <div>
    <h2 class="page-title">Short Monitor</h2>
    <template>
      <!--      <span class="search-input" style="font-weight: 800">搜索</span>-->
      <label class="label-css">交易状态</label>
      <el-select v-model="trade" class="search-input" placeholder="Select TradeStatus">
        <el-option v-for="obj in Boolist" :key="obj.value" :value="obj.value" :label="obj.name"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" @click="UpdateTrade">
        确定
      </el-button>
      <label class="label-css">运行状态</label>
      <el-select v-model="running" class="search-input" placeholder="Select RunningStatus">
        <el-option v-for="obj in Boolist" :key="obj.value" :value="obj.value" :label="obj.name"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" @click="UpdateRunning">
        确定
      </el-button>
      <br>
      <label class="label-css">时间点ID</label>
      <el-select v-model="timeduration" class="search-input" placeholder="Select TimeDurationId">
        <el-option v-for="obj in shortObjList" :key="obj.time_duration_id" :value="obj.time_duration_id"
                   :label="obj.time_duration_id"></el-option>
      </el-select>
      <label class="label-css">是否重写</label>
      <el-select v-model="over_write" class="search-input" placeholder="Select OverWrite">
        <el-option v-for="obj in BoolList" :key="obj" :value="obj" :label="obj"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" @click="UpdateTimeduration">
        确定
      </el-button>
    </template>
    <template>
      <el-form ref="dataForm" class="demo-form-inline" :inline="true" :model="temp" label-position="left"
               label-width="100px"
               style="width: 80%; margin-left:50px; margin-top: 20px">
        <el-row>
          <el-form-item label="时间" prop="time">
            <el-input v-model="temp.time"/>
          </el-form-item>
          <el-form-item label="运行状态" prop="running" class="short-monitor-form">
            <el-input v-model="temp.running"/>
          </el-form-item>
          <el-form-item label="时间点" prop="time_duration_id" class="short-monitor-form" style="width: 30%">
            <el-input v-model="temp.time_duration_id"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="交易状态" prop="trading" >
            <el-input v-model="temp.trading"/>
          </el-form-item>
          <el-form-item label="目标空头" prop="target_open" class="short-monitor-form" >
            <el-input v-model="temp.target_open"/>
          </el-form-item>
          <el-form-item label="在途多头" prop="out_close" class="short-monitor-form">
            <el-input v-model="temp.out_close"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="已借数量" prop="available_value">
            <el-input v-model="temp.available_value"/>
          </el-form-item>
          <el-form-item label="在途空头" prop="out_open" class="short-monitor-form">
            <el-input v-model="temp.out_open"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="目标空头1" prop="min_open_available" class="redItem" >
            <el-input v-model="temp.min_open_available"/>
          </el-form-item>
          <el-form-item label="目标多头" prop="target_close" class="short-monitor-form redItem" style="width: 55%">
            <el-input v-model="temp.target_close"/>
          </el-form-item>
          <el-form-item label="成交空头" prop="finish_open" class="redItem">
            <el-input v-model="temp.finish_open"/>
          </el-form-item>
          <el-form-item label="成交多头" prop="finish_close" class="short-monitor-form redItem" >
            <el-input v-model="temp.finish_close"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="空头减多头" prop="finish_open-close">
            <el-input v-model="temp.finish_open_close"/>
          </el-form-item>
        </el-row>
        <h3>Broker Info</h3>
        <el-table :data="temp.broker_info" border fit highlight-current-row style="width: 100%">
          <el-table-column prop="name" label="BrokerName"/>
          <el-table-column prop="open" label="所有空头" :formatter="FormatterValue"/>
          <el-table-column prop="close" label="所有多头" :formatter="FormatterValue"/>
          <el-table-column prop="open-close" label="空头减多头" :formatter="FormatterValue"/>
        </el-table>
      </el-form>
    </template>
    <!--    </el-dialog>-->

  </div>
</template>

<script>
import {orderMixin, commonMixin} from "@/mixins"
import {
  getShortInfoV2,
  getShortingStrategyConfig,
  UpdateShortRunningV2,
  UpdateShortTradeV2,
  UpdateShortTimedurationV2
} from "@/api/monitor"

const Boolist = [
  {"name": "停止", "value": "false"},
  {"name": "启动", "value": "true"}
]
const BoolList = ["true", "false"]

//获取时间
var myDate = new Date()
const dataParam = myDate.toLocaleDateString().replace(/\//g, '-')
export default {
  mixins: [orderMixin, commonMixin],

  data() {
    return {
      Keyword: null,
      total: null,
      filters: null,
      trade: null,
      over_write: null,
      running: null,
      timeduration: null,
      show: false,
      shortObjList: [],
      timer: 0, //由于记录定时刷新
      broker_info_list: [],
      Boolist,
      BoolList,
      temp: {
        time: null,
        running: null,
        trading: null,
        target_open: null,
        target_close: null,
        available_value: null,
        min_open_available: null,
        out_open: null,
        out_close: null,
        finish_open: null,
        finish_close: null,
        finish_open_close: null,
        broker_info: null //open, close, open-close
      }
    }

  },
  created() {
    this.fetchSubOrderDelay()
    this.fetchShortObj()
  },

  computed: {},
  mounted() {
    // 定时刷新
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        this.fetchSubOrderDelay()
      }, 10000)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    fetchSubOrderDelay: function () {
      getShortInfoV2().then(result => {
        this.broker_info_list = []
        const res = result.data
        res.running = res.running.toString()
        res.trading = res.trading.toString()
        res.target_open = Math.round(res.target_open / 10000).toString() + "万"
        res.target_close = Math.round(res.target_close / 10000).toString() + "万"
        res.available_value = Math.round(res.available_value / 10000).toString() + "万"
        res.min_open_available = Math.round(res.min_open_available / 10000).toString() + "万"
        res.out_open = Math.round(res.out_open / 10000).toString() + "万"
        res.out_close = Math.round(res.out_close / 10000).toString() + "万"
        res.finish_open = Math.round(res.finish_open / 10000)
        res.finish_close = Math.round(res.finish_close / 10000)
        res.time = res.time.slice(0, 19).replace("T", " ")
        for (var obj in res.broker_info) {
          var broker_obj = {}
          broker_obj["name"] = obj
          broker_obj["open"] = res.broker_info[obj]["open"]
          broker_obj["close"] = res.broker_info[obj]["close"]
          broker_obj["open-close"] = res.broker_info[obj]["open-close"]
          this.broker_info_list.push(broker_obj)
        }

        res.broker_info = this.broker_info_list
        console.log(res.finish_open, res.finish_close, res.finish_open - res.finish_close)
        this.temp = res
        this.temp.finish_open_close = (res.finish_open - res.finish_close).toString() + "万"
        this.temp.finish_open = res.finish_open.toString() + "万"
        this.temp.finish_close = res.finish_close.toString() + "万"
      })
    },
    FormatterValue: function (row, column, cellValue, index) {
      return Math.round(cellValue / 10000).toString() + "万"
    },
    fetchShortObj() {
      getShortingStrategyConfig({"date": dataParam}).then(response => {
        this.shortObjList = response.data
        console.log(this.shortObjList)
      })
    },
    UpdateTrade() {
      UpdateShortTradeV2({"trade": this.trade, "running": "true"}).then(response => {
        console.log(response)
      })
      this.trade = null
    }, UpdateRunning() {
      UpdateShortRunningV2({"trade": "true", "running": this.running}).then(response => {
        console.log(response)
      })
      this.running = null
    }, UpdateTimeduration() {
      UpdateShortTimedurationV2({
        "time_duration_id": this.timeduration,
        "over_write": this.over_write
      }).then(response => {
        console.log(response)
      })
    },
  },


};
</script>

<style lang="scss">
.raw-filter-box {
  padding: 0 10px;
}

.short-monitor-form {
  margin-left: 80px;
}

.label-css {
  margin-left: 50px;
  margin-right: 10px;
}

.search-input {
  margin-top: 10px;
  margin-bottom: 10px;
}

.redItem .el-form-item__label {
  color: red;
}
</style>
