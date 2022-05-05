<template>
  <div>
    <Admin_header
      @handleDrawer="drawer = !drawer"
      @toggleProfile="
      dashboard = !dashboard;
      profile = !profile;"
    />
    <v-navigation-drawer v-model="drawer" app>
      <v-img src="47.jpg" class="pa-4">
        <div class="text-center mt-4">
          <v-avatar class="mb-4" color="grey darken-1" size="64">
            <v-img src="julius.jpg"></v-img>
          </v-avatar>
          <h3 class="white--text">Admin {{ firstName }}</h3>
        </div>
      </v-img>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in links"
          @click="
            $vuetify.goTo(item.link);
            dashboard = true;
            profile = false;
          "
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item
          link
          @click="
            dashboard = !dashboard;
            profile = !profile;
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Profile </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item 
        link
        @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Body-->
    <v-container v-show="dashboard" id="dashboard" fluid class="py-8 px-6">
      <v-subheader class="d-flex justify-space-between mb-4">
        <h1 class="title hidden-sm-and-down ml-4 mt-4">Dashboard</h1>
        <h1 class="subtitle-1 hidden-md-and-up ml-4 mt-2">Dashboard</h1>

        <v-btn
          @click="$vuetify.goTo('#orders')"
          class="primary mr-8 hidden-sm-and-down mt-2"
          >View Order
        </v-btn>
        <v-menu offset-y class="hidden-md-and-up">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" class="hidden-md-and-up mr-4">
              <v-badge
                class="hidden-md-and-up"
                offset-x="10"
                offset-y="10"
                color="red"
                :content="pendingOrders"
              >
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </span>
          </template>
          <v-card>
            <v-list>
              <v-list-item> you have one new order </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-subheader>
      <v-row>
        <v-col cols="12" md="8">
          <v-alert
            type="success"
            dense
            text
            dismissible
            transition="fade-transition"
            class="mx-4 mr-md-0"
          >
            <strong>Login successful, </strong> Welcome Admin {{ firstName }}
          </v-alert>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="mx-4 mr-md-0 mt-4">
                <v-row>
                  <v-col cols="4">
                    <v-card-text> Total Product </v-card-text>
                  </v-col>
                  <v-col cols="4" offset="4">
                    <v-avatar color="blue" class="white--text mt-2 pa-8">
                      {{ totalProducts }}
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="mt-4 mx-4 mr-md-0 ml-md-0">
                <v-row>
                  <v-col cols="4">
                    <v-card-text> Total cutomer </v-card-text>
                  </v-col>
                  <v-col cols="4" offset="4">
                    <v-avatar color="green" class="white--text mt-2 pa-8">
                      {{ totalUsers }}
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="mx-4 mr-md-0 mt-4">
                <v-row>
                  <v-col cols="4">
                    <v-card-text> Total Sale </v-card-text>
                  </v-col>
                  <v-col cols="4" offset="4">
                    <v-avatar
                      color="cyan darken-4"
                      class="white--text mt-2 pa-8"
                    >
                      {{ totalSales }}
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="mt-4 mx-4 mr-md-0 ml-md-0">
                <v-row>
                  <v-col cols="4">
                    <v-card-text> Pending Order </v-card-text>
                  </v-col>
                  <v-col cols="4" offset="4">
                    <v-avatar color="red" class="white--text mt-2 pa-8">
                      {{ pendingOrders }}
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-4 ml-md-0" style="height: 295px; overflow: auto">
            <v-card-text>
              <div class="font-weight-bold ml-8 mb-2">Activities</div>

              <v-timeline align-top dense>
                <v-timeline-item small color="green">
                  <div>
                    <div class="font-weight-normal">
                      <strong>John Doe</strong> @11:45am
                    </div>
                    <div>I have not received my order</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item small color="red">
                  <div>
                    <div class="font-weight-normal">
                      <strong>John Doe</strong> @11:45am
                    </div>
                    <div>I have not received my order</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item small purple>
                  <div>
                    <div class="font-weight-normal">
                      <strong>John Doe</strong> @11:45am
                    </div>
                    <div>I have not received my order</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- Recent Order List-->
      <v-card class="mt-4 mx-4" id="orders">
        <div>
          <v-card-text
            class="text-center light-blue white--text font-weight-bold"
            >Recent Order list
          </v-card-text>
          <v-form action="" class="mt-4 mx-4">
            <v-text-field
              outlined
              rounded
              v-model="searchOrder"
              dense
              append-icon="mdi-magnify"
              placeholder="Search with email...."
            >
            </v-text-field>
          </v-form>
        </div>
        <v-simple-table class="table" height="400">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Order Id</th>
                <th class="text-left">Customer's Email</th>
                <th class="text-left">Customer's Phone</th>
                <th class="text-left">Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in filteredOrders" :key="order.order_Id">
                <td>{{ order.order_Id }}</td>
                <td>{{ order.customerEmail }}</td>
                <td>{{ order.customerPhone }}</td>
                <td>{{ order.totalPrice }}</td>
                <td>
                  <h4>
                    <span style=" border-radius: 5px" 
                      class="pa-1 white--text" 
                      :class="order.status == 'processed' ? 'green' : 'red'">
                      {{ order.status }}
                    </span>
                  </h4>
                </td>
                <td>
                  <v-btn
                    @click="
                      viewOrder(order);
                      dialog1 = !dialog1;
                      orderId = order.order_Id
                    "
                    color="green"
                    class="hidden-sm-and-down"
                    outlined
                    >View</v-btn
                  >
                </td>
                <td>
                  <v-btn
                    small
                    @click="
                      viewOrder(order);
                      dialog1 = !dialog1;
                      orderId = order.order_Id
                    "
                    color="green"
                    class="hidden-md-and-up"
                    outlined
                    >View</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>

       <!-- Product List-->
      <v-card class="mt-8 mx-4" id="products">
        <div>
          <v-card-text class="text-center green white--text font-weight-bold"
            >Product list
          </v-card-text>
          <v-form action="" class="mt-4 mx-4">
            <v-text-field
              outlined
              rounded
              v-model="searchProduct"
              dense
              append-icon="mdi-magnify"
              placeholder="Search for product...."
            >
            </v-text-field>
          </v-form>
        </div>
        <div>
          <v-simple-table class="table" height="400">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">product Id</th>
                  <th class="text-left">Product Name</th>
                  <th class="text-left">Product Category</th>
                  <th class="text-left">Product Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in filteredProducts" :key="product.productId">
                  <td>{{ product.productId }}</td>
                  <td>{{ product.product_name }}</td>
                  <td>{{ product.product_category }}</td>
                  <td>{{ product.product_price }}</td>
                  <td>
                    <v-btn
                      color="green"
                      @click="
                        viewProduct(product);
                        dialog2 = !dialog2;
                      "
                      class="hidden-sm-and-down"
                      outlined
                      >View</v-btn
                    >
                  </td>
                  <td>
                    <v-btn
                      small
                      color="green"
                      @click="
                        viewProduct(product);
                        dialog2 = !dialog2;
                      "
                      class="hidden-md-and-up"
                      outlined
                      >View</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-card>

      <!--Upload section-->
      <v-card class="mt-8 mx-4" id="upload">
        <v-card-text
          class="text-center cyan darken-4 white--text font-weight-bold mb-4"
          ><v-icon dark>mdi-upload</v-icon>&nbsp; Upload product
        </v-card-text>
        <div class="mx-4 mb-8">
          <v-alert
            dismissible
            dense
            text
            transition="fade-transition"
            v-if="successMessage"
            type="success"
            ><strong class="white--green">{{ successMessage }}</strong>
          </v-alert>
          <v-alert
            dismissible
            dense
            text
            transition="fade-transition"
            v-if="errorMessage"
            type="error"
            ><strong class="white--green">{{ errorMessage }}</strong>
          </v-alert>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form
              @submit.prevent="uploadProduct"
              method="POST"
              enctype="multipart/form-data"
            >
              <input
                type="file"
                style="display: none"
                required
                @change="selectFile"
                ref="fileInput"
              />
              <v-btn class="mt-4 mb-4" raised @click="$refs.fileInput.click()">
                <v-icon>mdi-camera</v-icon>&nbsp; select product </v-btn
              ><br class="hidden-md-and-up" />
              <span
                v-if="selectedFile"
                class="pa-2"
                style="border: 1px solid whitesmoke"
              >
                {{ selectedFile.name }}
              </span>
              <validation-provider
                v-slot="{ errors }"
                name="product_name"
                rules="required|max:30"
              >
                <v-text-field
                  v-model="product_name"
                  :counter="30"
                  :error-messages="errors"
                  label="product name"
                  prepend-icon="mdi-pencil"
                  required
                  color="#0D47A1"
                >
                </v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="product_price"
                rules="required|numeric|max:50"
              >
                <v-text-field
                  v-model="product_price"
                  :error-messages="errors"
                  label="product price"
                  prepend-icon="mdi-pencil"
                  required
                  color="#0D47A1"
                >
                </v-text-field>
              </validation-provider>

              <v-select
                v-model="product_category"
                :items="items"
                label="product category"
                prepend-icon="mdi-form-select"
                dense
                required
                color="#0D47A1"
              >
              </v-select>

              <validation-provider
                v-slot="{ errors }"
                name="product_description"
                rules="required|max:150"
              >
                <v-textarea
                  v-model="product_description"
                  :counter="150"
                  prepend-icon="mdi-pencil"
                  :error-messages="errors"
                  label="product description"
                  required
                  color="#0D47A1"
                ></v-textarea>
              </validation-provider>

              <v-btn
                class="mr-4 mb-8 mt-8"
                color="blue"
                outlined
                type="submit"
                :disabled="invalid"
              >
                upload
              </v-btn>
              <v-btn
                id="btn-clear"
                class="mb-8 mt-8"
                @click="clear"
                color="red"
                outlined
              >
                clear
              </v-btn>
            </form>
          </validation-observer>
        </div>
      </v-card>

      <!-- View Order dialog--->
      <v-dialog
        v-model="dialog1"
        v-if="singleOrder !== null"
        persistent
        width="700"
      >
        <v-card>
          <v-card-title class="h5 justify-center blue mb-4 white--text">
            {{ firstName }}' orders
          </v-card-title>
          <div class="px-4 mb-4">
            <h4>
              Order Id:
              <span class="subtitle-1"> {{ singleOrder.order_Id }} </span>
            </h4>
            <br />
            <h4>
              Items: <span class="subtitle-1"> {{ singleOrder.cart }}</span>
            </h4>
            <br />
            <h4>
              Customer's Email:
              <span class="subtitle-1">{{ singleOrder.customerEmail }} </span>
            </h4>
            <br />
            <h4>
              Customer's Phone:
              <span class="subtitle-1"> {{ singleOrder.customerPhone }} </span>
            </h4>
            <br />
            <h4>Delivery Address:
            <span class="subtitle-1"> {{ singleOrder.shippingAddress }} </span>
            </h4>
            <br />
            <h4>
              Total price:
              <span class="subtitle-1"> {{ singleOrder.totalPrice }} </span>
            </h4>
            <br />
            <h4>
              Paystack refernce:
              <span class="subtitle-1">
                {{ singleOrder.paystackReference }}
              </span>
            </h4>
            <br />
            <h4>
              Shipping mode:
              <span class="subtitle-1"> {{ singleOrder.shippingMode }} </span>
            </h4>
            <br />
            <h4>
              Status: <span class="subtitle-1"> {{ singleOrder.status }} </span>
            </h4>
            <br />
            <h4>
              Order time and date:
              <span class="subtitle-1"> {{ singleOrder.orderTime }} </span>
            </h4>
          </div>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="updateOrderStatus()" color="primary" text class="mb-4 hidden-sm-and-down">
              Completed
            </v-btn>
            <v-btn
              class="mb-4 hidden-sm-and-down"
              color="primary"
              text
              @click="dialog1 = false"
            >
              Close
            </v-btn>

            <v-btn @click="updateOrderStatus()" color="primary" text small class="mb-4 hidden-md-and-up">
              Completed
            </v-btn>
            <v-btn
              class="mb-4 hidden-md-and-up"
              color="primary"
              text
              small
              @click="dialog1 = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- View product dialog--->
      <v-dialog
        v-model="dialog2"
        persistent
        v-if="singleProduct !== null"
        width="700"
      >
        <v-card>
          <v-card-title class="h5 justify-center blue white--text">
            {{ singleProduct.product_name }}' Details
          </v-card-title>
          <div class="px-4 mb-4">
            <v-row>
              <v-col cols="12" class="col-md-6 mb-n4">
                <v-img
                  style="display-flex; float:right; border-radius: 10px"
                  class="hidden-sm-and-down mt-8"
                  :src="`/uploads/${singleProduct.product_image}`"
                  width="200"
                  height="200"
                  contain
                >
                </v-img>
                <!-- view for small screen-->
                <center>
                  <v-img
                    class="hidden-md-and-up justify-center mt-8"
                    :src="`/uploads/${singleProduct.product_image}`"
                    width="200"
                    height="200"
                    contain
                  >
                  </v-img>
                </center>
              </v-col>
              <v-col cols="12" class="col-md-6 mt-2">
                <v-card-text class="mt-8 ml-16 ml-md-4">
                  <strong class="subtitle-1 font-weight-bold"
                    >Product Id:</strong
                  >&nbsp;<strong class="subtitle-1">
                    {{ singleProduct.productId }} </strong
                  ><br />
                  <strong class="subtitle-1 font-weight-bold">Name:</strong
                  >&nbsp;<strong class="subtitle-1">
                    {{ singleProduct.product_name }} </strong
                  ><br />
                  <strong class="subtitle-1 font-weight-bold"
                    >Price: &nbsp;</strong
                  >&nbsp;<strong class="subtitle-1"
                    >N{{ singleProduct.product_price }} </strong
                  ><br />
                  <strong class="subtitle-1 font-weight-bold"
                    >Description: &nbsp;</strong
                  >&nbsp;<strong class="subtitle-1"
                    >{{ singleProduct.product_description }} </strong
                  ><br />
                  <strong class="subtitle-1 font-weight-bold"
                    >Category: &nbsp;</strong
                  >&nbsp;<strong class="subtitle-1"
                    >{{ singleProduct.product_category }} </strong
                  ><br />
                </v-card-text>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="mb-4 hidden-sm-and-down"
              color="primary"
              text
              @click="dialog2 = false"
            >
              Close
            </v-btn>
            <v-btn
              class="mb-4 hidden-md-and-up"
              color="primary"
              text
              small
              @click="dialog2 = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <!-- profile-->
    <v-container v-show="profile">
      <v-card
        class="mt-8 mx-4"
        color="light-blue lighten-5"
        outlined
        v-show="accountDetails"
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
              <v-btn text color="light-blue"
               class="mt-2 mb-4 text-uppercase"
               @click="accountDetails = false;
               changePassword = true"
                >change password
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
      <v-card
        outlined
        class="mx-4 mb-4"
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
        v-if="successMessage4"
        v-model="snackbar2"
        absolute
        top
        color="success"
      >
        <div class="d-flex justify-space-around">
          <h5 class="subtitle-1 font-weight-bold white--text"
            ><v-icon>mdi-check-circle</v-icon> &nbsp;
            {{ successMessage4 }}
          </h5>
        </div>
      </v-snackbar>
      <v-snackbar
        v-if=" errorMessage4"
        v-model="snackbar3"
        absolute
        top
        color="error"
      >
        <div class="d-flex justify-space-around">
          <h5 class="subtitle-1 font-weight-bold white--text"
            ><v-icon>mdi-close-octagon</v-icon> &nbsp;
            {{  errorMessage4 }}
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
      <v-snackbar v-model="snackbar4" type="error">
        <v-icon>mdi-alert-remove &nbsp; You are not Authorized !</v-icon>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Admin_header from "@/components/Admin_header";
