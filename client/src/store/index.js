import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state() {
    return {
      tasks: [],
      numberOfActiveTasks: 0,
    }
  },
  getters: {
    tasks: state => state.tasks,
    // numberOfActiveTasks: state => state.tasks.filter(task => task.status === 'active').length,
    activeTasks: state => state.tasks.filter(task => task.status === 'active'),
    numberOfActiveTasks: (_, getters) => getters.activeTasks.length,
  },
  mutations: {
    setTasks(state, data) {
      state.tasks = data
    },
  },
  actions: {
    async createNewTask({commit}, task) {
      if (task.date < new Date()) {
        task.status = 'cancelled'
      }
      await axios.post('http://localhost:3000/tasks', task)
      this.state.tasks.push(task)
    },
    async loadTasks({commit}) {
      const {data} = await axios.get('http://localhost:3000/tasks')
      const res = Object.keys(data).map(key => {
        return {
          ...data[key]
        }
      })
      commit('setTasks', res)
    },
    async findOneTask({commit}, id) {
      return await axios.get(`http://localhost:3000/tasks/${id}`)
    },
    async removeTask({commit}, id) {
      console.log('hi')
      // const res = await axios.delete(`http://localhost:3000/tasks/${id}`)
      // console.log(res)
      // this.state.tasks.delete(res)
    },
  },
  modules: {
  }
})
