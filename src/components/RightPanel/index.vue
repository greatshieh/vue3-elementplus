<template>
  <el-drawer v-model="drawerVisible" :title="drawerTitle" :size="drawerWidth">
    <div class="rightPanel-items">
      <slot></slot>
    </div>
  </el-drawer>
</template>

<script setup name="RightPanel">
import { toRef } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  buttonTop: {
    default: 250,
    type: Number
  },
  drawerWidth: {
    default: 260,
    type: Number
  },
  drawerTitle: {
    default: '全局配置',
    type: String
  }
})

const drawerVisible = toRef(props, 'modelValue')
const drawerWidth = toRef(props, 'drawerWidth')
const drawerTitle = toRef(props, 'drawerTitle')
</script>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  position: fixed;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 2000;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  background-color: #1890ff;
  line-height: 48px;
  transition: right 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
