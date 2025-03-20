<template>
  <div class="home">
    <el-row justify="center">
      <el-col :span="16">
        <el-card class="welcome-card">
          <template #header>
            <h2>欢迎使用家族族谱系统</h2>
          </template>
          <div class="feature-list">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card class="feature-card" @click="$router.push('/family-tree')">
                  <el-icon size="32"><Connection /></el-icon>
                  <h3>族谱树</h3>
                  <p>以树形结构展示家族成员关系，直观查看家族血缘关系。</p>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="feature-card" @click="$router.push('/member-manage')">
                  <el-icon size="32"><User /></el-icon>
                  <h3>成员管理</h3>
                  <p>管理家族成员信息，添加、编辑和维护成员资料。</p>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Connection, User } from '@element-plus/icons-vue'
</script>

<style scoped>
.home {
  padding: 20px;
}

.welcome-card {
  margin-bottom: 20px;
}

.welcome-card :deep(.el-card__header) {
  text-align: center;
}

.feature-card {
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 20px;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.feature-card .el-icon {
  margin: 10px 0;
  color: #409EFF;
}

.feature-card h3 {
  margin: 10px 0;
  color: #303133;
}

.feature-card p {
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}
</style>