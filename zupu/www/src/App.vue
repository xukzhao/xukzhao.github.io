<template>
  <el-container class="app-container">
    <el-header>
      <el-menu mode="horizontal" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/family-tree">族谱树</el-menu-item>
        <el-menu-item index="/member-manage">成员管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup>
</script>

<style>
.app-container {
  height: 100vh;
}

.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}

.el-main {
  padding: 20px;
}
</style>