<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script setup name="RaddarChart">
import * as echarts from 'echarts'
import 'echarts/theme/macarons.js'
import 'echarts/theme/dark.js'
import { getCurrentInstance, nextTick, onBeforeUnmount, onMounted } from 'vue'
import resize from './mixins/resize'

const animationDuration = 3000

const props = defineProps({
  className: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '300px'
  },
  theme: {
    type: String,
    default: 'macarons'
  }
})

let chart = null

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

onBeforeUnmount(() => {
  if (!chart) {
    return
  }
  chart.dispose()
  chart = null
})

watch(
  () => props.theme,
  () => {
    chart.dispose()
    initChart()
  }
)

const { proxy } = getCurrentInstance()
function initChart() {
  chart = echarts.init(proxy.$el, props.theme)
  resize(chart)
  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    radar: {
      radius: '66%',
      center: ['50%', '42%'],
      splitNumber: 10,
      splitArea: {
        areaStyle: {
          //   color: 'rgba(127,95,132,.3)',
          opacity: 1,
          shadowBlur: 45,
          shadowColor: 'rgba(0,0,0,.5)',
          shadowOffsetX: 0,
          shadowOffsetY: 15
        }
      },
      indicator: [
        { name: 'Sales', max: 20000 },
        { name: 'Administration', max: 20000 },
        { name: 'Information Technology', max: 20000 },
        { name: 'Customer Support', max: 20000 },
        { name: 'Development', max: 20000 },
        { name: 'Marketing', max: 20000 }
      ]
    },
    legend: {
      left: 'center',
      bottom: '10',
      data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
    },
    series: [
      {
        type: 'radar',
        symbolSize: 0,
        areaStyle: {
          shadowBlur: 13,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1
        },
        data: [
          {
            value: [5000, 7000, 12000, 11000, 15000, 14000],
            name: 'Allocated Budget'
          },
          {
            value: [4000, 9000, 15000, 15000, 13000, 11000],
            name: 'Expected Spending'
          },
          {
            value: [5500, 11000, 12000, 15000, 12000, 12000],
            name: 'Actual Spending'
          }
        ],
        animationDuration: animationDuration
      }
    ]
  })
}
</script>
