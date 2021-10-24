<template>
  <div class="hello">
    <el-button @click="gotoPage('/websocket')">websocket示例</el-button>
    <el-button @click="gotoPage('/echarts')">Echarts示例</el-button>
    <el-button @click="gotoPage('/echarts-1')">Echarts示例-1</el-button>
    <el-button @click="gotoPage('/axios')">axios示例</el-button>
    <el-button @click="gotoPage('/menu')">menu</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    
  },
  data() {
    return {

    }
  },
  methods: {
    gotoPage(url) {
      this.$router.push({
        path: url
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .hello {
    margin-top: 20px;
    margin-left: 20px;
  }

</style>
