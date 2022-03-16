<template>
  <v-container>
      <Navbar />
      <h4>Welcome to your checkout page {{firstName}} </h4>
  </v-container>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
    components: {
        Navbar
    },
    data() {
        return {
            firstName: ''
        }
    },
    async created() {
        if(!this.$store.getters.isLoggedIn) {
            this.$router.push('/login');
        }

        this.firstName = this.$store.getters.getUser.firstName
    }

}
</script>

<style>

</style>