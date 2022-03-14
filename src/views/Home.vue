<template>
   <v-app>
       <Navbar />
       <Dashboard />
       <Footer />
   </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Dashboard from '@/components/Dashboard'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: { 
     Navbar, 
     Dashboard,
     Footer
     },

  data: () => ({
    //
  }),
};
</script>
