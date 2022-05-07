<template>
  <div>
    <v-container>
      <Navbar />
      <v-card
        v-show="accountDetails"
        class="mt-8 mx-4"
        color="light-blue lighten-5"
        outlined
      >
        <v-card-text
          class="text-center light-blue white--text font-weight-bold"
        >
          Profie Overview
        </v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-card outlined class="mx-4 mr-md-0 my-4">
              <div class="d-flex justify-space-between">
                <v-card-text class="text-uppercase">
                  Account Details
                </v-card-text>
                <v-btn
                  @click="
                    accountDetails = false;
                    editAccount = true;
                  "
                  icon
                  class="mt-2"
                  color="light-blue"
                  ><v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
              <v-divider />
              <v-card-title class="font-weight-regular"
                >{{ firstName }} {{ lastName }}</v-card-title
              >
              <v-card-subtitle> {{ email }} </v-card-subtitle>
              <v-btn @click="accountDetails = false; 
                 changePassword = true" text color="light-blue" class="mt-2 mb-4 text-uppercase">
                change password
              </v-btn>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card outlined class="mx-4 ml-md-0 my-4">
              <v-card-text class="text-uppercase"> Address Book </v-card-text>
              <v-divider />
              <v-card-title class="hidden-sm-and-down font-weight-regular"
                >Your default shipping address:
              </v-card-title>
              <v-card-title
                class="subtitle-1 hidden-md-and-up font-weight-regular"
                >Your default shipping address:</v-card-title
              >
              <v-card-subtitle> {{ address }} </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <!--Edit user Profile-->
      <v-snackbar
        v-if="successMessage2"
        v-model="snackbar"
        absolute
        top
        color="success"
      >
        <div class="d-flex justify-space-around">
          <h5 class="subtitle-1 font-weight-bold white--text"
            ><v-icon>mdi-check-circle</v-icon> &nbsp;
            {{ successMessage2 }}
          </h5>
        </div>
      </v-snackbar>
      <v-card
        outlined
        class="mx-4 mb-4 mt-8"
        color="light-blue lighten-5"
        v-show="editAccount"
      >
        <div class="d-flex justify-space-between">
          <v-card-text class="text-uppercase font-weight-medium">
            Details
          </v-card-text>
          <v-btn
            class="mt-2 mr-4"
            text
            color="light-blue"
            @click="
              editAccount = false;
              accountDetails = true;
            "
          >
            <v-icon>mdi-arrow-left-bold</v-icon>&nbsp; Profile
          </v-btn>
        </div>
        <v-divider />
        <div class="mt-4">
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="updateUser" method="POST" class="ml-8 mr-8">
              <v-row>
                <v-col cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="firstName"
                    rules="required|alpha|max:30"
                  >
                    <v-text-field
                      v-model="firstName"
                      :counter="30"
                      :error-messages="errors"
                      label="First Name"
                      required
                      color="blue"
                    >
                    </v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="last Name"
                    rules="required|alpha|max:30"
                  >
                    <v-text-field
                      v-model="lastName"
                      :counter="30"
                      :error-messages="errors"
                      label="Last Name"
                      required
                      color="blue"
                    >
                    </v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-title class="subtitle-1 font-weight-regular"
                    >E-mail</v-card-title
                  >
                  <v-card-subtitle class="title font-weight-regular">{{
                    email
                  }}</v-card-subtitle>
                </v-col>
                <v-col cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="phone_number"
                    rules="required|numeric|max:15"
                  >
                    <v-text-field
                      v-model="phone"
                      :error-messages="errors"
                      label="Phone Number"
                      required
                      color="blue"
                    >
                    </v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-btn
                class="mt-4 mb-12 col-12 primary pt-6 pb-6"
                dark
                type="submit"
                :disabled="invalid"
              >
                Save
              </v-btn>
            </form>
          </validation-observer>
        </div>
      </v-card>

       <!--Password Edit-->
      <v-snackbar
        v-if="successMessage3"
        v-model="snackbar2"
        absolute
        top
        color="success"
      >
        <div class="d-flex justify-space-around">
          <h5 class="subtitle-1 font-weight-bold white--text"
            ><v-icon>mdi-check-circle</v-icon> &nbsp;
            {{ successMessage3 }}
          </h5>
        </div>
      </v-snackbar>
      <v-snackbar
        v-if=" errorMessage3"
        v-model="snackbar3"
        absolute
        top
        color="error"
      >
        <div class="d-flex justify-space-around">
          <h5 class="subtitle-1 font-weight-bold white--text"
            ><v-icon>mdi-close-octagon</v-icon> &nbsp;
            {{  errorMessage3 }}
          </h5>
        </div>
      </v-snackbar>
      <v-card
        outlined
        class="mx-4 mb-4 mt-8"
        color="light-blue lighten-5"
        v-show="changePassword"
      >
        <div class="d-flex justify-space-between">
          <v-card-text class="subtitle-1 font-weight-medium">
            Change Password
          </v-card-text>
          <v-btn
            class="mt-2 mr-4"
            text
            color="light-blue"
            @click="
              changePassword = false;
              accountDetails = true;"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>&nbsp; Profile
          </v-btn>
        </div>
        <v-divider />
        <div class="mt-4">
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="editPassword" method="POST" class="ml-8 mr-8">
               <validation-provider
                  name="Current Password"
                  v-slot="{ errors }"
                  rules="required|min:8"
                >
                  <v-text-field
                    v-model="currentPassword"
                    :error-messages="errors"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="currentPassword"
                    label="Current Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                    color="blue"
                    prepend-icon="mdi-lock"
                  >
                  </v-text-field>
                </validation-provider>
                <validation-provider
                  name="New Password"
                  v-slot="{ errors }"
                  rules="required|min:8"
                >
                  <v-text-field
                    v-model="newPassword"
                    :error-messages="errors"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    name="NewPassword"
                    label="New Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                    color="blue"
                    prepend-icon="mdi-lock"
                  >
                  </v-text-field>
                </validation-provider>
                <validation-provider
                  name="New Password Confirm"
                  v-slot="{ errors }"
                  rules="required|min:8"
                >
                  <v-text-field
                    v-model="newPasswordConfirm"
                    :error-messages="errors"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    name="newPasswordConfirm"
                    label="Retype New Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show3 = !show3"
                    color="blue"
                    prepend-icon="mdi-lock"
                  >
                  </v-text-field>
                </validation-provider>
              <v-btn
                class="mt-4 mb-12 col-12 primary pt-6 pb-6"
                dark
                type="submit"
                :disabled="invalid"
              >
                Submit
              </v-btn>
            </form>
          </validation-observer>
        </div>
      </v-card>
    </v-container>

    <!-- Footer-->
    <v-footer color="blue" dark padless class="hidden-md-and-up">
      <v-card class="flex" flat tile>
        <v-card-title class="blue darken-4">
          <strong class="subtitle-2"
            >Get connected with us on social networks!</strong
          >
          <v-spacer></v-spacer>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center blue">
          {{ new Date().getFullYear() }} — <strong>GoUni shopping App</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <v-footer color="blue" dark padless absolute class="hidden-sm-and-down">
      <v-card class="flex" flat tile>
        <v-card-title class="blue darken-4">
          <strong class="subtitle-2"
            >Get connected with us on social networks!</strong
          >
          <v-spacer></v-spacer>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center blue">
          {{ new Date().getFullYear() }} — <strong>GoUni shopping App</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import axios from "axios";
