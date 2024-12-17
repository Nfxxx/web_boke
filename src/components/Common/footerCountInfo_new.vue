<template>

  <footer class="count-box">

      <span class="count-box-title">
      Filter Results
      </span>

    <span class="count-box-info">
        {{ filters }}
      </span>
    <span class="count-box-title">
      Total Itmes
      </span>
      <span class="count-box-info">
        {{ total}}
      </span>

  </footer>
</template>

<script>
    export default {
        name: "footerCountInfoNew.vue",
        props: {
          total: {
            type: Number,
            default: null
          },
          filters: {
            type: Number,
            default: null
          }
        },

      mounted() { },

      data() {
          return {

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
