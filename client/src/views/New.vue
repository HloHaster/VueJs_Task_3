<template>
  <form class="card" @submit.prevent="submitForm">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input
          type="text"
          id="title"
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

    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>


<script>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
  setup() {
    const title = ref('')
    const date = ref(null)
    const description = ref('')
    const store = useStore()
    const router = useRouter()

    const submitForm = () => {
      const task = {
        title: title.value,
        // todo: in database 20 hours
        date: new Date(date.value).setHours(23, 59, 59),
        description: description.value,
        status: 'active',
      }

      store.dispatch('createNewTask', task)
      router.push('/')
    }

    const isValid = computed(() => title.value !== '' && date.value && description.value !== '')

    return {
      title,
      date,
      description,
      isValid,
      submitForm,
    }
  }
}

</script>