<template>
  <div
    class="app-container"
    :style="{ backgroundColor: currentColor.hex, transition: 'all 1.5s' }"
  >
    <div style="font-weight: bold; font-size: 36px">
      中国传统色<span style="font-size: 12px; color: #606266">
        来自于:<a href="http://zhongguose.com/">http://zhongguose.com/</a>
      </span>
    </div>

    <el-row>
      <el-col :span="16">
        <g-list
          :data-source="colors"
          :bordered="false"
          size="large"
          :grid="{ gutter: 16, xl: 6, lg: 5, md: 4, sm: 2, xs: 1 }"
        >
          <template #renderItem="{ item }">
            <el-tooltip effect="light" placement="top-start">
              <template #content>
                <div>CMYK: {{ item.CMYK }}</div>
                <div>RGB: {{ item.rgb }}</div>
                <div>HEX: {{ item.hex }}</div>
              </template>
              <div class="color-container" @click="changeColor(item)">
                <g-list-item key="item.name">
                  <div
                    :style="{
                      backgroundColor: item.hex,
                      height: '12px',
                      width: '100%'
                    }"
                  ></div>
                  <div class="descript">
                    <span>
                      {{ item.pinyin.toUpperCase() }}
                    </span>
                    <span :style="{ color: item.hex }">
                      {{ item.name }}
                    </span>
                  </div>
                </g-list-item>
              </div>
            </el-tooltip>
          </template>
        </g-list>
      </el-col>
      <el-col :span="8" style="color: #fff; position: relative">
        <div style="position: fixed">
          <div class="color-value">
            <div class="cmyk">
              <dl>C</dl>
              <dt>
                <div v-if="currentColor.name">{{ currentColor.CMYK[0] }}</div>
                <ring
                  :percent="currentColor.CMYK[0]"
                  :color="currentColor.name ? '#00ffff' : '#fff'"
                  style="z-index: 2"
                />
                <ring style="z-index: 1" />
              </dt>
              <dl>M</dl>
              <dt>
                <div v-if="currentColor.name">{{ currentColor.CMYK[1] }}</div>
                <ring
                  :percent="currentColor.CMYK[1]"
                  :color="currentColor.name ? '#ff00ff' : '#fff'"
                  style="z-index: 2"
                />
                <ring style="z-index: 1" />
              </dt>
              <dl>Y</dl>
              <dt>
                <div v-if="currentColor.name">{{ currentColor.CMYK[2] }}</div>
                <ring
                  :percent="currentColor.CMYK[2]"
                  :color="currentColor.name ? '#ffff00' : '#fff'"
                  style="z-index: 2"
                />
                <ring style="z-index: 1" />
              </dt>
              <dl>K</dl>
              <dt>
                <div v-if="currentColor.name">{{ currentColor.CMYK[3] }}</div>
                <ring
                  :percent="currentColor.CMYK[3]"
                  :color="currentColor.name ? '#000000' : '#fff'"
                  style="z-index: 2"
                />
                <ring style="z-index: 1" />
              </dt>
            </div>
            <div class="rgb">
              <dl>R</dl>
              <dt>
                <count-to
                  :start-val="lastStartRGB[0]"
                  :end-val="currentColor.RGB[0]"
                  :duration="2000"
                  @callback="CountFinished"
                />
              </dt>
              <dl>G</dl>
              <dt>
                <count-to
                  :start-val="lastStartRGB[1]"
                  :end-val="currentColor.RGB[1]"
                  :duration="2000"
                  @callback="CountFinished"
                />
              </dt>
              <dl>B</dl>
              <dt>
                <count-to
                  :start-val="lastStartRGB[2]"
                  :end-val="currentColor.RGB[2]"
                  :duration="2000"
                  @callback="CountFinished"
                />
              </dt>
            </div>
          </div>
          <div class="color-name">
            {{ currentColor.name || '中国传统色' }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Colors">
import axios from 'axios'
import GList from '@/components/GList/index.vue'
import GListItem from '@/components/GList/Item.vue'
import CountTo from '../../components/CountTo/index.vue'
import Ring from './ring.vue'

const currentColor = ref({ hex: '#E6E8EB', RGB: [0, 0, 0], CMYK: [0, 0, 0, 0] })
const colors = ref([])
const lastStartRGB = ref([0, 0, 0])

axios({
  method: 'get',
  url: '/static/chinese_color.json',
  responseType: 'json'
}).then((resp) => {
  colors.value = resp.data
  colors.value.sort((a, b) => {
    if (rgb2hsv(a.RGB)[0] === rgb2hsv(b.RGB)[0]) {
      return rgb2hsv(b.RGB)[1] - rgb2hsv(a.RGB)[1]
    } else return rgb2hsv(b.RGB)[0] - rgb2hsv(a.RGB)[0]
  })
})

const changeColor = (e) => {
  currentColor.value = e
}

const CountFinished = () => {
  lastStartRGB.value = currentColor.value.RGB
}

const rgb2hsv = function (rgb) {
  var r = rgb[0] / 255
  var g = rgb[1] / 255
  var b = rgb[2] / 255
  var max = Math.max(r, g, b)
  var min = Math.min(r, g, b)
  var h
  var s
  var v = max

  var d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h, s, v]
}
</script>

<style lang="scss">
@use '@/assets/font/font.css' as *;
@use '@/styles/variables.module.scss' as *;

$cmykHeight: 420;

.el-popper .is-customized {
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}

.color-container {
  cursor: pointer;
  height: 300px;
  text-align: center;
  font-size: 16px;

  font-family: '站酷高端黑';
  color: #c0c4cc;
  transform: all 2s ease-in;
  &:hover {
    opacity: 0.3;
  }
  & .descript {
    writing-mode: tb;
    font-size: 24px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: nowrap;
    align-items: flex-start;
  }
}

.color-value {
  position: absolute;
  width: 100px;
  top: 48px;
  left: 80px;

  .cmyk {
    width: 50px;
    & dl {
      margin-top: 12px;
      margin-bottom: 12px;
    }

    & dt {
      width: 50px;
      height: 62px;
      position: relative;
      padding-bottom: 12px;
      border-bottom: 1px solid #fff;

      & canvas {
        position: absolute;
        top: 0;
      }

      & div {
        display: block;
        position: absolute;
        width: 50px;
        height: 50px;
        font-size: 24px;
        line-height: 50px;
        text-align: center;
      }
    }
  }

  .rgb {
    margin-top: 24px;
    width: 50px;
    & dl {
      margin-top: 12px;
      //   margin-bottom: 12px;
    }

    & dt {
      //   padding-bottom: 12px;
      font-size: 24px;
      text-align: right;
      border-bottom: 1px solid #fff;
    }
  }
}

.color-name {
  font-family: '庞门正道粗书体6.0';
  font-size: 100px;
  font-weight: 500;
  position: absolute;
  left: 164px;
  top: 32px;
}
</style>
