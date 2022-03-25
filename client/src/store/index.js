import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state() {
    return {
      tasks: [],
      numberOfActiveTasks: 0,
      task: {},
    }
  },
  getters: {
    tasks: state => state.tasks,
    task: state => state.task,
    activeTasks: state => state.tasks.filter(task => task.status === 'active'),
    numberOfActiveTasks: (_, getters) => getters.activeTasks.length,
  },
  mutations: {
    setTasks(state, data) {
      state.tasks = data
    },
    setOneTask(state, data) {
      state.task = data
    },
    updateStatusOfTask(state, data) {
      const idx = state.tasks.findIndex(task => task.id === data.id)
      state.tasks[idx] = data
      state.task = data
    },
    updateTask(state, data) {
      const idx = state.tasks.findIndex(task => task.id === data.id)
      state.tasks[idx] = data
      state.task = data
    },
  },
  actions: {
    async createNewTask({commit}, task) {
      if (task.deadline < new Date()) {
        task.status = 'cancelled'
      }
      await axios.post('http://localhost:3000/tasks', task)
      this.state.tasks.push(task)
    },
    async loadTasks({commit}, size, page) {
      const {data} = await axios.get('http://localhost:3000/tasks')
      const res = Object.keys(data).map(key => {
        return {
          ...data[key]
        }
      })
      commit('setTasks', res)
    },
    async findOneTask({commit}, id) {
      const {data} = await axios.get(`http://localhost:3000/tasks/${id}`)
      commit('setOneTask', data[0])
    },
    async removeTask({commit}, id) {
      // todo: подумать, если двое пользователей будет, и изменится массив в ходе работы
      await axios.delete(`http://localhost:3000/tasks/${id}`)
      for (let i = 0; i< this.state.tasks.length; i++) {
        if (this.state.tasks.find(task => task.id === id)) {
          this.state.tasks.splice(i, 1)
          break
        }
      }
    },
    async updateStatusOfTask({commit}, taskToChange) {
      const {data} = await axios.put(`http://localhost:3000/tasks/`, taskToChange)
      commit('updateStatusOfTask', data)
    },
    async updateTask({commit}, taskToUpdate) {
      const {data} = await axios.put(`http://localhost:3000/tasks/`, taskToUpdate)
      commit('updateTask', data)
    }
  },
  modules: {
  }
})
