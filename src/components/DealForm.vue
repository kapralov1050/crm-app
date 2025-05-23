<template>
  <el-form 
    :model="dealForm" 
    :rules="rules"
    ref="dealFormRef"
  >
    <el-form-item 
      label="Название" 
      prop="title"
    >
      <el-input 
        v-model="dealForm.title" 
        placeholder="Название сделки"
      />
    </el-form-item>
    <el-form-item 
      label="Клиент"
      prop="client"
    >
      <el-select 
        v-model="dealForm.client" 
        no-data-text="Список клиентов пуст"
        placeholder="Выберите клиента"
      >
        <el-option 
          v-for="client in $store.state.clients" 
          :key="client.id" 
          :label="client.name" 
          :value="client.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item 
      label="Сумма"
      prop="amount"
    >
      <el-input 
        v-model.number="dealForm.amount" 
        placeholder="Сумма" 
      />
    </el-form-item>
    <el-form-item
      label="Статус"
      prop="status"
    >
      <el-select 
        v-model="dealForm.status" 
        placeholder="Выберите статус"
      >
        <el-option 
          v-for="status in statusOptions" 
          :key="status" 
          :label="status" 
          :value="status"
        />
      </el-select>
    </el-form-item>
    <el-form-item 
      label="Дедлайн"
      prop="deadline"
    >
      <el-date-picker
        v-model="dealForm.deadline"
        type="date"
        placeholder="Дедлайн"
        value-format="timestamp"
      />
    </el-form-item>
    <el-button 
      type="primary" 
      @click="handleCreate"
      plain
      circle
      icon="el-icon-check"
    />
    <el-button 
      plain 
      circle
      @click="resetForm"
      icon="el-icon-refresh-left"
    />
  </el-form>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  data() {
    return {
      dealForm: {
        title: '',
        client: '',
        amount: null,
        status: null,
        deadline: null,
      },
      statusOptions: ['новая', 'в работе', 'успешно', 'отменена'],
      rules: {
        title: [{ type: 'string', required: true, message: 'Название обязательно', trigger: 'blur'}],
        client: [{ required: true, message: 'Необходимо выбрать клиента', trigger: 'change'}],
        amount: [{ type: 'number', required: true, message: 'Должно быть числом', trigger: 'blur' }],
        status: [{ required: true, message: 'Укажите статус', trigger: 'change'}],
        deadline: [{ required: true, message: 'Укажите дедлайн', trigger: 'blur'}]
      }
    }
  },
  methods: {
    async handleCreate() {
      try {
        await (this.$refs.dealFormRef as any).validate()
        const deal = {
          id: Date.now(),
          ...this.dealForm
        }
        this.$store.commit('addDeal', deal);
      } catch (error) {
        console.log('Форма не валидна', error)
      }
    },
    resetForm() {
      this.dealForm =  {
        title: '',
        client: '',
        amount: null,
        status: null,
        deadline: null,
      }
    }
  }
})
</script>


<style scoped lang='scss'>
* {
  color: var(--text-color);
}

::v-deep .el-form {
  text-align: left;
}

::v-deep .el-form-item {
  justify-content: flex-start;
  text-align: left;
  width:100%;
}
</style>