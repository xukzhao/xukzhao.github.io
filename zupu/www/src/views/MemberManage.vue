<template>
  <div class="member-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>成员管理</h2>
          <el-button type="primary" @click="showAddDialog">添加成员</el-button>
        </div>
      </template>

      <el-table :data="members" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80">
          <template #default="{ row }">
            {{ row.gender === 'male' ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column prop="birthDate" label="出生日期" width="120">
          <template #default="{ row }">
            {{ formatDate(row.birthDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="father" label="父亲" width="120"></el-table-column>
        <el-table-column prop="mother" label="母亲" width="120"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="showEditDialog(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑成员对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑成员' : '添加成员'"
      width="500px"
    >
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
          <el-date-picker
            v-model="memberForm.birthDate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="父亲">
          <el-select v-model="memberForm.fatherId" placeholder="选择父亲">
            <el-option
              v-for="member in maleMembers"
              :key="member.id"
              :label="member.name"
              :value="member.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="母亲">
          <el-select v-model="memberForm.motherId" placeholder="选择母亲">
            <el-option
              v-for="member in femaleMembers"
              :key="member.id"
              :label="member.name"
              :value="member.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const members = ref([])
const maleMembers = ref([])
const femaleMembers = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)

const memberForm = ref({
  id: '',
  name: '',
  gender: 'male',
  birthDate: '',
  fatherId: '',
  motherId: ''
})

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

// 获取成员列表
const fetchMembers = async () => {
  try {
    const response = await axios.get('/api/members')
    members.value = response.data
    maleMembers.value = response.data.filter(member => member.gender === 'male')
    femaleMembers.value = response.data.filter(member => member.gender === 'female')
  } catch (error) {
    console.error('获取成员列表失败:', error)
  }
}

// 显示添加对话框
const showAddDialog = () => {
  isEdit.value = false
  memberForm.value = {
    name: '',
    gender: 'male',
    birthDate: '',
    fatherId: '',
    motherId: ''
  }
  dialogVisible.value = true
}

// 显示编辑对话框
const showEditDialog = (row) => {
  isEdit.value = true
  memberForm.value = { ...row }
  dialogVisible.value = true
}

// 提交表单
const submitForm = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`/api/members/${memberForm.value.id}`, memberForm.value)
      ElMessage.success('编辑成功')
    } else {
      await axios.post('/api/members', memberForm.value)
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
    fetchMembers()
  } catch (error) {
    console.error('操作失败:', error)
    ElMessage.error('操作失败')
  }
}

// 删除成员
const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该成员吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await axios.delete(`/api/members/${row.id}`)
      ElMessage.success('删除成功')
      fetchMembers()
    } catch (error) {
      console.error('删除失败:', error)
      ElMessage.error('删除失败')
    }
  })
}

onMounted(() => {
  fetchMembers()
})
</script>

<style scoped>
.member-manage {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>