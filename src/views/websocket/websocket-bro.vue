websocket学习，最初在一个页面写完websocket方法
<template>

  <div>
    <h1>Echo Test</h1>
    <el-input type="text" v-model="sendTxt"/>
    <el-button id="sendBtn" @click="sendMes">发送</el-button>
    <div id="recv">
      {{sendTxtWeb}}
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'websocket',
  data () {
    return {
      websocket: null,
      sendTxt:'',
      sendTxtWeb: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.websocket = new WebSocket("ws://localhost:3000/");
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      let actions = {"test":"12345"};
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror(){//连接建立失败重连
      this.init();
    },
    websocketonmessage(e){ //数据接收
      const redata = JSON.parse(e.data);
      //现实接收回来的值
      this.sendTxtWeb = redata
      console.log(redata)
    },
    websocketsend(Data){//数据发送
      this.websocket.send(Data);
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e);
    },
    sendMes() {
      if(this.websocket.readyState === 1) {
        var txt = this.sendTxt;
        this.websocket.send(JSON.stringify(txt));
      }
    }
  }
}
</script>

<style lang="less">

</style>