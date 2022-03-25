<template>
  <div class="d-flex justify-end">
    <button class="btn">Previous</button>
    <button class="btn">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    pageNumber: {
      type: Number,
    }
  },
  data(){

  },
  methods: {
    nextPage: () => this.pageNumber++,
    prevPage: () => this.pageNumber--,
  }
}
</script>

<style scoped>

</style>