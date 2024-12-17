<template>

  <footer class="count-box">

      <span class="count-box-title">
      Filter Results
      </span>

    <span class="count-box-info">
        {{ this.countInfo.visibleData }}
      </span>
    <span class="count-box-title">
      Total Itmes
      </span>
      <span class="count-box-info">
        {{ this.countInfo.total}}
      </span>

  </footer>
</template>

<script>
    export default {
        name: "footerCountInfo.vue",
        props: {
          parentRefs: {
            type: Object,
            default: null
          //  Todo
          //  应该添加一个验证犯法 负责检验是否含有getTableData方法
          }
        },

      mounted() {
        this.isMounted  = true
      },

      data() {
          return {
            isMounted: false

          }
      },

      methods: {
          getRenderData(){
            let res =  this.parentRefs.xTable.getTableData()
            // console.log(" getRenderData ")
            // console.log(res)
            return {
              total: res.fullData.length,
              visibleData: res.visibleData.length
            }
          }

        },
      computed: {
        //  筛选后的数量
        countInfo: function () {
          if (this.isMounted) {
            return this.getRenderData()
          } else {
            return {
              total: 0,
              visibleData: 0
            }
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .count-box {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    .count-box-title {
      padding: 6px 10px;
      background: dimgray;
      color: white;
      flex:auto;
      text-align: center;

    }
    .count-box-info {
      padding: 6px 10px;
      background: orange;
      color: black;
      flex:auto;
      text-align: center;
    }
  }


</style>
