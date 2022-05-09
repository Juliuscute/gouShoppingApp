<template>
  <div>
    <v-container fluid v-if="totalPrice">
      <Navbar />
      <v-card outlined>
        <v-card-title class="justify-center blue-grey--text"
          >Your Cart</v-card-title
        >
        <v-row>
          <v-col cols="12" class="">
            <v-card>
              <v-simple-table class="table">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Image</th>
                      <th class="text-left">Name</th>
                      <th class="text-left">Quantity</th>
                      <th class="text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart" :key="item.id">
                      <td>
                        <v-avatar
                          ><v-img
                            :src="`/uploads/${item.product.product_image}`"
                          ></v-img
                        ></v-avatar>
                      </td>
                      <td>{{ item.product.product_name }}</td>
                      <td>
                        <v-row>
                          <v-col cols="4" class="col-xs-12 hidden-sm-and-down"
                            ><span
                              ><v-btn
                                @click="removeItem(item)"
                                class="error"
                                depressed
                                x-small
                                ><v-icon>mdi-minus</v-icon></v-btn
                              ></span
                            ></v-col
                          >
                          <v-col cols="4" class="col-xs-12">
                            <strong>{{ item.productQuantity }}</strong></v-col
                          >
                          <v-col cols="4" class="col-xs-12 hidden-sm-and-down"
                            ><span
                              ><v-btn
                                @click="addItem(item)"
                                class="primary"
                                depressed
                                x-small
                                ><v-icon small>mdi-plus</v-icon></v-btn
                              ></span
                            ></v-col
                          >
                        </v-row>
                      </td>
                      <td>₦{{ item.product.product_price }}</td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card-text class="text-center">
                <strong>Total price</strong>&nbsp;
                <strong>₦{{ totalPrice }}</strong
                >&nbsp;
              </v-card-text>
              <center>
                <v-btn
                  color="error"
                  class="mb-4"
                  outlined
                  right
                  @click="clearCart"
                >
                  <v-icon small>mdi-delete</v-icon>&nbsp; Clear cart </v-btn
                >&nbsp;
                <v-btn
                  to="/checkout"
                  color="success"
                  class="mb-4"
                  outlined
                  right
                >
                  <v-icon small>mdi-check</v-icon>&nbsp; Check out
                </v-btn>
              </center>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <EmptyCart v-else />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import EmptyCart from "@/components/EmptyCart";
//import Footer from '@/components/Footer'

export default {
  name: "Cart",
  components: {
    Navbar,
    EmptyCart,
    //Footer
  },
  // data() {
  //     return {
  //     }
  // },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
  },

  methods: {
    addItem(item) {
      this.$store.dispatch("addToCart", item);
    },
    removeItem(item) {
      this.$store.dispatch("removeProduct", item);
    },
    clearCart() {
      this.$store.dispatch("clearAll");
    },
  },
};
</script>

<style>
.container {
  padding: 0 !important;
}
</style>
