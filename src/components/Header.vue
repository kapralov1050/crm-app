<template>
  <header>
    <h1>
      CRM сделки
    </h1>
    <el-button plain circle :icon="isDark ? 'el-icon-moon' : 'el-icon-sunny'" @click="toggleTheme"/>
  </header>
</template>


<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      isDark: false,
    }
  },
  methods: {
    toggleTheme() {
      document.body.classList.toggle('dark')
      this.isDark = !this.isDark
    }
  }
})
</script>


<style scoped lang='scss'>
header {
  min-height: 4rem;
}
</style>