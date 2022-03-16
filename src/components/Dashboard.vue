<template>
  <v-container fluid>
    <v-card
      color="#0D47A1"
      height="150px"
      tile
      flat
      dark
      class="d-flex align-center justify-center"
      
    >
      <v-row>
        <v-col cols="9" class="col-md-11">
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-4"
            flat
            hide-no-data
            hide-details
            prepend-icon="mdi-magnify"
            label="Search for product..."
            solo-inverted
          ></v-autocomplete>
        </v-col>

        <v-col cols="3" class="col-md-1">
          <v-btn to="/checkout">checkout</v-btn>
          <v-btn icon to="/cart">        
            <v-icon class="white--text">mdi-cart-outline</v-icon>
            <span class="badge"> {{cartItemCount}} </span>            
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-card tile class="mb-8 mt-n8" color="white">
      <v-row class="card1">
        <v-col cols="12" md="3" sm="6" v-for="product in products " :key="product.productId">
          <v-hover v-slot:default="{ hover }">
            <v-card height="350" width="310" align="center" flat outlined tile class="ml-4 mr-8" >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" small dark>new</v-btn>
              </v-card-actions>
              <v-img
                :src="`/uploads/${product.product_image}`"
                width="200"
                height="200"
                contain
              ></v-img>
              <v-divider></v-divider>
              <v-card-text class="mt-n2">
                <strong :class="hover ? 'red--text' : 'black--text'">
                  {{product.product_name}}
                </strong>
              </v-card-text>
              <v-card-text class="mt-n12">
                <v-card-subtitle :class="hover ? 'red--text' : 'black--text'">
                  N{{product.product_price}}.00
                </v-card-subtitle>
              </v-card-text>
              <v-card-actions class="justify-center mt-n8 hidden-md-and-up">
               <v-btn rounded small color="success" outlined @click="addToCart(product)">
                    <v-icon small color="success">mdi-cart-outline</v-icon>
                    Add to cart
                </v-btn>
                <v-btn @click="viewProduct(product)" color="success" outlined rounded small>
                    <v-icon small color="success">mdi-eye-outline</v-icon>
                    <strong> view product </strong>
                </v-btn>
              </v-card-actions> 
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="
                    d-flex
                    transition-fast-in-fast-out
                    blue
                    v-card--reveal
                    display-3
                    white--text
                  "
                  style="height: 100%"
                >
                  <v-btn rounded small color="white" @click="addToCart(product)">
                    <v-icon small color="black">mdi-cart-outline</v-icon>
                    <strong> Add to cart </strong>
                  </v-btn>&nbsp;
                  <v-btn @click="viewProduct(product)" rounded small color="white">
                    <v-icon small color="black">mdi-eye-outline</v-icon>
                    <strong> view product </strong>
                  </v-btn>
                </div>
              </v-expand-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog 
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        hello
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    }
  },
  mounted() {
    this.$store.dispatch('getProducts');
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addProductToCart', {
        product,
        productQuantity: 1
      });
    },
    viewProduct(product) {
      this.$store.dispatch('view', product)
      this.$router.push('product')
    }
  }
  
};
</script>

<style scoped>
.container {
  padding: 0 !important;
}


.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.badge {
  background-color: #F44336;
  color: white;
  border-radius: 50%;
  padding-left: 3.5px;
  padding-right: 3.5px;
  padding-top: 1.5px;
  padding-bottom: 1.5px;
  margin-top: -25px;
}
.card1 {
  background-color:whitesmoke;
}
</style>

