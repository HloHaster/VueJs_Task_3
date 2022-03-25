<template>
  <div v-if="task">
    <div class="card">
      <h2>{{ task.title }}</h2>
      <p><strong>Статус</strong>: {{ task.status }}
        <AppStatus :type="task.status"/>
      </p>
      <p><strong>Дэдлайн</strong>: {{ new Date(task.deadline).toLocaleDateString() }}</p>
      <p><strong>Описание</strong>: {{ task.description }}</p>
      <div>
        <button class="btn" @click="setStatus('pending')">Взять в работу</button>
        <button class="btn primary" @click="setStatus('done')">Завершить</button>
        <button class="btn danger" @click="setStatus('cancelled')">Отменить</button>
      </div>
    </div>
    <div class="text-end">
      <router-link :to="{path:`/change/${id}`}" class="btn primary" @click="">Редактировать задачу</router-link>
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
    setStatus(status) {
      const taskToChange = {...this.task, status}
      this.$store.dispatch('updateStatusOfTask', taskToChange)
    }
  },
  computed: {
    task() {
      return this.$store.getters.task;
    },
  },
  mounted() {
    this.$store.dispatch('findOneTask', this.id);
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>