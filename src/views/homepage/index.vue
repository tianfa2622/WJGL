<template>
  <div>
    <UserIndex v-if="$store.state.code == 2"></UserIndex>
    <AdminIndex v-else></AdminIndex>
  </div>
</template>

<script>
import UserIndex from './components/userIndex'
import AdminIndex from './components/adminIndex'
export default {
  components: {
    UserIndex,
    AdminIndex
  },
  data () {
    return {}
  }
}
</script>

<style scoped></style>
