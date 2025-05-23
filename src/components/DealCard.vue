<template>
  <el-card class="card">
    <div class="card__header" slot="header">
      <h1> {{ $props.deal.title }} </h1>
      <el-button @click="handleDelete"> Удалить </el-button>
    </div>
    <div class="card__main">
      <p v-if="$props.deal.client" > Клиент: {{ $props.deal.client }} </p>
      <p v-if="$props.deal.amount" > Сумма: {{ $props.deal.amount }} </p>
      <p v-if="$props.deal.status" >
        Статус: 
        <span :style="{ color: statusColor }">
           {{ $props.deal.status }} 
        </span>
      </p>
      <p 
        v-if="$props.deal.deadline" 
      > 
        Дедлайн: 
        <span :class="{ 'relevant-deal': isRelevant, 'overdue-deal': !isRelevant }">
           {{ formattedDeadline }} 
        </span>
      </p>
    </div>
  </el-card>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment'

export default defineComponent({
  name: 'DealCard',
  props: {
    deal: {
      type: Object,
      required: true
    }
  },
  computed: {
    isRelevant(): boolean {
      return  this.$props.deal.deadline > Date.now()
    },
    formattedDeadline(): string {
      return moment(this.$props.deal.deadline).format('DD-MM-YYYY')
    },
    statusColor(): string {
      switch(this.$props.deal.status) {
        case 'новая':
          return ' rgb(27, 170, 196)';
        case 'в работе':
          return 'rgb(218, 146, 39)';
        case 'успешно':
          return 'green';
        case 'отменена':
          return 'red'
        default:
          return 'black'
      }
    }
  },
  methods: {
    handleDelete() {
      if(this.$props.deal) {
        this.$emit('delete-deal', this.$props.deal?.id)
      }
    }
  },
  emits: ['delete-deal']
})
</script>


<style scoped lang='scss'>
.el-card {
  background-color: var(--card-bg) !important;
  border: none !important;
}

.card {
  width: 400px;
  min-height: 200px;
  height: auto;

  &__header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 1.5rem;
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  &__main:last-child {
    padding-top: 1rem;
  }
}

.relevant-deal {
  color: rgb(0, 109, 128);
}

.overdue-deal {
  color: red;
}

@media (max-width: 1000px) {
  .card {
    width: 300px;
    min-height: 250px;
    background-color: var(--card-bg);

    &__header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      font-size: 1.5rem;
    }

    &__main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    &__main:last-child {
      padding-top: 1rem;
    }
  }

  .details-button {
    visibility: hidden;
  }
}
</style>