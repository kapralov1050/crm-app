<template>
  <DefaultLayout>
    
  </DefaultLayout>
</template>


<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'

export default {
  name: 'HomePage',
  components: {
    DefaultLayout,
  }

}

</script>


<style>
* {
  margin: 0;
  padding: 0;
}

header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--border-color);
}

</style>