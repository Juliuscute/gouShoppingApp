<template>
  <div>
    <v-container>
      <Navbar />
      <v-card flat tile>
        <v-card-title class="justify-center">Login</v-card-title>
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
          <form @submit.prevent="login" method="POST" class="ml-8 mr-8">
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="loginInfo.email"
                prepend-icon="mdi-email"
                :error-messages="errors"
                label="E-mail"
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
                v-model="loginInfo.password"
                :error-messages="errors"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="password"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
                color="blue"
                prepend-icon="mdi-lock"
              >
              </v-text-field>
            </validation-provider>

            <v-card-actions class="justify-center">
              <v-btn color="blue darken-3" outlined type="submit" :disabled="invalid">
                <span><v-icon small>mdi-login</v-icon>&nbsp;</span>
                Login
              </v-btn><span><v-btn class="lowercase" color="blue darken-3" plain text>Forgot Password?</v-btn></span>
            </v-card-actions>
            <v-card-text  class="text-center mt-n4"
              >Don't have an Account ?
              <span>
                <v-btn to="/register" text plain color="blue darken-3">Register</v-btn>
              </span>
            </v-card-text>
          </form>
        </validation-observer>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import axios from 'axios';
export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      loginInfo: {
        email: "",
        password: "",
      },
      show1: false,
      errorMessage: '',
      alert: true
    };
  },
  methods: {
     async login() {
          try {
              if (this.$refs.observer.validate()) {
                  let response = await axios.post("api/login", {
                      email: this.loginInfo.email,
                      password: this.loginInfo.password
                  })
                    const token = response.data.token;
                    const user = response.data.user;
                   //console.log(response.data.user)
                     this.$store.dispatch('loginUser', { token, user });
                     window.localStorage.setItem('currentUser', JSON.stringify(user))
                     window.localStorage.setItem('token', JSON.stringify(token))
                     this.$router.push('/');
                   
              }
          }
          catch(error) {
              this.errorMessage = error.response.data.msg
              //console.log(error)
          }
          this.loginInfo.email = '',
          this.loginInfo.password = '',
          this.$refs.observer.reset();
      }
  }
};
</script>

<style scoped>
.container {
  padding: o !important;
}
.lowercase {
    text-transform: unset !important;
}
</style>
