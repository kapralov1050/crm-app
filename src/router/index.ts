import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ClientList from "../views/ClientList.vue"
import Homepage from "../views/HomePage.vue"
import Deals from '../views/Deals.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage
  },
  {
    path: '/clients',
    name: 'clients',
    component: ClientList
  },
  {
    path: '/deals',
    name: 'deals',
    component: Deals,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
