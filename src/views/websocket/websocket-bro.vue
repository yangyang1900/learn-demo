<template>

  <div>
    <h1>Echo Test</h1>
    <input type="text" id="sendTxt" />
    <button id="sendBtn">发送</button>
    <div id="recv">

    </div>
  </div>
  
</template>

<script>
export default {
  name: 'websocket',
  data () {
    return {

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var websocket = new WebSocket("wss://echo.websocket.org/");
      websocket.onopen = function () {
        console.log("websocket open");
        document.getElementById("recv").innerHTML = "Connected";
      }
      websocket.onclose = function () {
        console.log("websocket close");
      }
      websocket.onmessage = function (e) {
        console.log(e.data);
        document.getElementById("recv").innerHTML = e.data;
      }
      document.getElementById("sendBtn").onclick = function () {
        var txt = document.getElementById("sendTxt").value;
        websocket.send(txt);
      }
    }
  }
}
</script>

<style lang="less">

</style>