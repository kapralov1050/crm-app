<template>
  <DefaultLayout>
    <article>
      <section class="header">
        <h1 class="header__title"> Клиенты </h1>
        <el-button 
          round 
          type="primary"
          @click="isOpen = true"
        > 
          Добавить пользователя 
        </el-button>
        <el-dialog
          :visible.sync="isOpen"
          width="50%"
          :append-to-body="true"
        >
          <ClientForm />
        </el-dialog>
        <el-input 
          prefix-icon="el-icon-search" 
          class="header__search"
          placeholder="поиск по имени"
          v-model="lowerCaseSearch"
        />
      </section>
      <section class="client-list">
        <div v-for="client in displayedClients" class="client-list__item">
          <ClientCard :client="client" type="info" @delete-client="handleDelete"/>
        </div>
      </section>
    </article>
  </DefaultLayout>
</template>


<script>
import ClientCard from '@/components/ClientCard.vue';
import ClientForm from '@/components/ClientForm.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ClientList',
  components: {
    ClientForm,
    ClientCard,
    DefaultLayout,
  },
  data () {
    return {
      isOpen: false,
      searchInput: '',
    }
  },
  methods: {
    handleDelete(clientId) {
      this.$store.commit('removeClient', clientId)
    }
  },
  computed: {
    displayedClients() {
      return this.isSearched
      ? this.$store.getters.searchedClients(this.lowerCaseSearch)
      : this.$store.state.clients
    },
    isSearched() {
      return this.searchInput.length > 0
    },
    lowerCaseSearch: {
      get() {
        return this.searchInput.toLowerCase()
      },
      set(value) {
        this.searchInput = value.toLowerCase()
      }
    }
  }
})
</script>


<style scoped lang='scss'>
.header {
  box-sizing: border-box;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);

  &__title{
    font-size: 2rem;
    color: rgb(50, 122, 216);
  }

  &__search {
    width: 400px;
  }
}

.client-list {
  display: flex;
  justify-items: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

@media (max-width: 1000px) {
  .header {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem 0 1rem 1rem;
    gap: 1rem;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-color);

    &__title {
      font-size: 2rem;
      color: rgb(50, 122, 216);
    }

    &__search {
      width: 70%;
    }
  }

  .client-list {
    display: grid;
    grid-template-columns: repeat(auto);
    gap: 1rem;
    padding: 1rem;

    &__item {
      width: 100%;
    }
  }
}
</style>