export default {
  name: "profile",
  components: {
    Navbar,
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',  
      accountDetails: true,
      editAccount: false,
      changePassword: false,
      snackbar: false,
      snackbar2: false,
      snackbar3: false,
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      customerId: "",
      successMessage2: "",
      successMessage3: '',
      errorMessage3: '',
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.firstName = this.$store.getters.getUser.firstName;
    this.lastName = this.$store.getters.getUser.lastName;
    this.email = this.$store.getters.getUser.email;
    this.address = this.$store.getters.getUser.address;
    this.phone = this.$store.getters.getUser.phone;
    this.customerId = this.$store.getters.getUser.id;
  },
  methods: {
        async updateUser() {
      if (this.$refs.observer.validate()) {
        try {
          let response = await axios.put("http://localhost:5000/api/update", {
            customerId: this.customerId,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
          });
          this.successMessage2 = response.data.msg;
          const token = this.$store.state.token;
          const user = response.data.user;
          window.localStorage.setItem("currentUser", JSON.stringify(user));
          this.$store.dispatch("loginUser", { token, user });
          this.firstName = response.data.user.firstName;
          this.lastName = response.data.user.lastName;
          this.phone = response.data.user.phone;
          console.log(response);
          this.snackbar = true;
          window.location.href = "/profile";
        } catch (error) {
          console.log(error);
          this.errorMessage2 = error.response.data.msg;
        }
      }
    },

    async editPassword() {
       if (this.$refs.observer.validate()) {
         try {
           let response = await axios.put("http://localhost:5000/api/passwordChange", {
            currentPassword:    this.currentPassword,
            newPassword:        this.newPassword,
            newPasswordConfirm: this.newPasswordConfirm,
            customerId:         this.customerId
          })
          this.successMessage3 = response.data.msg;
          this.snackbar2 = true
         // alert(response.data.msg)
         } catch(error) {
           console.log(error)
           //alert(error.response.data.msg)
           this.errorMessage3 = error.response.data.msg
           this.snackbar3 = true
         }
       }
       this.currentPassword = "",
       this.newPassword = "",
       this.newPasswordConfirm = "",
       this.$refs.observer.reset();
    }
  }
};
</script>

<style>

</style>
