<template v-cloak>
  <h1 v-if="tasks.length === 0" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <form class="card" v-for="(task, index) in tasks" :key="task.id">
      <input type="checkbox" v-model="isChecked">
      <div class="form-control">
        <input
            type="text"
            id="title"
            v-model="task.title"
            @input="setChanged(index, task.title)"
        >
      </div>
      <div class="form-control">
        <input
            type="date"
            id="deadline"
            v-model="task.deadline"
        >
      </div>
      <div class="form-control">
        <input
            type="text"
            id="description"
            v-model.trim="task.description"
        >
      </div>
    </form>

    <div class="d-flex justify-between">
      <button :disabled="!isChanged" class="btn primary">Подтвердить</button>
      <pagination></pagination>
    </div>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import Pagination from "@/components/Pagination";

export default {
  name: 'Home',
  data() {
    return {
      isChecked: false,
      isChanged: false,
      title: '',
      _copyOfTasks: [],
    }
  },
  methods: {
    setChanged(index, value) {
      console.log(this._copyOfTasks)
    },
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
  },
  mounted() {
    this.$store.dispatch('loadTasks')
  },
  components: {Pagination, AppStatus},
}
</script>