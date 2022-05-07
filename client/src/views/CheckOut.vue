<template>
 <div>
  <v-container class="mb-12">
    <Navbar />
    <v-card tile color="light-blue lighten-5" class="mt-8">
      <v-row>
        <v-col cols="12">
          <v-card-title class="justify-center"> Order Summary </v-card-title
          ><v-divider class="mb-8"></v-divider>
          <p class="ml-8 mb-4 text-center">Products: {{ cartItemCount }}</p>
          <p class="ml-8 text-center">Products: ₦{{ totalPrice }}</p>
          <v-divider class="mb-8"></v-divider>

          <validation-observer ref="observer">
            <form @submit.prevent="submit" method="POST">
              <validation-provider
                v-slot="{ errors }"
                name="address"
                rules="required|max:100"
              >
              <v-card-actions class="justify-center">
              <v-text-field
                @keyup="submit"
                v-model="address"
                :counter="100"
                prepend-icon="mdi-map-marker"
                :error-messages="errors"
                label="Enter delivery address"
                 class="ml-16 mr-16 address"
                required
                color="blue"
              >
              </v-text-field>
              </v-card-actions>
            </validation-provider>
            </form>  
          </validation-observer> 
          <v-card-actions class="justify-center">
            <v-select
              :hint="`${select.method}`"
              :items="items"
              item-text="method"
              item-value="value"
              class="ml-16 mr-16 select"
              label="select shipping method"
              v-model="shippingFee"
              @change="updateShippingMethod"
            >
            </v-select>
          </v-card-actions>
          <div v-if="shippingFee">
            <v-card-actions class="justify-center">
              <v-btn color="blue-grey" dark class="pr-4 pl-4">
                <paystack
                  :amount="parseInt(totalPrice * 100) + parseInt(shippingFee * 100)"
                  :email="getUser['email']"
                  :paystackkey="get_paystack_details.PUBLIC_KEY"
                  :reference="reference"
                  :callback="processPayment"
                  :close="get_paystack_details['close']"
                >
                  Pay ₦{{ parseInt(totalPrice) + parseInt(shippingFee) }}
                </paystack>
              </v-btn>
            </v-card-actions>
          </div>
          <div v-else>
            <v-card-actions class="justify-center">
              <v-btn color="blue-grey" disabled class="pr-4 pl-4 white--text">
                Pay ₦{{ totalPrice }}
              </v-btn>
            </v-card-actions>
          </div>
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
import { mapGetters, mapActions } from "vuex";
import paystack from "vue-paystack";
export default {
  components: {
    Navbar,
    paystack,
    Footer
  },
  data() {
    return {
      firstName: "",
      shippingFee: "",
      address: "",
      select: { method: "Standard_Shipping ₦4", value: "4" },
      items: [
        { method: "Standard_Shipping ₦4", value: "4" },
        { method: "Fast_Shipping ₦10", value: "10" },
      ],
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }

    this.firstName = this.$store.getters.getUser.firstName;
  },
  computed: {
    ...mapGetters([
      "cart",
      "get_paystack_details",
      "getUser",
      "totalPrice",
      "cartItemCount",
      "getShippingFee",
    ]),

    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
  },
  methods: {
    ...mapActions(["processPayment"]),
    updateShippingMethod() {
      this.$store.dispatch("shippingMethod", this.shippingFee);
    },
    submit() {
      this.$store.dispatch("shippingAddress", this.address)
    }
  },
};
</script>

<style>
.select {
  max-width: 300px;
}
.address {
  max-width: 300px;
}
</style>
