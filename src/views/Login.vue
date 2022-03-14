<template>
  <div>
      <v-container>
          <Navbar />
      </v-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
    name: 'Login',
    components: {
        Navbar
    }

}
</script>

<style scoped>
.container {
    padding: o !important;
}
</style>