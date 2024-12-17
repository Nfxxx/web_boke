<template>
  <div style="margin-left:10px;display:inline-block;">
    <el-button
      type="success"
      :size="size"
      :disabled="onLoadding"
      v-if="mode==='onlySource'"
    >
      {{infoMessage}} <i style="font-size:15px;margin-left:5px" class="el-icon-download el-icon-right"></i>
    </el-button>



    <el-dropdown @command="handleCommand" size="small" v-else>
      <el-button type="success" size="small">
        Export to CSV file
        <i class="el-icon-arrow-down"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="downloadSource">
           source data
        </el-dropdown-item>
        <el-dropdown-item command="downloadDisplay">
          display data
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import CsvExportor from "csv-exportor";
import _ from "lodash";

export default {
  name: "DownLoadCsvButton",
  props: {
    fileName: {
      type: String,
      default: "data.csv"
    },
    infoMessage: {
      type: String,
      default: "ExportCSV"
    },
    mode: {
      type: String,
      default: "onlySource"
    },
    size: {
      type: String,
      default: "small"
    }

  },
  created() {
    // this.info = "Export to CSV"
  },
  data() {
    return {
      onLoadding: false
    }
  },
  methods: {

    handleCommand(command) {
      // console.log(command)
      this.$emit(command)
    },

    removeXID(tableData) {
      let res = [];
      for (let i = 0, len = tableData.length; i < len; i++) {
        res.push(_.omit(tableData[i], ["_XID"]));
      }
      return res;
    },
    downLoadCsvFile(tableData) {
      this.onLoadding = true
      let options = _.remove(Object.keys(tableData[0]), (item,index,models) => {return item !== "_XID";});
      let csvdata = this.removeXID(tableData);
      CsvExportor.downloadCsv(csvdata, { header: options }, this.fileName);
      this.onLoadding = false

    },

    downLoadDisplayCsvFile(tableData) {
      this.onLoadding = true

      let options = _.remove(Object.keys(tableData[0]), (item,index,models) => {return item !== "_XID";});
      let csvdata = this.removeXID(tableData);
      CsvExportor.downloadCsv(csvdata, { header: options }, this.fileName);
      this.onLoadding = false
    }

  }
};
</script>
<style>

</style>

