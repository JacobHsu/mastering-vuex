<template>
  <div>
    <h3>Create Event, {{ $store.state.user}}</h3>
    <h3>computed: {{ userName}} </h3>
    <h2>Create id, {{ user.id}}</h2>
    <h2>Create name, {{ user.name}}</h2>
  </div>
</template>

<script>
// mapState into Compputed Properters
import { mapState } from 'vuex'

export default {
  // computed: {
  //   userName () {
  //     return this.$store.state.user.name
  //   }
  // }
  computed: mapState({
    userName: state => state.user.name,
    userID: state => state.user.id,
    categories: 'categories', //state => state.user.categories
    user: 'user'
  })
}
</script>

<style scoped>
</style>
