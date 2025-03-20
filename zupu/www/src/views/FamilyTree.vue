<template>
  <div class="family-tree">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>族谱树</h2>
          <el-button type="primary" @click="showAddMemberDialog">添加成员</el-button>
        </div>
      </template>
      <div class="tree-container">
        <!-- 族谱树将在这里展示 -->
        <el-empty v-if="!treeData.length" description="暂无族谱数据"></el-empty>
      </div>
    </el-card>

    <!-- 添加成员对话框 -->
    <el-dialog v-model="dialogVisible" title="添加成员" width="500px">
      <el-form :model="memberForm" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="memberForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="memberForm.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="memberForm.birthDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="父亲">
          <el-select v-model="memberForm.fatherId" placeholder="选择父亲">
            <el-option v-for="member in maleMembers" :key="member.id" :label="member.name" :value="member.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="母亲">
          <el-select v-model="memberForm.motherId" placeholder="选择母亲">
            <el-option v-for="member in femaleMembers" :key="member.id" :label="member.name" :value="member.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitMemberForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const treeData = ref([])
const dialogVisible = ref(false)
const maleMembers = ref([])
const femaleMembers = ref([])

const memberForm = ref({
  name: '',
  gender: 'male',
  birthDate: '',
  fatherId: '',
  motherId: ''
})

// 获取族谱数据
const fetchTreeData = async () => {
  try {
    const response = await axios.get('/api/family-tree')
    treeData.value = response.data
  } catch (error) {
    console.error('获取族谱数据失败:', error)
  }
}

// 获取成员列表
const fetchMembers = async () => {
  try {
    const response = await axios.get('/api/members')
    maleMembers.value = response.data.filter(member => member.gender === 'male')
    femaleMembers.value = response.data.filter(member => member.gender === 'female')
  } catch (error) {
    console.error('获取成员列表失败:', error)
  }
}

const showAddMemberDialog = () => {
  dialogVisible.value = true
  fetchMembers()
}

const submitMemberForm = async () => {
  try {
    await axios.post('/api/members', memberForm.value)
    dialogVisible.value = false
    fetchTreeData()
  } catch (error) {
    console.error('添加成员失败:', error)
  }
}

onMounted(() => {
  fetchTreeData()
})
</script>

<style scoped>
.family-tree {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tree-container {
  min-height: 400px;
  padding: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>