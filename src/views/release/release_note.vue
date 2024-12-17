<template>
  <div class="block">
    <div class="radio">
      排序:
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activites"
        :key="index"
        :timestamp="activity.timestamp"
      >
        {{ index+1 }}. {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>

</template>

<script>
  export default {
    name: "release_note",
    data() {
      return {
        reverse: true,
        activites: [

          {
            content: "position查询获取添加获取最新行情信息 ",
            timestamp: "1/18/21 10:00 AM"
          },

          {
            content: "修正表格默认排序没有点击时，排序方式失效bug",
            timestamp: "1/18/21 11:00 AM"
          },

          {
            content: "聚合页面position查询结果后，可以直接显示聚合结果，不需要等待行情更新",
            timestamp: "1/18/21 2:00 PM"
          },

          {
            content: "添加 EMS Monitor 外部连接",
            timestamp: "1/18/21 2:30 PM"
          },

          {
            content: "添加筛选结果统计功能",
            timestamp: "1/20/21 10:49 AM"
          },

          {
            content: "子订单聚合添加 target Notional 功能",
            timestamp: "1/20/21 3:13 PM"
          },

          {
            content: "子订单聚合添加 group key select 多选功能",
            timestamp: "1/20/21 5:53 PM"
          },

          {
            content: "子订单聚合添加 Traded Diff 功能",
            timestamp: "1/20/21 1:08 PM"
          },

          {
            content: "子订单聚合修正grand  fill rate/ cancel rate 百分比显示不正确问题",
            timestamp: "1/21/21 2:06 PM"
          },
          {
            content: "子订单聚合修正 taget_by_notional 计算错误问题",
            timestamp: "1/21/21 2:07 PM"
          },
          {
            content: "持仓方向更新 position.proto，positionChannel: { 'connect':1, 'Qfill': 2} ",
            timestamp: "1/21/21 9:09 AM"
          },
          {
            content: "母订单下子订单导出CSV文件添加 下载表格格式化后的数据 ",
            timestamp: "2/3/21 1:43 PM"
          },

          {
            content: "母订单撤销订单功能",
            timestamp: "2/3/21 3:31 PM"
          },
          {
            content: "修正三位小数排序错误问题",
            timestamp: "2/3/21 5:57 PM"
          },
        ]
      }
    }
  }
</script>

<style scoped>
.radio {
  margin: 20px;
}
</style>
