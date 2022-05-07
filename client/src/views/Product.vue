<template>
  <div>
    <v-container class="mb-16">
      <Navbar />
      <v-card
        color="light-blue lighten-5"
        flat
        outlined
        tile
        class="mt-4"
      > 
      <v-subheader class="d-flex justify-space-between">
        <v-card-title class="justify-center hidden-sm-and-down"
          >Product details</v-card-title
        >
        <v-card-title
          class="subtitle-1 font-weight-bold justify-center hidden-md-and-up"
          >Product details</v-card-title
        >
        <v-btn icon class="mr-4 mt-2" to="/cart">        
            <v-icon class="black--text">mdi-cart-outline</v-icon>
            <span class="badge"> {{cartItemCount}} </span>            
        </v-btn>
      </v-subheader>  
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="col-md-6 mb-n16">
            <v-img
              style="display-flex; float:right; border-radius: 10px"
              class="hidden-sm-and-down mt-8"
              :src="`/uploads/${singleProduct.product_image}`"
              width="200"
              height="200"
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
          <v-col cols="12" class="col-md-6 mt-8">
            <v-card-text class="mt-8 ml-16 ml-md-4">
              <strong class="subtitle-1 font-weight-bold">Name:</strong
              >&nbsp;<strong class="subtitle-1">
                {{ singleProduct.product_name }} </strong
              ><br />
              <strong class="subtitle-1 font-weight-bold">Price: &nbsp;</strong
              >&nbsp;<strong class="subtitle-1"
                >N{{ singleProduct.product_price }} </strong
              ><br />
              <strong class="subtitle-1 font-weight-bold"
                >Description: &nbsp;</strong
              >&nbsp;<strong class="subtitle-1"
                >{{ singleProduct.product_description }} </strong
              ><br />
              <strong class="subtitle-1 font-weight-bold"
                >Category: &nbsp;</strong
              >&nbsp;<strong class="subtitle-1"
                >{{ singleProduct.product_category }} </strong
              ><br />
            </v-card-text>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center mt-8 mb-8">
          <v-btn class="primary hidden-sm-and-down" to="/">
            <v-icon small>mdi-arrow-left-circle</v-icon>&nbsp; Back</v-btn
          >
          <v-btn to="/cart" class="primary hidden-sm-and-down"
            ><v-icon small>mdi-basket</v-icon>&nbsp; Go to cart</v-btn
          >
          <v-btn @click="addToCart(singleProduct)" class="success hidden-sm-and-down"
            ><v-icon small>mdi-cart</v-icon>&nbsp; Add to cart</v-btn
          >

          <v-btn small class="primary hidden-md-and-up" to="/">
            <v-icon x-small>mdi-arrow-left-circle</v-icon>&nbsp; Back</v-btn
          >
          <v-btn to="/cart" small class="primary hidden-md-and-up"
            ><v-icon x-small>mdi-basket</v-icon>&nbsp; Go to cart</v-btn
          >
          <v-btn
            @click="addToCart(singleProduct)"
            small
            class="success hidden-md-and-up"
            ><v-icon x-small>mdi-cart</v-icon> Add to cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  name: "Product",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      product: this.product,
    };
  },
  computed: {
    singleProduct() {
      return this.$store.state.singleProduct;
    },
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch("addToCart", {
        product,
        productQuantity: 1,
      });
    },
  },
};
</script>

<style>.badge {
  background-color: #F44336;
  color: white;
  border-radius: 50%;
  padding-left: 3.5px;
  padding-right: 3.5px;
  padding-top: 1.5px;
  padding-bottom: 1.5px;
  margin-top: -25px;
}

</style>
