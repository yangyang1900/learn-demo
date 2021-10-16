<template>
  <div class="hello">
    <el-button @click="gotoPage('/websocket')">websocket示例</el-button>
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
<style lang="less" scoped>

</style>
