<template>
  <nav>
    <v-app-bar color="blue" flat app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up white--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text mt-8">
        <v-img
          class="mb-4 logo"
          max-height="150"
          max-width="250"
          src="https://cdn.statically.io/img/www.gouni.edu.ng/wp-content/uploads/2014/10/Uni-Logo-x2_2.png?quality=100&amp;f=auto"
          alt="Godfrey Okoye University | Unity Of Knowledge"
          srcset="https://cdn.statically.io/img/www.gouni.edu.ng/wp-content/uploads/2014/10/Uni-Logo-x2_2.png?w=196&amp;quality=100&amp;f=auto 196w,
"
          sizes="(max-width: 196px) 100vw, 196px"
          loading="lazy"
          @click="goToHome"
        >
        </v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-divider vertical class="hidden-sm-and-down"></v-divider>
      <v-menu offset-y transition="scale-transition" open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" text v-bind="attrs" v-on="on">
            <span v-if="!firstName" class="hidden-sm-and-down ml-4"
              >Account</span
            >
            <span
              v-if="firstName"
              class="text-capitalize hidden-sm-and-down ml-4"
            >
              <v-icon>mdi-account-check-outline</v-icon>&nbsp; Hi,
              {{ firstName }}
            </span>
            <v-icon class="white--text hidden-sm-and-down"
              >mdi-menu-down</v-icon
            >
          </v-btn>
        </template>
        <v-list>
          <v-list-item style="cursor: pointer" v-if="!firstName">
            <v-list-item-icon>
              <v-icon small>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-n2" @click="login">
              Login
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="firstName"> 
            <v-list-item-avatar>
              <v-icon large>mdi-account-circle</v-icon>
            </v-list-item-avatar>
             <v-list-item-content>
              <v-list-item-title> {{ firstName }} </v-list-item-title>
              <v-list-item-subtitle>Logged in</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item><v-divider />
          <v-list-item style="cursor: pointer" v-if="!firstName">
            <v-list-item-icon>
              <v-icon small>mdi-account-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-n2" @click="register">
              Register
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="firstName" style="cursor: pointer" @click="goToHome">
          <v-list-item-icon>
            <v-icon small>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-n2"> Home </v-list-item-title>
          </v-list-item>
          <v-list-item style="cursor: pointer" v-if="firstName">
            <v-list-item-icon>
              <v-icon >mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-n2" @click="profile">
              Profile
            </v-list-item-title>
          </v-list-item>
          <v-list-item style="cursor: pointer" v-if="firstName">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-n2" @click="logout">
              Log out
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isAdmin" style="cursor: pointer">
            <v-list-item-icon>
              <v-icon small>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-n2" @click="goToAdminPage">
              Admin
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-divider vertical class="hidden-sm-and-down"></v-divider>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app color="blue" temporary>
      <v-card
        v-if="firstName"
        color="blue"
        height="50px"
        tile
        flat
        dark
        class="align-center justify-center hidden-sm-and-up"
      >
        <v-card-text class="text-center subtitle-1 font-weight-regular white--text">
          GOUNI shopping App &nbsp;<v-icon>mdi-cart-outline</v-icon>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
      <v-card
        v-if="!firstName"
        color="blue"
        height="50px"
        tile
        flat
        dark
        class="align-center justify-center hidden-sm-and-up"
      >
        <v-card-text class="text-center subtitle-1 font-weight-bold white--text"
          >Hi, there !</v-card-text
        >
        <v-divider></v-divider>
      </v-card>
      <v-list dark class="mt-4">
        <v-list-item style="cursor: pointer" @click="goToHome">
          <v-list-item-icon>
            <v-icon small>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-n2"> Home </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="firstName" style="cursor: pointer" @click="profile">
          <v-list-item-icon>
            <v-icon small>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-n2"> Profile </v-list-item-title>
        </v-list-item>
        <v-list-item style="cursor: pointer" v-if="!firstName">
          <v-list-item-icon>
            <v-icon small>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-n2" @click="login">
            Login
          </v-list-item-title>
        </v-list-item>
        <v-list-item style="cursor: pointer" v-if="!firstName">
          <v-list-item-icon>
            <v-icon small>mdi-account-plus-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-n2" @click="register">
            Register
          </v-list-item-title>
        </v-list-item>
        <v-list-item style="cursor: pointer" v-if="firstName">
          <v-list-item-icon>
            <v-icon small>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-n2" @click="logout">
            Log out
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      firstName: "",
      lastName: "",
      isLoggedIn: "",
    };
  },
  created() {
    this.firstName = this.$store.getters.getUser.firstName;
    this.lastName = this.$store.getters.getUser.lastName;
    this.isLoggedIn = this.$store.getters.isLoggedIn;
  },
  computed: {
    isAdmin() {
      return this.$store.state.currentUser.role == "Admin"
    },
  },
  methods: {
    goToHome() {
      this.$router.push("/");
      this.drawer=false
    },
    register() {
      this.$router.push("/register");
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.dispatch("logOut");
      //this.$router.push('/')
      window.location.href = "/";
    },
    goToAdminPage() {
      this.$router.push("/admin_dashboard");
    },
    profile() {
      this.$router.push("/profile")
    }
  },
};
</script>

<style scoped>
.logo {
  cursor: pointer;
}
</style>
