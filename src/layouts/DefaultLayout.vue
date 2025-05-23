<template>
  <div class="container">
    <article class="sidebar">
      <el-button plain class="sidebar__button el-icon-more" @click="isCollapse = !isCollapse" />
      <el-menu :collapse="isCollapse" router>
        <el-menu-item index="/clients">
          <i class="el-icon-user-solid" />
          <span slot="title"> Клиенты </span>
        </el-menu-item>
        <el-menu-item index="/deals">
          <i class="el-icon-s-goods" />
          <span slot="title"> Сделки </span>
        </el-menu-item>
      </el-menu>
    </article>
    <article class="main">
      <Header />
      <slot></slot>
    </article>
  </div>
</template>


<script>
import Header from '@/components/Header.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Header
  },
  data() {
    return {
      isCollapse: true
    };
  },
}
</script>


<style>
.el-button {
  color: var(--text-color) !important;
}

.container {
  display: flex;
  box-sizing: border-box;
}

.sidebar{
  min-height: 100vh;
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-color);
}

.sidebar .el-button, .el-menu {
  border: none !important;
}

.main {
  width: 100%;
}
</style>