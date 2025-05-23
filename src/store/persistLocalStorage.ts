import { Store } from "vuex";

export default function persistLocalStorage(store: Store<any>) {
  store.subscribe((mutation, state) => {
    localStorage.setItem('clients', JSON.stringify(state.clients))
    localStorage.setItem('deals', JSON.stringify(state.deals))
  });
}