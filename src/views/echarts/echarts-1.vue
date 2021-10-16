<template>
  <div class="sales-report">
    <div class="header">
      电商商品趋势图
    </div>
    <div class="content">
      <div class="content-title-wrapper">月销售增长率</div>
      <div class="content-index-wrapper">
        <span class="percentage">34<span class="percentage-text">%</span></span>
        <span class="text">+14,400</span>
      </div>
      <div id="content-chart"></div>
      <div class="content-circle-wrapper">
        <div 
          :class="['circle', selected === index ? 'selected' : '']" 
          v-for="(item, index) in circle" 
          :key="index"
          @click="handleClick(index)">

        </div>
      </div>
      <div class="content-bottom-wrapper">销售趋势</div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>

import * as echarts from "echarts";

export default {
  name: 'echarts-demo1',
  data() {
    return {
      circle: new Array(3),
      selected: 0,
      viewWidth: 0,
      viewHeight: 0 
    }
  },
  mounted() {
      //this.drawLine();
      setInterval( () => {
        //this.viewWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        //this.viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let index = this.selected
        index ++
        if(index > this.circle.length) {
          index = 0
        }
        this.handleClick(index)
      }, 5000)
  },
  watch: {
    viewWidth(val, old) {
      if(val !== old) {
        //console.log(val)
        //this.drawLine()
      }
    },
    viewHeight(val, old) {
      if(val !== old) {
        //this.drawLine()
      }
    }
  },
  methods: {
    drawLine() {
      const mockData = []
      for(let i = 0; i < 10; i++) {
        mockData.push(Math.floor(Math.random() * 100) + 200)
      }

      const chartDom = document.getElementById('content-chart')
      var myChart = echarts.init(chartDom)
      myChart.setOption({
        grid: {
          top: 0,
          bottom: 0,
          right: -30,
          left: -30
        },
        xAxis: {
          type: 'category',
          show: false
        },
        yAxis: {
          min: 0,
          max: 400,
          show: false,
        },
        series: [{
          data: mockData,
          type: 'line',
          smooth: true,
          areaStyle: {
            color: 'rgba(75, 193, 252, .5)'
          },
          lineStyle: {
            width: 4,
            color: 'rgba(75, 193, 252, 1)'
          },
          itemStyle: {
            borderWidth: 8,
            color: 'rgba(74,193,252,1)'
          }
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        }
      })

    },
    handleClick(index) {
      this.selected = index;
      this.drawLine()
    }
  }
}
</script>

<style>

.sales-report {
  display: flex;
  flex-direction: column; 
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(4, 9, 20, 0.03), 0 2px 8px rgba(4, 9, 20, 0.03),0 2px 8px rgba(4, 9, 20, 0.03),0 2px 8px rgba(4, 9, 20, 0.03);
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #eeee;
  box-sizing: border-box;
  color: rgba(13, 27, 62, .7);
  padding-left: 20px;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 28px;
  box-sizing: border-box;
}

.content-title-wrapper {
  padding-top: 28px;
  color: rgb(108, 117, 125);
  font-size: 13px;
}

.content-index-wrapper {
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.percentage {
  font-size: 35px;
  font-weight: 700;
  color: #333;
  margin-left: 15px;
}

.percentage-text {
  font-size: 28px;
  font-weight: 400;
  color: #999;
  margin-left: 2px;
}

.text {
  margin-left: 15px;
  color: rgb(58, 196, 125);
}

#content-chart {
  flex: 1;
  width: 100%;
}

.content-circle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.circle {
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 3px solid rgb(63, 106, 216);
  border-radius: 50%; 
  margin: 0 5px;
}

.selected {
  width: 12px;
  height: 12px;
  border: 5px solid rgb(63, 106, 216);
}

.content-bottom-wrapper {
  margin: 10px 0;
  color: #999;
}

.footer{
  width: 100%;
  height: 120px;
  border-top: 1px solid #eeee;
  box-sizing: border-box;
}

</style>