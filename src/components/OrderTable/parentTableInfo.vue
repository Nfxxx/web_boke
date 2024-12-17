   <template>
    <el-row class="parent-order-box" :gutter="0">
      <!-- accountId -->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="parent-order-box-row">
        <b class="parent-order-box-title"> {{ locale.accountId }} </b>
        <span class="parent-order-box-content">
          {{ parentOrder.accountId }}
        </span>
      </el-col>


      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="parent-order-box-row">
        <b class="parent-order-box-title"> {{ locale.accountId }} </b>
        <span class="parent-order-box-content">
          {{ parentOrder.accountId }}
        </span>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="parent-order-box-row">
        <b class="parent-order-box-title"> {{ locale.accountId }} </b>
        <span class="parent-order-box-content">
          {{ parentOrder.accountId }}
        </span>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="parent-order-box-row">
        <b class="parent-order-box-title"> {{ locale.accountId }} </b>
        <span class="parent-order-box-content">
          {{ parentOrder.accountId }}
        </span>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="parent-order-box-row">
        <b class="parent-order-box-title"> {{ locale.accountId }} </b>
        <span class="parent-order-box-content">
          {{ parentOrder.accountId }}
        </span>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="parent-order-box-row">
        <b class="parent-order-box-title"> {{ locale.accountId }} </b>
        <span class="parent-order-box-content">
          {{ parentOrder.accountId }}
        </span>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" class="parent-order-box-row">
        <b class="parent-order-box-title"> {{ locale.accountId }} </b>
        <span class="parent-order-box-content">
          {{ parentOrder.accountId }}
        </span>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    parentOrderInfo: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
</style>
