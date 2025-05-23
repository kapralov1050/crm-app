<template>
  <DefaultLayout>
    <section class="header">
      <h1 class="header__title"> Сделки </h1>
      <el-button 
        round 
        type="primary" 
        class="header__button"
        @click="isOpen = true"
      > 
        Создать сделку 
      </el-button>
      <el-dialog
        title="Новая сделка"
        label-position="left"
        width="50%"
        :visible.sync="isOpen"
        :append-to-body="true"
      >
        <DealForm />
      </el-dialog>
      <el-input
        v-model="lowerCaseSearch"
        placeholder="поиск по названию"
        prefix-icon="el-icon-search"
        class="header__search"
      >
      </el-input>
      <section class="header__filters">
        <el-dropdown>
          <span>
            Сортировать <i class="el-icon-arrow-down"/>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="sortByDate">
              По дате
            </el-dropdown-item>
            <el-dropdown-item @click.native="sortByAmount">
              По сумме
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span>
            Статус <i class="el-icon-arrow-down"/>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="isFiltered = false">
              <i class="el-icon-document-add"/>
            Все
            </el-dropdown-item>
            <el-dropdown-item @click.native="filterByStatus('новая')">
              <i class="el-icon-document-add"/>
            Новая
            </el-dropdown-item>
            <el-dropdown-item @click.native="filterByStatus('в работе')">
              <i class="el-icon-loading"/>
              В работе
            </el-dropdown-item>
            <el-dropdown-item @click.native="filterByStatus('успешно')">
              <i class="el-icon-document-checked"/>
              Успешно
            </el-dropdown-item>
            <el-dropdown-item @click.native="filterByStatus('отменена')">
              <i class="el-icon-document-delete"/>
              Отменена
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
    </section>
    <section class="deals-list">
      <div v-for="deal in displayedDeals" :key="deal.id">
        <DealCard :deal="deal" type="info" @delete-deal="handleDelete"/>
      </div>
    </section>
  </DefaultLayout>
</template>


<script>
import DealCard from '@/components/DealCard.vue';
import DealForm from '@/components/DealForm.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'Deals',
  components: {
    DefaultLayout,
    DealForm,
    DealCard,
  },
  data() {
    return {
      isOpen: false,
      isFiltered: false,
      selectedStatus: '',
      searchInput: '',
    }
  },
  methods: {
    handleDelete(dealId) {
      this.$store.commit('removeDeal', dealId)
    },
    sortByDate() {
      this.$store.commit('sortByDate')
    },
    sortByAmount() {
      this.$store.commit('sortByAmount')
    },
    filterByStatus(status) {
      this.selectedStatus = status
      this.isFiltered = true
    },
  },
  computed: {
    displayedDeals() {
      let deals = this.$store.state.deals

      if (this.isFiltered) {
        deals = this.$store.getters.filteredDeals(this.selectedStatus)
      }

      if (this.isSearched) {
        deals = this.$store.getters.searchedDeals(this.lowerCaseSearch)
      }

      if (this.isFiltered && this.isSearched) {
        deals = this.$store.getters.filteredDeals(this.selectedStatus)
        .filter(deal => deal.name.includes(this.lowerCaseSearch))
      }

      return deals
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

  &__filters {
    display: flex;
    gap: 2rem;
  }
}

.deal-list {
  display: flex;
  justify-items: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

@media (max-width: 700px) {
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

  .deal-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem;

    &__item {
      width: 100%;
    }
  }
}
</style>