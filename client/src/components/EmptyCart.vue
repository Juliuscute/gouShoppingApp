<template>
  <v-container>
    <Navbar />
        <center>
            <div class="container my-5">
                <v-img src="cart.jpeg" width="200px" class="" ></v-img>
                <div class="mt-4">
                    <h4 class=" fw-600">Your cart is empty</h4>
                    <h5 class="fw-600">You can go to home page to view products</h5>
                </div>
                <div class="mt-4">
                     <v-btn to="/" color="blue" outlined><v-icon small>mdi-home</v-icon>&nbsp; Home</v-btn>
                </div>          
            </div>       
        </center>
      
  </v-container>
</template>

<script>
import Navbar from '@/components/Navbar'
//import Footer from '@/components/Footer'

export default {
name: "EmptyCart",
components: {
    Navbar,
   // Footer
}
}
</script>

<style scoped>
.fw-600 {
    font-weight: 600;
}
.container {
    padding: 0 !important;
    height: 100vh;
}

</style>