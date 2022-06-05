<template>
  <div>
    <v-container class="mb-16">
      <Navbar />
      <v-card
        color="light-blue lighten-5"
        flat
        outlined
        tile
        class="mt-4 mx-4"
      > 
      <v-subheader class="d-flex justify-space-around">
        <v-card-title class="justify-center hidden-sm-and-down"
          >Product details</v-card-title
        >
        <v-card-title
          class="subtitle-1 font-weight-bold justify-center hidden-md-and-up"
          >Product details</v-card-title
        >
      </v-subheader>  
        <v-divider />
        <v-row>
          <v-col cols="12" class="col-md-6 mb-n16">
            <v-img
              style="display-flex; float:right; border-radius: 10px"
              class="hidden-sm-and-down mt-8"
              :src="`/uploads/${singleProduct.product_image}`"
              width="180"
              height="180"
              contain
            >
            </v-img>
            <!-- view for small screen-->
            <center>
              <v-img
                class="hidden-md-and-up justify-center mt-8"
                :src="`/uploads/${singleProduct.product_image}`"
                width="200"
                height="200"
                contain
              >
              </v-img>
            </center>
          </v-col>
          <v-col cols="12" class="col-md-6 mt-2">
            <v-card-text class="mt-2 ml-16 ml-md-4">
              <v-chip
                  color="blue"
                  class="mb-4 my-8 mt-md-0"
                  label
                  text-color="white">
                  Product info.
              </v-chip><br />
              <strong class="subtitle-1 font-weight-medium">Name:</strong
              >&nbsp;<strong class="subtitle-1">
                {{ singleProduct.product_name }} </strong
              ><br />
              <strong class="subtitle-1 font-weight-medium">Price: &nbsp;</strong
              >&nbsp;<strong class="subtitle-1"
                >N{{ singleProduct.product_price }} </strong
              ><br />
              <strong class="subtitle-1 font-weight-medium"
                >Description: &nbsp;</strong
              >&nbsp;<strong class="subtitle-1"
                >{{ singleProduct.product_description }} </strong
              ><br />
              <strong class="subtitle-1 font-weight-medium"
                >Category: &nbsp;</strong
              >&nbsp;<strong class="subtitle-1"
                >{{ singleProduct.product_category }} </strong
              ><br />
              <strong class="subtitle-1 font-weight-medium"
                >Posted on: &nbsp;</strong
              >&nbsp;<strong class="subtitle-1 mb-4"
                >{{ singleProduct.date }} </strong
              ><br /><v-divider class="mb-4" />
                <v-chip
                  class="mb-4"
                  color="blue"
                  label
                  text-color="white">
                  Owner's info
                </v-chip><br />
                <strong class="subtitle-1 font-weight-medium"
                ><v-icon small class="blue--text">mdi-account</v-icon> &nbsp;</strong
              >&nbsp;<strong class="subtitle-1"
                >{{ singleProduct.user }} </strong
              ><br />
              <strong class="subtitle-1 font-weight-medium"
                ><v-icon small class="blue--text">mdi-phone</v-icon>: &nbsp;</strong
              >&nbsp;<strong class="subtitle-1"
                >{{ singleProduct.phone }} </strong
              ><br />
              <strong class="subtitle-1 font-weight-medium"
                ><v-icon small class="blue--text">mdi-map-marker</v-icon>: &nbsp;</strong
              >&nbsp;<strong class="subtitle-1"
                >{{ singleProduct.location }} </strong
              ><br />
    
            </v-card-text>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center mt-8 mb-8">
          <v-btn class="primary hidden-sm-and-down" to="/studentMarketPlace">
            <v-icon small>mdi-arrow-left-circle</v-icon>&nbsp; Back</v-btn>

          <v-btn small class="primary hidden-md-and-up" to="/studentMarketPlace">
            <v-icon x-small>mdi-arrow-left-circle</v-icon>&nbsp; Back</v-btn>
            <v-btn @click="deleteProduct(singleProduct)" v-if="currentUser == singleProduct.user || currentUser.role == 'Admin'" dark class="red hidden-sm-and-down">
            <v-icon small>mdi-delete</v-icon>&nbsp; Delete product</v-btn>
            <v-btn @click="deleteProduct(singleProduct)" v-if="currentUser == singleProduct.user || currentUser.role == 'Admin'" small dark class="red hidden-md-and-up">
            <v-icon x-small>mdi-delete</v-icon>&nbsp; Delete product</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
export default {
  name: "Product",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      currentUser: "",
      product_id: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  created() {
    this.currentUser = this.$store.getters.getUser.firstName;
    this.product_id = this.$store.state.singleProduct.id
  },
  computed: {
    singleProduct() {
      return this.$store.state.singleProduct;
    },
 
  },
  methods: {
    async deleteProduct() {
      try { 
        let response = await axios.get("http://localhost:5000/api/deleteStudentProduct", {
          product_id: this.product_id
        })
        this.successMessage = response.data.msg;
        window.localStorage.removeItem("singleProduct")
      } catch(error) {
        console.log(error)
        this.errorMessage = error.response.data.msg;
      }
    }
  },
};
</script>

<style scoped>

</style>
