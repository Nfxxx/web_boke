<template>
  <div>
    <h2 class="page-title">运行换仓策略</h2>
    <template>
      <label class="label-css">时间点ID</label>
      <el-select v-model="timeduration" class="search-input" placeholder="Select TimeDurationId">
        <el-option v-for="obj in shortObjList" :key="obj.time_duration_id" :value="obj.time_duration_id"
                   :label="obj.time_duration_id"></el-option>
      </el-select>
      <el-button class="filter-item"  style="margin-left: 20px" type="primary" @click="FixTimeduration">
        确定
      </el-button>
    </template>
    <br>
    <template>
      <div v-html="dataMessage"></div>
    </template>
    <!--    </el-dialog>-->

  </div>
</template>

<script>
    import { fixTimeDuration } from "@/api/script"
    import { getShortingStrategyConfig } from "@/api/monitor"
    import  {Message}  from 'element-ui'


    //获取时间
    var myDate = new Date()
    const dataParam = myDate.toLocaleDateString().replace(/\//g, '-')

    export default {
        data() {
            return {
                shortObjList: [],
                dataMessage: null,
                timeduration: null,
            }

        },
        created() {
            this.fetchShortObj()
        },

        computed: {},
        methods: {
            fetchShortObj() {
                getShortingStrategyConfig({"date": dataParam}).then(response => {
                    this.shortObjList = response.data
                })
            },
            FixTimeduration() {
                fixTimeDuration({
                    "time_duration_id": this.timeduration,
                }).then(response => {
                    if (response.data.error_id === 0) {
                        Message({
                            message: response.data.error_msg,
                            type: 'success',
                            duration: 5 * 1000
                        })
                    } else if (response.data.error_id === -1) {
                        // this.dataMessage = response.data.error_msg.replace(/\n/g, '<br><br>')
                        this.dataMessage = response.data.error_msg
                        Message({
                            // message: response.data.message,
                            message: response.data.error_msg,
                            type: 'error',
                            duration: 5 * 1000
                        })
                    } else {
                        this.dataMessage = response.data
                    }
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
