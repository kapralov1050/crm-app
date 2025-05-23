<template>
  <el-card class="card">
    <div class="card__header" slot="header">
      <h1> {{ $props.client.name }} </h1>
      <div>
        <el-button class='details-button' circle icon="el-icon-more" @click="isOpen = true"/>
        <el-button circle icon="el-icon-delete" @click="handleDelete"/>
      </div>
      <el-dialog
        :visible.sync="isOpen"
        width="70%"
        :append-to-body="true"
      >
        <ClientDetails :clientDetails="$props.client"/>
      </el-dialog>
    </div>
    <div class="card__main">
      <p v-if="$props.client.company" > Компания: {{ $props.client.company }} </p>
      <p v-if="$props.client.email" > Email: {{ $props.client.email }} </p>
      <p v-if="$props.client.phone" > Телефон: {{ $props.client.phone }} </p>
      <details>
        <summary> 
          Подробнее
        </summary>
        <p> {{ client.note }} </p>
      </details>
    </div>
  </el-card>
</template>


<script lang="ts">
import { Client } from '@/types/types';
import { defineComponent, PropType } from 'vue';
import ClientDetails from '@/components/ClientDetails.vue';

export default defineComponent ({
  name: 'ClientCard',
  components: {
    ClientDetails
  },
  props: {
    client: {
      type: Object as PropType<Client>,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    handleDelete() {
      if(this.$props.client) {
        this.$emit('delete-client', this.client.id)
      }
    }
  },
  emits: ['delete-client']
})
</script>


<style scoped lang='scss'>
.el-card {
  background-color: var(--card-bg) !important;
  border: none !important;
}

.card {
  width: 31rem;
  min-height: 250px;
  background-color: var(--card-bg);

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

details {
  text-align: justify;
}

summary::marker {
  color: rgb(221, 58, 17);
}

@media (max-width: 700px) {
  .card {
    width: 100%;
    min-height: 250px;
    background-color: var(--card-bg);

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

  .details-button {
    visibility: hidden;
  }
}
</style>