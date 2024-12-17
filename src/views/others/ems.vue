<template>
  <div>
    <h2 class="page-title">
      Navigations
    </h2>
    <el-card>
      <el-button @click="openNavigation(ems_monitor_url)">
        EMS Monitor
      </el-button>
      <el-button @click="openNavigation(etcd_keeper)">
        ETCD Keeper
      </el-button>
      <el-button @click="openNavigation(gitlab)">
        GitLab
      </el-button>
      <el-button @click="openNavigation(tcaorder)">
        Tcaorder
      </el-button>
      <el-button @click="openNavigation(porderStatistics)">
        POrderStatistics
      </el-button>
      <el-button @click="openNavigation(portainer)">
        Portainer.io
      </el-button>
    </el-card>
  </div>
</template>

<script>

export default {
  created() {
  },

  beforeMount() {
  },
  data() {
    return {
      ems_monitor_url: "http://172.16.0.64:8818/index",
      etcd_keeper: "http://172.16.2.230:8080/etcdkeeper/",
      gitlab: "http://172.16.0.55/",
      tcaorder: "http://172.16.1.134:8001/download/tcaorder/",
      porderStatistics: "http://172.16.1.134:8001/download/porderStatistics/",
      "portainer": "http://172.16.2.228:9000/"
    }
  },
  methods: {
    openNavigation(url) {
      window.open(url)
    }
  }
}
</script>

<style scoped>
</style>

