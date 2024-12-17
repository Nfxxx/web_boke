<template>
  <div>
    <h2 class="page-title">Shorting策略测试</h2>
    <template>
      <el-button class="filter-item" style="margin-left: 20px" type="primary" @click="ShortingStrategy">
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
    import { shortingStrategy } from "@/api/script"
    import  {Message}  from 'element-ui'


    export default {
        data() {
            return {
                dataMessage: null,
            }

        },
        computed: {},
        methods: {
            ShortingStrategy() {
                shortingStrategy().then(response => {
                    console.log(response)
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
