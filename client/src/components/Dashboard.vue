<template>
  <v-container fluid>
    <v-card
      v-if="currentUser"
      color="blue darken-3"
      height="50px"
      tile
      flat
      dark
      class=" align-center justify-center hidden-sm-and-up"
    >
      <v-card-text class="text-center subtitle-1 white--text">Hi, {{ currentUser }}</v-card-text>
    </v-card>
    <v-card
      color="#0D47A1"
      height="250px"
      tile
      flat
      dark
      class="d-flex align-center justify-center"
      
    >
      <v-row>
        <v-col cols="9" class="col-md-11">
          <v-text-field
              outlined
              class="ml-4"
              rounded
              v-model="searchProduct"
              dense
              append-icon="mdi-magnify"
              placeholder="Search..."
            >
            </v-text-field>
        </v-col>
          <v-snackbar
          v-model="snackbar"
          absolute
          transition="slide-y-transition"
          timeout="2000"
          color="success"
        >
          <div class="d-flex justify-space-around">
            <h5 class="subtitle-1 font-weight-bold white--text"
              ><v-icon>mdi-check-circle</v-icon> &nbsp;
              item added to cart
            </h5>
          </div>
        </v-snackbar>
        <v-col cols="3" class="col-md-1">
          <v-btn icon to="/cart">        
            <v-icon class="white--text">mdi-cart-outline</v-icon>
            <span class="badge"> {{cartItemCount}} </span>            
          </v-btn>
        </v-col><v-divider />
       <v-row v-if="currentUser" style="border-top: 1px solid blue;">
          <v-col cols ="12" md="6">
            <v-card-text class="text-center mt-n2 font-weight-medium">
               Got something to sell? post an advert <span>
                 <v-btn class="ml-n2" @click="sellItem" text>here &nbsp;<v-icon>mdi-shopping</v-icon>
                 </v-btn></span></v-card-text><v-divider class="hidden-md-and-up" />
          </v-col> <v-divider class="hidden-sm-and-down" vertical></v-divider>
          <v-col cols="12" md="6">
            <v-card-text class="text-center mt-n2 font-weight-medium hidden-sm-and-down">
               wanna buy from a student? go to students <span>
                 <v-btn class="ml-n2" @click="buyItem" text>market place &nbsp;<v-icon>mdi-cart-variant</v-icon>
                 </v-btn></span></v-card-text>

                 <!--for small screen sizes-->
                 <v-card-text class="text-center mt-n8 mb-8 font-weight-medium hidden-md-and-up">
                  go to students <span>
                 <v-btn class="ml-n2" @click="buyItem" text>market place &nbsp;<v-icon>mdi-cart-variant</v-icon>
                 </v-btn></span></v-card-text>
          </v-col>  
       </v-row>

      </v-row>
    </v-card>
    <v-card tile class="mb-8 mt-n8" color="white">
      <v-row class="card1">
        <v-col cols="12" md="3" sm="6" v-for="product in filteredProduct " :key="product.productId">
          <v-hover v-slot:default="{ hover }">
            <v-card height="350" width="270" align="center" flat outlined tile class="ml-4 mr-8" >
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
                  ₦{{product.product_price}}.00
                </v-card-subtitle>
              </v-card-text>
              <v-card-actions class="justify-center mt-n8 hidden-md-and-up">
               <v-btn rounded small color="success" outlined @click="addToCart(product); snackbar=true">
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
                  <v-btn rounded small color="white" @click="addToCart(product); snackbar=true">
                    <strong> Add to cart </strong>
                  </v-btn>&nbsp;
                  <v-btn @click="viewProduct(product)" rounded small color="white">
                    <strong> view product </strong>
                  </v-btn>
                </div>
              </v-expand-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentUser: '',
      snackbar: false,
      searchProduct: "",
      products: "",
    };
  },
  computed: {
     filteredProduct() {
      return this.products.filter(product => {
        return product.product_name.toLowerCase().match(this.searchProduct.toLowerCase())
      })
    },
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    }
  },
  mounted() {
    this.$store.dispatch('getProducts');
  },
  created() {
    this.currentUser = this.$store.getters.getUser.firstName;
    this.products = this.$store.state.products;
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', {
        product,
        productQuantity: 1
      });
    },
    viewProduct(product) {
      this.$store.dispatch('viewProduct', product)
      this.$router.push('product')
    },
     sellItem() {
       this.$router.push('/sell')
     },
     buyItem() {
       this.$router.push('/studentMarketPlace')
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

