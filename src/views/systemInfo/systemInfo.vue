<template>
  <div>
    <el-row>
      <el-col v-for="item in list" :span="2"  style="margin:16px">
        <el-card class="box-card" :body-style="{padding:'0px',textAlign:'left'}">
          <div :style="{color:item.RunningStatus=='Stop'?'red':'green', fontSize: '32px',marginLeft:'5px'}" >
            {{item.RunningStatus=='Stop'?'Unhealthy':'Healthy'}}
          </div>
          <br>
          <div :style="{ fontSize: '18px',marginLeft:'10px'}">{{item.ServerName}}</div>
          <br>
          <el-button type="primary" size="medium" class="btn1" style="float: left;padding:5px 0;margin-left: 5px">Start</el-button>
          <el-button type="danger" size="medium" class="btn2" style="float: left;padding:5px 0" >Stop</el-button>
          <el-button type="info" v-if="item.ServerName.indexOf('Algo')!==-1 " size="medium" @click="showMsg(item)" style="float: left;padding:5px 0">Detail</el-button>
        </el-card>

      </el-col>

    </el-row>

    <div style="overflow: hidden" :style="{width: '70%',marginLeft:'10px'}">
      <el-descriptions  border :column="3" >
        <template slot="title">
          Risk
          <el-button class="btn3" type="primary" size="medium" @click="showRisk()" style="padding:5px 0;margin-left: 10px">Detail</el-button>
        </template>
        <el-descriptions-item label="ServerName">
          {{RiskDetail.ServerName}}
        </el-descriptions-item>
        <el-descriptions-item label="Url">
          {{RiskDetail.Url}}
        </el-descriptions-item>
        <el-descriptions-item label="InsertOrders">
          {{RiskDetail.InsertOrders}}
        </el-descriptions-item>
        <el-descriptions-item label="UpdateOrders">
          {{RiskDetail.UpdateOrders}}
        </el-descriptions-item>
        <el-descriptions-item label="ErrPositionCount">
            {{getCount(RiskDetail.ErrorPosition) }}
        </el-descriptions-item>
        <el-descriptions-item label="ErrBorrowCount">
          {{getCount(RiskDetail.ErrorBorrow)}}
        </el-descriptions-item>
        <el-descriptions-item label="AlgoClients">
          <p style="white-space:pre-wrap;">{{getAllAlgos()}}</p>
        </el-descriptions-item>
        <el-descriptions-item label="Accounts">
          {{getCount(RiskDetail.Accounts)}}
        </el-descriptions-item>
      </el-descriptions>
<!--      <br>-->
      <el-descriptions  title="DbEngine" border :column="3"  style="margin-bottom: 5px">
        <el-descriptions-item label="ServerName">
          {{DbDetail.ServerName}}
        </el-descriptions-item>
        <el-descriptions-item label="Url">
          {{DbDetail.Url}}
        </el-descriptions-item>
        <el-descriptions-item label="CacheOrders">
          {{DbDetail.CacheOrders}}
        </el-descriptions-item>
        <el-descriptions-item label="ReceiveOrders">
          {{DbDetail.ReceiveOrders}}
        </el-descriptions-item>
        <el-descriptions-item label="SqlOrders">
          {{DbDetail.SqlOrders}}
        </el-descriptions-item>
        <el-descriptions-item label="UpdateOrders">
          {{DbDetail.UpdateOrders}}
        </el-descriptions-item>
      </el-descriptions>

<!--      <br>-->
      <el-descriptions  title="TickEngine" border :column="2"  style="margin-bottom: 5px">
        <template slot="title">
          TickEngine
          <el-button class="btn3" type="primary" size="medium" @click="showTick()" style="margin-left: 10px;padding:5px 0">Detail</el-button>
        </template>

        <el-descriptions-item label="ServerName">
          {{TickDetail.ServerName}}
        </el-descriptions-item>
        <el-descriptions-item label="Url">
          {{TickDetail.Url}}
        </el-descriptions-item>
        <el-descriptions-item label="AMA">
          {{TickDetail.AMA}}
        </el-descriptions-item>
        <el-descriptions-item label="KDB">
          {{TickDetail.KDB}}
        </el-descriptions-item>
      </el-descriptions>

