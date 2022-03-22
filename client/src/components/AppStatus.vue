<template>
  <span class="badge" :class="[className]">{{ statusName }}</span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    }
  },
  data() {
    return {
      classes: {
        active: 'primary',
        cancelled: 'danger',
        done: 'primary',
        pending: 'warning'
      },
      statuses: {
        active: 'Активен',
        cancelled: 'Отменен',
        done: 'Завершен',
        pending: 'Выполняется'
      },
      className: '',
      statusName: '',
    }
  },
  computed: {

  },
  mounted() {
    this.className = this.classes[this.type]
    this.statusName = this.statuses[this.type]
  }
}
</script>