<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.name }}</p>
    <p>there are {{ catLength }} categories</p>
    <p>{{ getEventById(2) }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// we can name our mapState, or not
export default {
  computed: {
    localComputed() {
      return something
    },
    ...mapGetters(['getEventById', 'catLength']),
    ...mapState(['user', 'categories'])
  }
}
</script>

<style scoped>
</style>
