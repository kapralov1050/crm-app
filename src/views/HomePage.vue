<template>
  <DefaultLayout>
    <div class="welcome">
      <h1>Добро пожаловать в CRM-систему!</h1>
      <p> Это приложение поможет вам эффективно управлять клиентами и сделками. </p>
      <p>
      📌 Как начать работу:
      Добавьте новых клиентов с помощью формы.
      Создайте сделки, выбрав нужного клиента, статус и дедлайн.
      Следите за статусами и просрочками прямо на экране.
      </p>
      <p>
        👉 Используйте кнопки в сайдбаре слева,
        чтобы переключаться между разделами «Клиенты» и «Сделки».
      </p>
      <p>
        Удачной работы!
      </p>
    </div>
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
.welcome {
  padding: 0 2rem;
  text-align: justify;
}
</style>