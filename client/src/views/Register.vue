<template>
  <div>
    <v-container class="mb-8">
      <Navbar />
      <v-card flat tile>
        <v-card-title class="justify-center">Create An Account</v-card-title>
        <v-alert
          v-if="successMessage"
          type="success"
          dismissible
          transition="fade-transition"
          class="ml-4 mr-4"
        >
          {{ successMessage }}
        </v-alert>
        <v-alert
          v-if="errorMessage"
          type="error"
          dismissible
          transition="fade-transition"
          class="ml-4 mr-4"
        >
          {{ errorMessage }}
        </v-alert>
        <v-divider class="mb-8"></v-divider>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="register" method="POST" class="ml-8 mr-8">
            <validation-provider
              v-slot="{ errors }"
              name="firstName"
              rules="required|alpha|max:30"
            >
              <v-text-field
                v-model="registerationInfo.firstName"
                :counter="30"
                prepend-icon="mdi-account"
                :error-messages="errors"
                label="First Name"
                required
                color="blue"
              >
              </v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="lastName"
              rules="required|alpha|max:30"
            >
              <v-text-field
                v-model="registerationInfo.lastName"
                :counter="30"
                prepend-icon="mdi-account"
                :error-messages="errors"
                label="Last Name"
                required
                color="blue"
              >
              </v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="registerationInfo.email"
                prepend-icon="mdi-email"
                :error-messages="errors"
                label="E-mail"
                required
                color="blue"
              >
              </v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="address"
              rules="required|max:30"
            >
              <v-text-field
                v-model="registerationInfo.address"
                :counter="30"
                prepend-icon="mdi-map-marker"
                :error-messages="errors"
                label="Address"
                required
                color="blue"
              >
              </v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="phone_number"
              rules="required|numeric|max:15"
            >
              <v-text-field
                v-model="registerationInfo.phone_number"
                :error-messages="errors"
                label="Phone Number"
                prepend-icon="mdi-pencil"
                required
                color="blue"
              >
              </v-text-field>
            </validation-provider>
            <validation-provider
              name="password"
              v-slot="{ errors }"
              rules="required|min:8"
            >
              <v-text-field
                v-model="registerationInfo.password"
                :error-messages="errors"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
                color="blue"
                prepend-icon="mdi-lock"
              >
              </v-text-field>
            </validation-provider>
            <validation-provider
              name="passwordField"
              v-slot="{ errors }"
              rules="required|min:8"
            >
              <v-text-field
                v-model="registerationInfo.passwordConfirm"
                :error-messages="errors"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                label="Confirm Password"
                hint="At least 8 characters"
                counter
                @click:append="show2 = !show2"
                color="blue"
                prepend-icon="mdi-lock"
                class="mb-4"
              >
              </v-text-field>
            </validation-provider>

            <v-card-actions class="justify-center">
              <v-btn color="blue darken-3" outlined type="submit" :disabled="invalid">
                Register
              </v-btn>
              <v-btn id="btn-clear" color="blue darken-3" outlined @click="clear">
                clear
              </v-btn>
            </v-card-actions>
            <v-card-text class="text-center mt-n4"
              >Already registered ?
              <span>
                <v-btn to="/login" text plain color="blue darken-3">Login</v-btn>
              </span>
            </v-card-text>
          </form>
        </validation-observer>
      </v-card>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  name: "Register",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      registerationInfo: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone_number: "",
        password: "",
        passwordConfirm: "",
      },
      show1: false,
      show2: false,
      successMessage: "",
      errorMessage: "",
      error: false,
      alert: true,
    };
  },
  created() {
    setTimeout(() => {
      this.alert = false;
    }, 5000);
  },
  methods: {
    async register() {
      if (this.$refs.observer.validate()) {
        try {
          let response = await axios.post("http://localhost:5000/api/register", {
              firstName: this.registerationInfo.firstName,
              lastName: this.registerationInfo.lastName,
              email: this.registerationInfo.email,
              address: this.registerationInfo.address,
              phone_number: this.registerationInfo.phone_number,
              password: this.registerationInfo.password,
              passwordConfirm: this.registerationInfo.passwordConfirm,
            }
          );
          this.successMessage = response.data.msg;
          this.error = false;
        } catch (error) {
          console.log(error);
          this.errorMessage = error.response.data.msg;
          this.error = true;
        }
      }
        this.registerationInfo.firstName = "",
        this.registerationInfo.lastName = "",
        this.registerationInfo.email = "",
        this.registerationInfo.address = "",
        this.registerationInfo.phone_number = "",
        this.registerationInfo.password = "",
        this.registerationInfo.passwordConfirm = "",
        this.$refs.observer.reset();
    },

    clear() {
        this.registerationInfo.firstName = "",
        this.registerationInfo.lastName = "",
        this.registerationInfo.email = "",
        this.registerationInfo.address = "",
        this.registerationInfo.phone_number = "",
        this.registerationInfo.password = "",
        this.registerationInfo.passwordConfirm = "",
        this.$refs.observer.reset();
    },
  },
};
</script>

<style scoped>
.container {
  padding: o !important;
}
</style>
