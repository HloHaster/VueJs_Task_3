<template v-cloak>
  <h1 v-if="tasks.length === 0" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <div class="information-block">
      <h3 class="text-white">Всего активных задач: {{ numberOfActiveTasks }}</h3>
      <button class="btn primary"  @click="showActiveTasks">Показать только активные задачи</button>
    </div>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.date).toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="open(task._id)">Посмотреть</button>
      <button class="btn danger" @click="remove(task._id)">Удалить</button>
    </div>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import router from "@/router";

export default {
  name: 'Home',
  data() {
    return {
      sortByTitle: false,
    }
  },
  methods: {
    open: id => router.push({path:`/task/${id}`}),
    remove: id => this.$store.dispatch('removeTask', id),
    showActiveTasks() {
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    numberOfActiveTasks() {
      return this.$store.getters.numberOfActiveTasks;
    },
    activeTasks() {
      return this.$store.getters.activeTasks;
    }
  },
  // todo: сперва отображается "Задач пока нет"
  mounted() {
    this.$store.dispatch('loadTasks')
  },
  components: {AppStatus},
}
</script>
