<template>
  <div>
      <Navbar />
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
        <v-col cols="12">
          <v-text-field
              outlined
              class="mx-4"
              rounded
              v-model="searchProduct"
              dense
              append-icon="mdi-magnify"
              placeholder="Search..."
            >
            </v-text-field><v-divider />
        </v-col>
        <v-row v-if="currentUser">
           <v-col cols ="12">
            <v-card-text class="text-center mt-n2 font-weight-medium">
               Got something to sell? post an advert <span>
                 <v-btn class="ml-n2" @click="sellItem" text>here &nbsp;<v-icon>mdi-shopping</v-icon>
                 </v-btn></span></v-card-text><v-divider />
          </v-col>
        </v-row>
      </v-row>
    </v-card>
    <v-card tile class="mb-8 mt-n8" color="white">
      <v-row class="card1">
        <v-col cols="12" md="3" sm="6" v-for="product in filteredProducts " :key="product.productId">
          <v-hover v-slot:default="{ hover }">
            <v-card height="350" width="270" align="center" flat outlined tile class="ml-4 mr-8" >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" small dark>posted on {{ product.date }}</v-btn>
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
                <v-btn @click="viewProduct(product)" color="success" outlined rounded small>
                    <v-icon small color="success">mdi-eye-outline</v-icon>
                    <strong> view product info</strong>
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
                  style="height: 100%">
                  <v-btn @click="viewProduct(product)" rounded small color="white">
                    <strong><v-icon small>mdi-eye</v-icon> view product info</strong>
                  </v-btn>
                </div>
              </v-expand-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card>
      </v-container>
      <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
    name: "studentMarketPlace",
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            studentProducts: "",
            currentUser: "",
            searchProduct: "",
        }
    },
    created() {
    this.currentUser = this.$store.getters.getUser.firstName;
    this.studentProducts = this.$store.state.studentProducts;
  },
    mounted() {
        this.$store.dispatch('getStudentProducts');
  },
    computed: {
      filteredProducts() {
          return this.studentProducts.filter(product => {
             return product.product_name.toLowerCase().match(this.searchProduct.toLowerCase())
          })
      }
  },
    methods: {
        viewProduct(product) {
            this.$store.dispatch('viewProduct', product)
            this.$router.push('studentProduct')
            },
         sellItem() {
            this.$router.push('/sell')
          },
    }
}
</script>

<style>
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
.card1 {
  background-color:whitesmoke;
}

</style>