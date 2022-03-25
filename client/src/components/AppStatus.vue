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
  watch(props, val) {
    this.className.value = this.classes[val.type]
    this.statusName.value = this.statuses[val.type]
  },
  mounted() {
    this.className = this.classes[this.type]
    this.statusName = this.statuses[this.type]
  }
}
</script>