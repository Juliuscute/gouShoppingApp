import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart' )

export default new Vuex.Store({
  state: {
    products: [],
    singleProduct: [],
    cart: cart ? JSON.parse(cart) : [] 
  },
  getters: {
    cartItemCount(state){
      return state.cart.length;
    },
    totalPrice(state) {
      let price = 0;
      state.cart.forEach(item => {
          price += item.product.product_price * item.productQuantity;
      })
      return price;
  }
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
      
    ADD_TO_CART(state, {product, productQuantity}) {
    
      let productInCart = state.cart.find(item => item.product.productId === product.productId);
      if(productInCart) {
        productInCart.productQuantity ++;
      } else {
        state.cart.push({product, productQuantity})
      }     
     this.commit('saveProduct');
    },
    // save product in localStorage
    saveProduct(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    REMOVE_ITEM(state, item) {
      if(state.cart.length > 0) {
        //make a copy of each product and name it cartProduct
        //get the particular id that match the id of the product to be removed
        let cartItem = state.cart.some(cartProduct => cartProduct.productId === item.productId);
        if(cartItem) {
          let index = state.cart.findIndex(el => el.productId === item.productId )
        if(state.cart[index]["productQuantity"] !== 0) {
        state.cart[index]["productQuantity"] -= 1
        }
        //remove the product from cart if it's quantity is = 0
        if(state.cart[index]["productQuantity"] === 0) {
          state.cart.splice(index, 1)
        }
        }
      }
      //save the changes in localStorage
      this.commit('saveProduct');
    },
    REMOVE_ALL(state){
      state.cart = [];
      this.commit('saveProduct');
    },
    VIEW_PRODUCT(state, product) {
      // state.singleProduct.push(product)
      // this.commit('saveProduct');

      let viewSingle = state.singleProduct.find(item => item.productId === product.productId);
      if(!viewSingle) {
        state.singleProduct.push(product)
      }
      
    },

  },
  actions: {
    async getProducts({ commit }) {
      let response = await  axios.get("http://localhost:5000/fetch")
      let products = response.data;
      commit('SET_PRODUCTS', products);  
    },
   
    // Add single product to cart
    addProductToCart({commit}, {product, productQuantity}) {
      commit('ADD_TO_CART', {product, productQuantity});
    },
    removeProduct({commit}, item) {
      commit('REMOVE_ITEM', item)
    },
    clearAll({commit}) {
      commit('REMOVE_ALL')
    },
    view({commit}, product) {
      commit('VIEW_PRODUCT', product)
    },
  },

  modules: {
  }
})
