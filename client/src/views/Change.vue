<template>
  <form class="card" @submit.prevent="changeTask">
    <h1>Редактировать задачу</h1>
    <p><strong>Название</strong>: {{ task.title }}</p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.deadline).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>

    <div class="form-control">
      <label for="title">Название</label>
      <input
          type="text"
          id="title"
          :placeholder=this.task.title
          v-model.trim="title"
      >
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input
          type="date"
          id="date"
          v-model="date"
      >
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea
          id="description"
          v-model.trim="description"
      ></textarea>
    </div>

    <button class="btn primary">Редактировать</button>
  </form>
</template>

<script>

import router from "@/router";

export default {
  data() {
    return {
      title: '',
      date: '',
      description: '',
      id: this.$route.params.id,
    }
  },
  methods: {
    changeTask() {
      if (this.title === '') {
        this.title = this.task.title
      }
      if (this.date === '') {
        this.date = new Date(this.task.deadline).toISOString().split('T')[0]
      }
      if (this.description === '') {
        this.description = this.task.description
      }
      const taskToUpdate = {
        id: this.task.id,
        title: this.title,
        // todo: add time
        deadline: new Date(this.date),
        description: this.description,
        status: this.task.status,
      }
      this.$store.dispatch('updateTask', taskToUpdate)
      router.push({path:`/task/${this.task.id}`})
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
}

</script>