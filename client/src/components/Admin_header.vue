<template>
  <v-app-bar app color="white" elevate-on-scroll elevation="4">
    <v-app-bar-nav-icon
      @click="$emit('handleDrawer')">
    </v-app-bar-nav-icon>
    <v-spacer />
    <v-col cols="9">
      <v-form action="" class="mt-8">
        <v-text-field
          outlined
          rounded
          dense
          append-icon="mdi-magnify"
          placeholder="Search Here...."
        >
        </v-text-field>
      </v-form>
    </v-col>
    <v-spacer />

    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">
          <v-badge
            class="hidden-sm-and-down"
            offset-x="10"
            offset-y="10"
            color="red"
            :content="pendingOrdersCount"
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </span>
      </template>
      <v-card>
        <v-list>
          <v-list-item> you have {{ pendingOrdersCount }} pending orders </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <v-spacer />
    <v-menu offset-y class="d-sm-none d-md-flex mr-4">
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">
          <v-chip
            class="ma-2 hidden-sm-and-down"
            color="grey"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{ firstName }}
            {{ lastName }}
          </v-chip>
        </span>
      </template>
      <v-card>
        <v-list>
          <v-list-item >
            <v-list-item-avatar>
              <v-icon large>mdi-account-circle</v-icon>
            </v-list-item-avatar>
             <v-list-item-content>
              <v-list-item-title> {{ firstName }} {{ lastName }} </v-list-item-title>
              <v-list-item-subtitle>Logged in</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item   @click="$emit('toggleProfile')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
             Profile
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
             Logout
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      
    };
  },
  async created() {
        this.firstName = this.$store.getters.getUser.firstName
        this.lastName = this.$store.getters.getUser.lastName
     },
     computed: {
       pendingOrdersCount() {
        return this.$store.state.pendingOrdersCount;
    },
     },
     mounted() {
      this.$store.dispatch("getPendingOrdersCount")
  },
  methods: {
    logout() {
      this.$store.dispatch('logOut');
       window.location.href = '/'
    }
  }   
};
</script>

<style></style>