<!--      <br>-->
      <el-descriptions  title="GatewayEngine" border :column="4"  >
        <el-descriptions-item label="ServerName">
          {{GatewayDetail.ServerName}}
        </el-descriptions-item>
        <el-descriptions-item label="Url">
          {{GatewayDetail.Url}}
        </el-descriptions-item>
        <el-descriptions-item label="EMS Connecting">
          {{GatewayDetail.EMSClient}}
        </el-descriptions-item>
        <el-descriptions-item label="Risk Connecting">
          {{GatewayDetail.RiskClient}}
        </el-descriptions-item>

        <el-descriptions-item label="ParentOrder">
          {{GatewayDetail.ParentOrder}}
        </el-descriptions-item>
        <el-descriptions-item label="ReceiveParentOrders">
          {{GatewayDetail.ReceiveParentOrders}}
        </el-descriptions-item>
        <el-descriptions-item label="ReceiveSubOrders">
          {{GatewayDetail.ReceiveSubOrders}}
        </el-descriptions-item>
      </el-descriptions>

    </div>

    <el-dialog :visible.sync="visible">
      <el-collapse >
        <el-collapse-item title="ErrorPosition" >
          <div v-for="(item,index) in RiskDetail.ErrorPosition" style="margin: 10px 0px">
            {{ item }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="ErrorBorrow" >
          <div v-for="(item,index) in RiskDetail.ErrorBorrow" style="margin: 10px 0px">
            {{ item }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="AlgoClients" >
          <div v-for="(item,index) in RiskDetail.AlgoClients" style="margin: 10px 0px">
            {{ item.AlgoNode }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="Accounts" >
          <div v-for="(item,index) in RiskDetail.Accounts" style="margin: 10px 0px">
            {{ item }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="RiskConfig" >
            {{ RiskDetail.RiskConfig }}
        </el-collapse-item>
      </el-collapse>
    </el-dialog>

    <el-dialog :visible.sync="tickvisible">
      {{ TickDetail.Config }}
    </el-dialog>


    <el-dialog :visible.sync="visible2">
      <el-descriptions border :column="3">
        <template v-for="(item, key) in currentAlgoInfo">
          <template v-if="key !== 'AlgoConfig'" >
            <el-descriptions-item :key="key">
              <template slot="label">
                {{ key }}
              </template>
              {{ item }}
            </el-descriptions-item>
          </template>
        </template>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import {getServerInfo,ping,getServerDetail} from "@/api/system";
import constobj from '@/api/baseconfig'
import axios from "axios";
import {commonMixin, orderMixin} from "@/mixins";

export default {
  name: "systemInfo",
  mixins: [orderMixin, commonMixin],

  data(){
    return {
      list: [],
      test:['qqqqqq','ppppppp'],
      status:0,
      visible:false,
      visible2:false,
      tickvisible:false,
      currentAlgoInfo:null,
      RiskDetail:{
        ServerName: "",
        Url: "",
        InsertOrders: 0,
        UpdateOrders: 0,
        ErrorPosition:null,
        ErrorBorrow:null,
        Accounts:null,
        AlgoClients:null,
        RiskConfig:null,
        Index: 0,
      },
      DbDetail:{
        ServerName: "",
        Url: "",
        Index: 0,
        CacheOrders: 0,
        ReceiveOrders: 0,
        SqlOrders: 0,
        UpdateOrders: 0,
    },
      TickDetail:{
        ServerName: "",
        Url: "",
        Index: 0,
        AMA:"",
        KDB:"",
        Config: null
      },
      GatewayDetail:{
        ServerName: "",
        Url: "",
        Index: 0,
        EMSClient:false,
        RiskClient:false,
        ParentOrder:0,
        ReceiveParentOrders:0,
        ReceiveSubOrders:0,
      }
    };
  },
  created() {
    this.controls = this.$store.state.controls
    this.getSymData()

  },
  mounted(){
    // 定时刷新
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        this.pingServer()
        this.getServerDetail()
      }, 10000)
    }
  },
  destroyed(){
    clearInterval(this.timer)
  },
  methods:{
    showMsg(data){
      this.visible2=true
      this.currentAlgoInfo=data.Infos
    },
    getCount(l){
      if (l===null){
        return 0
      }
      return l.length
    },
    getAllAlgos(){
      if (this.RiskDetail.AlgoClients===null){
        return ""
      }
      var a= []
      for (let i = 0; i <   this.RiskDetail.AlgoClients.length; i++) {
        var node =  this.RiskDetail.AlgoClients[i]
        node.AlgoNode.IsConnect = node.IsConnect
        a.push(JSON.stringify(node.AlgoNode))
      }
      return a.join('\n')
    },
    showTick(){
      this.tickvisible=true
    },
    showRisk(){
      this.visible=true
    },
    getSymData(){
      var param = {ServiceName: "RiskService",Env: constobj.env}
      getServerInfo(param).then(result1 => {
        var result = result1.data
        console.log(result)
        for (let key in result.baseConfig.HttpServiceConfig){
          if (key!=="AlgoHttpUrl" && key!=="EMSHttpUrl"){
            this.list.push({
              "ServerName": key,
              "Url": result.baseConfig.HttpServiceConfig[key],
              "RunningStatus": 'Stop',
              "Infos": null
            }) ;
          }
        }
        for (let key in result.algoNodes){
          this.list.push({
              "ServerName": key,
              "Url": result.algoNodes[key].httpUrl,
              "RunningStatus": 'Stop',
              "Infos": null
            }) ;
        }
        this.pingServer()
        this.getServerDetail()

      })

    },
    async pingServer(){
      let data=[]
      for(var i=0;i< this.list.length;i++){
         let result= await this.getAxios1(this.list[i].Url)
         data.push(result)
      }
      this.list.map((item,index)=>{
        item.RunningStatus='Stop'
      })
      Promise.all(data).then(res=>{
        this.list.map((item,index)=>{
          // console.log(item)
          if(res[index]){
            item.RunningStatus='Running'
          }
        })
      }).catch(error=>{
        console.log('bbb',error)
      })

    },
    async getServerDetail() {
      let data=[]
      for(var i=0;i< this.list.length;i++){
        let result= await this.getAxios2(this.list[i].Url)
        data.push(result)
      }
      Promise.all(data).then(res=>{
        this.list.map((item,index)=>{
          if(res[index]){
            item.Infos=res[index].data
            if (item.ServerName=="RiskHttpUrl"){
              console.log(item.Infos)
              this.RiskDetail.Index=index
              this.RiskDetail.ServerName=item.ServerName
              this.RiskDetail.Url=item.Url
              this.RiskDetail.InsertOrders= item.Infos.InsertOrders
              this.RiskDetail.UpdateOrders= item.Infos.UpdateOrders
              this.RiskDetail.ErrorPosition= item.Infos.ErrorPosition
              this.RiskDetail.ErrorBorrow= item.Infos.ErrorBorrow
              this.RiskDetail.AlgoClients = item.Infos.AlgoClients
              this.RiskDetail.Accounts = item.Infos.Accounts
              this.RiskDetail.RiskConfig = item.Infos.RiskConfig

            } else if (item.ServerName=="DBHttpUrl"){
              this.DbDetail.Index=index
              this.DbDetail.ServerName=item.ServerName
              this.DbDetail.Url=item.Url
              this.DbDetail.CacheOrders=item.Infos.CacheOrders
              this.DbDetail.ReceiveOrders=item.Infos.ReceiveOrders
              this.DbDetail.SqlOrders=item.Infos.SqlOrders
              this.DbDetail.UpdateOrders=item.Infos.UpdateOrders
              // console.log(item.Infos)
            }else if (item.ServerName=="TickHttpUrl"){
              this.TickDetail.Index=index
              this.TickDetail.ServerName=item.ServerName
              this.TickDetail.Url=item.Url
              this.TickDetail.AMA=item.Infos.AMA
              this.TickDetail.KDB=item.Infos.KDB
              this.TickDetail.Config=item.Infos.Config

              // console.log(item.Infos)
            }else if (item.ServerName=="GateWayUrl"){
              this.GatewayDetail.Index=index
              this.GatewayDetail.ServerName=item.ServerName
              this.GatewayDetail.Url=item.Url
              this.GatewayDetail.EMSClient=item.Infos.EMSClient
              this.GatewayDetail.RiskClient=item.Infos.RiskClient
              this.GatewayDetail.ParentOrder=item.Infos.ParentOrder
              this.GatewayDetail.ReceiveParentOrders=item.Infos.ReceiveParentOrders
              this.GatewayDetail.ReceiveSubOrders=item.Infos.ReceiveSubOrders

              // console.log(item.Infos)
            }
            // else if (item.ServerName=="AlgoNode1"){
            //   console.log(item.Infos)
            // }
          }

        })
      }).catch(error=>{
      })
    },
    getAxios1(val){
      return new Promise(function (resolve,reject){
        ping(val).then(result => {
          resolve(result)
        }).catch(error => {
          // console.log('失败',error)
          resolve()

          // reject()
        })
      })
    },
    getAxios2(val){
      return new Promise(function (resolve,reject){
        getServerDetail(val).then(result => {
          resolve(result)
        }).catch(error => {
          // console.log('失败',error)
          resolve()

          // reject()
        })
      })
    },
  }
}


</script>

<style scoped >
.btnContent{
  float: left;
  height: 50px;
  padding-left: 15px;
}
.btnContent .el-button{
  /*position: absolute;*/
}
.btn1{
  left: 15px;
}
.btn2{
  left: 100px;
}
.btn3{
  left: 190px;
}
.box-card{
  width: 160px;
  height: 150px;
  lineHeight: 170px;
}
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>
