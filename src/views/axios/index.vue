<template>
  <div></div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {

    }
  },
  created() {
    axios.get('api/city.json').then((res) => {
      console.log(res)
    })

    const data = {
      name: 'qq',
    }
    const params = {
      id: 'value'
    }
    axios.put('api/detail.json', data, { params })
  }  
}
</script>

<style lang="less">

</style>