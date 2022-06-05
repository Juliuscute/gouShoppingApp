<template>
  <div>
    <Navbar />
    <v-container>
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
      <v-card class="mx-4">
        <v-card-text class="text-center blue white--text font-weight-bold mt-8">
          <v-icon dark>mdi-upload</v-icon>&nbsp; Upload product
        </v-card-text>
        <div class="mx-4 mb-8">
      
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
                name="product name"
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
                name="product price"
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
                name="location"
                rules="required|max:100"
              >
                <v-text-field
                  v-model="location"
                  :counter="100"
                  :error-messages="errors"
                  label="Your Location"
                  prepend-icon="mdi-map-marker"
                  required
                  color="#0D47A1"
                >
                </v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="phone"
                rules="required|numeric|max:50|min:9"
              >
                <v-text-field
                  v-model="phone"
                  :error-messages="errors"
                  label="Phone number"
                  prepend-icon="mdi-phone"
                  required
                  color="#0D47A1"
                >
                </v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="product description"
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
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";

export default {
  name: "Sell",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      successMessage: "",
      errorMessage: "",
      selectedFile: null,
      product_name: "",
      product_price: "",
      product_category: "",
      location: "",
      phone: "",
      product_description: "",
      user: "",
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
    };
  },
  created() {
    this.user = this.$store.getters.getUser.firstName;
  },
  
  methods: {
    selectFile() {
      const selectedFile = this.$refs.fileInput.files[0];
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      this.selectedFile = selectedFile;
      if (!allowedTypes.includes(selectedFile.type)) {
        this.errorMessage = "Only images are allowed";
      }
      if (selectedFile.size > 500000) {
        this.errorMessage = "too large, Max size is 500kb";
      }
    },
    async uploadProduct() {
      const data = new FormData();
      data.append("product_image", this.selectedFile);
      data.append("product_name", this.product_name);
      data.append("product_price", this.product_price);
      data.append("user", this.user);
      data.append("product_category", this.product_category);
      data.append("location", this.location);
      data.append("phone", this.phone);
      data.append("product_description", this.product_description);

      if (this.$refs.observer.validate()) {
        try {
          let response = await axios.post("http://localhost:5000/api/student_upload", data);
          this.successMessage = response.data.msg;
          this.error = false;
        } catch (error) {
          console.log(error);
          this.errorMessage = error.response.data.error;
          this.error = true;
        }
      }
         this.selectedFile = "",
         this.product_name = "",
         this.product_price = "",
         this.product_category = "",
         this.location = "",
         this.phone = "",
         this.product_description = "",
         this.$refs.observer.reset();
    },
    clear() {
         this.selectedFile = "",
         this.product_name = "",
         this.product_price = "",
         this.product_category = "",
         this.location = "",
         this.phone = "",
         this.product_description = "",
         this.$refs.observer.reset();
    },
  },
};
</script>

<style></style>
