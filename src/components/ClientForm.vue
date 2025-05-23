<template>
  <el-form :model="clientForm" :rules="rules" ref="clientFormRef">
    <el-form-item label="Имя" prop="name">
      <el-input v-model="clientForm.name" placeholder="Имя клиента"/>
    </el-form-item>
    <el-form-item label="Компания">
      <el-input v-model="clientForm.company" placeholder="Компания"/>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="clientForm.email" placeholder="Email" />
    </el-form-item>
    <el-form-item label="Телефон" prop="phone">
      <el-input v-model.number="clientForm.phone" placeholder="Телефон"/>
    </el-form-item>
    <el-form-item label="Заметка">
      <el-input type="textarea" v-model="clientForm.note" placeholder="Заметка"/>
    </el-form-item>
    <el-button type="primary" @click="handleCreate">
      Добавить 
    </el-button>
    <el-button plain @click="resetForm">
      Очистить
    </el-button>
  </el-form>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent ({
  data() {
    return {
      clientForm: {
        name: '',
        company: '',
        email: '',
        phone: null,
        note: '',
      },
      rules: {
        name: [
          { required: true, message: 'Имя обязательно', trigger: 'blur'}
        ],
        email: [
          { type: 'email', message: 'Введите корректный email', trigger: ['blur', 'change'] }
        ],
        phone: [
          { type: 'number', message: 'допустимы цифры', trigger: ['blur', 'change']}
        ]
      }
    }
  },
  methods: {
    async handleCreate() {
      try {
        const isValid = await this.$refs.clientFormRef.validate()
        const client = {
          id: Date.now().toString(),
          ...this.clientForm
        }
        this.$store.commit('addClient', client);
      } catch (error) {
        console.log('Форма не валидна', error)
      }
    },
    resetForm() {
      this.clientForm =  {
        name: '',
        company: '',
        email: '',
        phone: '',
        note: '',
      }
    }
  }
})
</script>


<style scoped lang='scss'>
* {
  background-color: var(--card-bg);
}
</style>