<template>
  <header>
    <h1>
      Трекер 
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  gap: 2rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--border-color);
}
</style>