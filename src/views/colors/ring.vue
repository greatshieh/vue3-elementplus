<template>
  <canvas ref="graphCanvas" width="50" height="50"></canvas>
</template>

<script setup name="Ring">
import { onMounted, watch } from 'vue'

const props = defineProps({
  percent: { type: Number, default: 100 },
  color: { type: String, default: '#fff' }
})

const graphCanvas = ref(null)

watch(
  () => props.percent,
  (e) => {
    drawMain(graphCanvas.value, e, props.color)
  },
  { deep: true }
)

onMounted(() => {
  groundCircle(graphCanvas.value, 100, props.color)
})

// function backgroundCircle(drawing_elem) {
//   var context = drawing_elem.getContext('2d')
//   var center_x = drawing_elem.width / 2
//   var center_y = drawing_elem.height / 2
//   var rad = (Math.PI * 2) / 100

//   context.save()
//   context.strokeStyle = '#fff' // 决定圆环颜色
//   context.lineWidth = 2
//   context.lineCap = 'round'
//   var radius = center_x - context.lineWidth
//   context.beginPath()

//   context.arc(
//     center_x,
//     center_y,
//     radius,
//     -Math.PI / 4,
//     -Math.PI / 4 + 100 * rad,
//     false
//   ) // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
//   context.stroke()
//   context.closePath()
//   context.restore()
// }

// 绘制运动圆环
function groundCircle(drawing_elem, n, color) {
  var context = drawing_elem.getContext('2d')
  var center_x = drawing_elem.width / 2
  var center_y = drawing_elem.height / 2
  var rad = (Math.PI * 2) / 100

  context.save()
  context.strokeStyle = color // 决定圆环颜色
  context.lineWidth = 2
  context.lineCap = 'round'
  var radius = center_x - context.lineWidth
  context.beginPath()

  context.arc(
    center_x,
    center_y,
    radius,
    -Math.PI / 4,
    -Math.PI / 4 + n * rad,
    false
  ) // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
  context.stroke()
  context.closePath()
  context.restore()
}

function drawMain(drawing_elem, percent, forecolor) {
  /*
				@drawing_elem: 绘制对象
				@percent：绘制圆环百分比, 范围[0, 100]
				@forecolor: 绘制圆环的前景色，颜色代码
				@bgcolor: 绘制圆环的背景色，颜色代码
			*/
  var context = drawing_elem.getContext('2d')
  var speed = 0

  // 执行动画
  ;(function drawFrame() {
    if (speed <= percent) {
      window.requestAnimationFrame(drawFrame)
    } else {
      return false
    }
    context.clearRect(0, 0, drawing_elem.width, drawing_elem.height)
    groundCircle(drawing_elem, speed, forecolor)
    if (speed >= percent) {
      speed++
    } else {
      speed += 1
    }
  })()
}
</script>
