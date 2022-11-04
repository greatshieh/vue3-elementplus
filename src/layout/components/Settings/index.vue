<template>
  <div class="drawer-container">
    <div>
      <!-- <div class="drawer-item"> -->
      <!-- <span>Theme Color</span> -->
      <!-- <theme-picker -->
      <!-- style="float: right; height: 26px; margin: -3px 8px 0 0" -->
      <!-- @change="themeChange" -->
      <!-- /> -->
      <!-- </div> -->
      <div class="drawer-item">
        <span>侧边栏触发器位置</span>
        <el-radio-group v-model="triggerPosition">
          <el-radio-button label="bottom">侧边栏</el-radio-button>
          <el-radio-button label="navbar">导航栏</el-radio-button>
        </el-radio-group>
      </div>

      <div class="drawer-item">
        <span>开启 Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>侧边栏 Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script setup name="Settings">
// import ThemePicker from '@/components/ThemePicker'

import { useSettingStore } from '@/store'
import { computed } from 'vue'
const settingStore = useSettingStore()

const triggerPosition = computed({
  get() {
    return settingStore.triggerPosition
  },
  set(val) {
    settingStore.changeSetting({
      key: 'triggerPosition',
      value: val
    })
  }
})

const fixedHeader = computed({
  get() {
    return settingStore.fixedHeader
  },
  set(val) {
    settingStore.changeSetting({
      key: 'fixedHeader',
      value: val
    })
  }
})

const tagsView = computed({
  get() {
    return settingStore.tagsView
  },
  set(val) {
    settingStore.changeSetting({
      key: 'tagsView',
      value: val
    })
  }
})

const sidebarLogo = computed({
  get() {
    return settingStore.sidebarLogo
  },
  set(val) {
    settingStore.changeSetting({
      key: 'sidebarLogo',
      value: val
    })
  }
})

// function themeChange(val) {
//   store.dispatch('settings/changeSetting', {
//     key: 'theme',
//     value: val
//   })
// }
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
    line-height: 32px;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