//import Footer from "@/components/Footer";
export default {
  components: {
    Admin_header,
    // Footer
  },
  data: () => ({
    searchProduct: '',
    searchOrder: '',
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
    show1: false,
    show2: false,
    show3: false,
    snackbar: false,
    snackbar2: false,
    snackbar3: false,
    snackbar4: false,
    dialog1: false,
    dialog2: false,
    dashboard: true,
    profile: false,
    accountDetails: true,
    editAccount: false,
    changePassword: false,
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    customerId: "",
    successMessage: "",
    successMessage2: "",
    successMessage3: '',
    successMessage4: "",
    errorMessage: "",
    errorMessage2: "",
    errorMessage4: "",
    selectedFile: null,
    product_name: "",
    product_price: "",
    product_category: "",
    product_description: "",
    orderId: "",
    products: "",
    orders: "",
    drawer: false,
    links: [
      { title: "Dashboard", icon: "mdi-microsoft-windows", link: "#dashboard" },
      { title: "Product", icon: "mdi-clipboard-list-outline", link: "#products" },
      { title: "Order", icon: "mdi-clipboard-list", link: "#orders" },
      { title: "Upload Product", icon: "mdi-upload", link: "#upload" },
    ],
    items: [
      "Clothes",
      "Shoes",
      "Phones",
      "Computers",
      "watches and jewelries",
      "Home Theater",
      "TV",
      "Others",
      "kitchen_appliance",
    ],
  }),
  async created() {
    if (this.$store.state.currentUser.role !== "Admin" ) {
      this.snackback4 = true;
      this.$router.push("/");
    }
    this.firstName = this.$store.getters.getUser.firstName;
    this.lastName = this.$store.getters.getUser.lastName;
    this.email = this.$store.getters.getUser.email;
    this.address = this.$store.getters.getUser.address;
    this.phone = this.$store.getters.getUser.phone;
    this.customerId = this.$store.getters.getUser.id;
    this.products = this.$store.getters.getProducts;
    this.orders = (this.$store.getters.getOrders)
  },
  mounted() {
    this.$store.dispatch("getTotalUsers");
    this.$store.dispatch("getOrders");
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getPendingOrders")
  },
  computed: {
    //searching orders
    filteredOrders() {
      let orderArray =JSON.stringify(Object.values(this.orders))
      return JSON.parse(orderArray).filter(order => {
        return order.customerEmail.toLowerCase().match(this.searchOrder.toLowerCase());
      })
    },
    //searching products
    filteredProducts() {
      return this.products.filter(product => {
        return product.product_name.toLowerCase().match(this.searchProduct.toLowerCase())
      })
    },
    totalUsers() {
      return this.$store.getters.getTotalUsers;
    },
    pendingOrders() {
      return this.$store.state.pendingOrders;
    },
    totalSales() {
      return this.$store.getters.totalSales;
    },
    singleOrder() {
      return this.$store.state.singleOrder;
    },
    singleProduct() {
      return this.$store.state.singleProduct;
    },
    totalProducts() {
      return this.$store.getters.getTotalProducts;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logOut');
       window.location.href = '/'
    },
    viewOrder(order) {
      this.$store.dispatch("viewOrder", order);
    },
    viewProduct(product) {
      this.$store.dispatch("viewProduct", product);
    },
    selectFile(event) {
      const selectedFile = event.target.files[0];
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const MAX_SIZE = 500000;
      const tooLarge = selectedFile.size > MAX_SIZE;

      if (allowedTypes.includes(selectedFile.type) && !tooLarge) {
        this.selectedFile = selectedFile;
        this.errorMessae = false;
        this.errorMessage = tooLarge
          ? `Too large. Max size is ${MAX_SIZE / 1000}kb`
          : "Only images are allowed";
      }
    },
    async uploadProduct() {
      const data = new FormData();
      data.append("product_image", this.selectedFile);
      data.append("product_name", this.product_name);
      data.append("product_price", this.product_price);
      data.append("product_category", this.product_category);
      data.append("product_description", this.product_description);

      if (this.$refs.observer.validate()) {
        try {
          let response = await axios.post("http://localhost:5000/upload", data);
          this.successMessage = response.data.message;
          this.error = false;
        } catch (error) {
          console.log(error);
          this.erroMessage = error.response.data.message;
          this.error = true;
        }
      }
      (this.selectedFile = ""),
        (this.product_name = ""),
        (this.product_price = ""),
        (this.product_category = ""),
        (this.product_description = ""),
        this.$refs.observer.reset();
    },
    clear() {
      (this.selectedFile = ""),
        (this.product_name = ""),
        (this.product_price = ""),
        (this.product_category = ""),
        (this.product_description = ""),
        this.$refs.observer.reset();
    },
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
          window.location.href = "/admin_dashboard";
        } catch (error) {
          console.log(error);
          this.errorMessage2 = error.response.data.msg;
        }
      }
    },
    async updateOrderStatus() {
      try {
        let response = await axios.put("http://localhost:5000/api/updateOrderStatus", {
           orderId: this.orderId
        })
        this.$store.dispatch("getOrders");
        this.successMessage3 = response.data.msg
        this.orderStatus = response.data.order.status 
      } catch(error) {
        console.log(error)
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
          this.successMessage4 = response.data.msg;
          this.snackbar2 = true
         // alert(response.data.msg)
         } catch(error) {
           console.log(error)
           //alert(error.response.data.msg)
           this.errorMessage4 = error.response.data.msg
           this.snackbar3 = true
         }
       }
       this.currentPassword = "",
       this.newPassword = "",
       this.newPasswordConfirm = "",
       this.$refs.observer.reset();
    }
  },
};
</script>

<style scoped>
.container {
  padding: 0 !important;
}
</style>
