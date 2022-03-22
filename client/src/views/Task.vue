<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>:
      <AppStatus :type="task.status"/>
    </p>
    <p><strong>Дэдлайн</strong>:{{ task.date }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="setStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="setStatus('done')">Завершить</button>
      <button class="btn danger" @click="setStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong> {{ id }} </strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
export default {
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  methods: {
    setStatus() {
    }
  },
  computed: {
    task() {
      return this.$store.dispatch('findOneTask', this.id);
    }
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>