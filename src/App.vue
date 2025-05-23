<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #111111;
  --card-bg: #ffffff;
  --border-color: #b6b6b6;
}

.dark {
  --bg-color: #08293f;
  --text-color: #eeeeee;
  --card-bg: #c1d0e2; 
  --border-color: #f3f3f3;
}

.el-button,
.el-input,
.el-card,
.el-form-item,
.el-select-dropdown-item,
.el-dropdown,
.el-menu,
.el-popover,
.el-collapse {
  background-color: transparent !important;
  color: var(--text-color);
}

.el-dialog {
  background-color: var(--card-bg) !important;
}

#app {
  color: var(--text-color);
  background-color: var(--bg-color);
}

html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
