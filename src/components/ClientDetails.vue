<template>
  <el-card class="client-card">
    <h1 slot="header"> Клиент {{ $props.clientDetails.name }}</h1>
    <el-descriptions 
      title="Подробная информация" 
      :column="3" 
      border
    >
      <el-descriptions-item label="Компания" :span="1">
        <div>
          {{ $props.clientDetails.company || '—' }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="Email" :span="1">
        <div>
          {{ $props.clientDetails.email || '—' }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="Телефон" :span="1">
        <div>
          {{ $props.clientDetails.phone || '—' }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="Сделки" :span="1">
        <div>
          <h2>Количество: {{ clientDeals.length }}</h2>
          <p v-for="(deal, index) in clientDeals" :key="deal.id">
            {{ index + 1 }}. {{ deal.title }} : {{ deal.status }}
          </p>
          <p v-if="!clientDeals.length">Нет сделок</p>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="Подробности" :span="2">
        <div>
          {{ $props.clientDetails.note || '—' }}
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
 

<script lang="ts">
import { Client, Deal } from '@/types/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ClientDetails',
  props: {
    clientDetails: {
      type: Object as PropType<Client>,
      required: true,
    }
  },
  computed: {
    clientDeals(): Deal[] {
      return this.$store.state.deals.filter((deal: Deal) => deal.client === this.$props.clientDetails.name)
    }
  }
})
</script>


<style scoped>
.client-card {
  margin: 2rem;
}

/deep/ .el-descriptions__body .el-descriptions__table {
  table-layout: fixed;
}

/deep/ .el-descriptions__body .el-descriptions__table td {
  vertical-align: top;
}
</style>