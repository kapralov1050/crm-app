import Vue from 'vue'
import Vuex from 'vuex'
import persistLocalStorage from '@/store/persistLocalStorage'
import { Client, Deal, RootState } from '@/types/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    clients: JSON.parse(localStorage.getItem('clients') || '[]'),
    deals: JSON.parse(localStorage.getItem('deals') || '[]'),
    searchResults: [],
  },
  getters: {
    filteredDeals: (state) => (status: string) => {
      if (!status) return state.deals
      return state.deals.filter(deal => deal.status === status)
    },
    searchedDeals: (state) => (title: string) => {
      if (!title) return state.deals
      return state.deals.filter(deal => deal.title.toLowerCase().includes(title))
    },
    searchedClients: (state) => (name: string) => {
      return state.clients.filter(client => client.name.toLowerCase().includes(name))
    }
  },
  mutations: {
    addClient(state, client: Client) {
      state.clients.push(client)
    },
    removeClient(state, clientId: string) {
      state.clients = [...state.clients].filter(client => client.id !== clientId)
    },
    addDeal(state, deal: Deal) {
      state.deals.push(deal)
    },
    removeDeal(state, dealId: number) {
      state.deals = [...state.deals].filter(deal => deal.id !== dealId)
    },
    sortByDate(state) {
      state.deals = [...state.deals].sort((a,b) => a.deadline! - b.deadline!)
    },
    sortByAmount(state) {
      state.deals = [...state.deals].sort((a,b) => a.amount! - b.amount!)
    },
  },
  plugins: [persistLocalStorage]
})
