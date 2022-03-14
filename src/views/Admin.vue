<template>
  <v-container fluid>
       <v-app-bar color = 'blue' flat app>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up white--text"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-uppercase white--text mt-8">
            <h5 class="white--text hidden-sm-and-down">Admin</h5>
          </v-toolbar-title>
            
          <v-spacer></v-spacer>
          <v-divider vertical class="hidden-sm-and-down"></v-divider>
              <v-btn color="white" text>
                <span class="hidden-sm-and-down ml-4">Logout</span>&nbsp;
                <v-icon small class="hidden-sm-and-down">mdi-logout</v-icon>
              </v-btn>
       </v-app-bar>
       <v-navigation-drawer v-model="drawer" app color="blue" temporary>
          <p>text</p>
       </v-navigation-drawer>
       <v-container class="mb-4">
        <v-alert  v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`" >{{ message }} <span right><v-icon>mdi-close</v-icon></span></v-alert>
        <v-tabs  align-with-title background-color="#0D47A1" class="mt-8" dark>
            <v-tab color="pink">
              <h4 class="caption">Upload products</h4>&nbsp;
              <v-icon small>mdi-upload</v-icon>
            </v-tab>
            <v-tab>
              <h4 class="caption">View orders</h4>&nbsp;
              <v-icon small>mdi-view-dashboard-variant-outline</v-icon>
            </v-tab>
            <!--Tab for uploading products-->
            <v-tab-item>
              <validation-observer ref="observer" v-slot="{ invalid }">
                  <form @submit.prevent="uploadProduct" method="POST" enctype="multipart/form-data">
                        <input 
                         type="file"
                         style="display: none"
                         
                         required
                         @change="selectFile"
                         ref="fileInput"
                        >
                        <v-btn class="mt-4" raised @click="$refs.fileInput.click()">
                          <v-icon>mdi-camera</v-icon>&nbsp; 
                          select product
                        </v-btn><br class="hidden-md-and-up">
                         <span v-if="selectedFile" class="pa-2" style=" border: 1px solid whitesmoke;">
                           {{selectedFile.name}}
                         </span>
                    <validation-provider v-slot="{ errors }" name="product_name" rules="required|max:30">
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
                  
                    <validation-provider v-slot="{ errors }" name="product_price" rules="required|numeric|max:50"> 
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

                    <validation-provider v-slot="{ errors }" name="product_description" rules="required|max:150">
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
                      class="mr-4"
                      color="blue"
                      outlined
                      type="submit"
                      :disabled="invalid"
                    >
                      upload
                    </v-btn>
                    <v-btn id="btn-clear" @click="clear" color="red" outlined>
                      clear
                    </v-btn>
                  </form>
                </validation-observer>
            </v-tab-item>

            <!--Tab for uploading products-->
            <v-tab-item>
              <h4>
                orders page
              </h4>
            </v-tab-item>
        </v-tabs>
       </v-container>
         <Footer />
  </v-container>        
</template>

<script>
import axios from 'axios';
import Footer from '@/components/Footer'
     export default {
       components: { 
     Footer
     },
       data() {
         return {
           message: '',
           error: false,
           selectedFile: null,
           product_name: '',
           product_price: '',
           product_category: '',
           product_description: '',
           drawer: false,
           items: ['Clothes', 'Shoes', 'Phones', 'Computers', 'watches and jewelries', 'Home Theater', 'TV', 'Others', 'kitchen_appliance'],
          };
        },
        methods: {
          selectFile(event) {
            const selectedFile = event.target.files[0]
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const MAX_SIZE = 500000;
            const tooLarge = selectedFile.size > MAX_SIZE;

            if(allowedTypes.includes(selectedFile.type) && !tooLarge) {
              this.selectedFile = selectedFile;
              this.error = false;
              this.message = '';
            } else {
              this.error = true;
              this.message = tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}kb` : "Only images are allowed"
            }  
          },
         async uploadProduct() {
            const data = new FormData()
            data.append('product_image', this.selectedFile);
            data.append('product_name', this.product_name);
            data.append('product_price', this.product_price);
            data.append('product_category', this.product_category);
            data.append('product_description', this.product_description);
          
          if (this.$refs.observer.validate()) {
          try {
             await axios.post('http://localhost:5000/upload', data)
             this.message = 'Product has been uploaded !'
             this.error = false;
             
           } catch(err) {
             console.log(err);
             this.message = err.response.data.error;
             this.error = true;
           }
     
          } 
          this.selectedFile = '',
          this.product_name = '',
          this.product_price = '',
          this.product_category = '',
          this.product_description = '',
          this.$refs.observer.reset()
        },
        clear() {
          this.selectedFile = '',
          this.product_name = '',
          this.product_price = '',
          this.product_category = '',
          this.product_description = '',
          this.$refs.observer.reset()
        }
      }
    }

</script>


<style scoped>
.container {
  padding: 0 !important;

}

.is-success {
  background-color: #C8E6C9;
  text-align: center;
  color: rgb(56, 54, 54);
  font-weight: bold;
  border-left: 5px solid #4CAF50;
}

.is-danger {
background-color:  #FFCDD2;
text-align: center;
color: rgb(250, 56, 56);
font-weight: bold;
 border-left: 5px solid red;
}

</style>