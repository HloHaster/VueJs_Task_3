<template v-cloak>
  <h1 v-if="tasks.length === 0" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <div class="information-block">
      <h3 class="text-white">Всего активных задач: {{ numberOfActiveTasks }}</h3>
    </div>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.deadline).toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="open(task.id)">Посмотреть</button>
      <button class="btn danger" @click="remove(task.id)">Удалить</button>
    </div>
    <pagination></pagination>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import router from "@/router";
import {useStore} from 'vuex'
import Pagination from "@/components/Pagination";

export default {
  name: 'Home',
  // todo: remove setup
  setup() {
    const store = useStore()

    const remove = (id) => {store.dispatch('removeTask', id)}

    return {
      remove
    }
  },
  data() {
    return {
      size: 0,
      pageNumber: 0,
    }
  },
  methods: {
    open: id => router.push({path:`/task/${id}`}),
    // remove: id => this.$store.dispatch('removeTask', id),
    windowWidth() {
      if (document.documentElement.clientWidth > 960) {
        this.size = 10
      } else {
        this.size = 5
      }
    },
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
    },
    pageCount(){
      let l = this.tasks.length,
          s = this.size;
      return Math.ceil(l/s);
    },
  },
  // todo: сперва отображается "Задач пока нет"
  mounted() {
    // this.$store.dispatch('loadTasks', this.size)
    this.$store.dispatch('loadTasks')
  },
  created() {
    // window.addEventListener('resize', this.windowWidth);
    // this.windowWidth()
  },
  components: {Pagination, AppStatus},
}
</script>
