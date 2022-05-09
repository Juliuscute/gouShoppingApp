import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart' )
let currentUser = window.localStorage.getItem('currentUser')
let products = window.localStorage.getItem('products')
let totalUsers = window.localStorage.getItem('totalUsers')
let orders = window.localStorage.getItem('orders')
let pendingOrders = window.localStorage.getItem('pendingOrders')


export default new Vuex.Store({
  state: {
    products: products ? JSON.parse(products) : {},
    totalUsers: totalUsers ? JSON.parse(totalUsers) : {},
    singleProduct: null,
    singleOrder:  null,
    cart: cart ? JSON.parse(cart) : [],
    currentUser: currentUser ? JSON.parse(currentUser) : {},
    orders: orders ? JSON.parse(orders) : {},
    pendingOrdersCount: '',
    pendingOrders: pendingOrders ? JSON.parse(pendingOrders) : {},
    token: '',
    shippingFee: '',
    shippingAddress: '',
    paystackDetail: {
      PUBLIC_KEY: "pk_test_a973cab5c0b817667802879a7a38bf0d9edc4198",
      close: () => { console.log("Closed payment portal -_-");    }
  }
  },
  getters: {
    cartItemCount(state){
      return state.cart.length;
    },
    getTotalProducts(state) {
      return state.products.length;
    },
    getTotalUsers(state) {
      return state.totalUsers
    },
    getOrders(state) {
      return state.orders;
    },
    totalSales(state) {
     return state.orders.length
    },
    getProducts(state) {
      return state.products
    },
    totalPrice(state) {
      let price = 0;
      state.cart.forEach( item =>   price += item.product.product_price * item.productQuantity )
      return price
  },
  isLoggedIn(state) {
    let token = state.token
    if(!token) {
      token = JSON.parse(window.localStorage.getItem('token'))
    }
    return token
  },

  getUser(state) {
    return state.currentUser
  },
  cart(state) {
    return state.cart
  },
  get_paystack_details(state) {
    return state.paystackDetail
  },
  getShippingFee(state) {
    return state.shippingFee
  },
  shippingAddress(state) {
    return state.shippingAddress
  }
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
      window.localStorage.setItem('products', JSON.stringify(state.products))
    },
    SET_TOTAL_USERS(state, totalUsers) {
      state.totalUsers = totalUsers;
      window.localStorage.setItem('totalUsers', JSON.stringify(state.totalUsers))
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
      window.localStorage.setItem('orders', JSON.stringify(state.orders))
    }, 
    PENDING_ORDERS_COUNT(state, pendingOrdersCount) {
      state.pendingOrdersCount = pendingOrdersCount
    },
    PENDING_ORDERS(state, pendingOrders) {
      state.pendingOrders = pendingOrders
      window.localStorage.setItem('pendingOrders', JSON.stringify(state.pendingOrders))
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
      state.singleProduct = product      
    },
    VIEW_ORDER(state, order) {
      state.singleOrder = order
    }, 
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },

    LOG_OUT(state) {
      state.currentUser = {}
      state.cart = {}
      window.localStorage.removeItem('currentUser');
      window.localStorage.removeItem('token'); 
      window.localStorage.removeItem('cart'); 
    },
    SHIPPING_FEE(state, shippingFee) {
      state.shippingFee = shippingFee
    },
    SHIPPING_ADDRESS(state, address) {
      state.shippingAddress = address
    }

  },
  actions: {
    async getProducts({ commit }) {
      let response = await  axios.get("http://localhost:5000/api/fetch")
      let products = response.data;
      commit('SET_PRODUCTS', products);  
    },
    //get total users
    async getTotalUsers({commit}) {
      let response = await axios.get("http://localhost:5000/api/getUsers")
      let totalUsers = response.data;
      commit("SET_TOTAL_USERS", totalUsers) 
    },
    //Get orders
   async getOrders({commit}) {
     let response = await axios.get("http://localhost:5000/api/getOrders")
     let orders = response.data
     commit("SET_ORDERS", orders)
   },
   //Get pending orders count
   async getPendingOrdersCount ({commit}) {
     let response = await axios.get("http://localhost:5000/api/getPendingOrdersCount")
     let pendingOrdersCount = response.data
     commit("PENDING_ORDERS_COUNT", pendingOrdersCount)
   },
   //Get pending orders count
   async getPendingOrders ({commit}) {
    let response = await axios.get("http://localhost:5000/api/getPendingOrders")
    let pendingOrders = response.data
    commit("PENDING_ORDERS", pendingOrders)
  },
    // Add single product to cart
    addToCart({commit}, {product, productQuantity}) {
      commit('ADD_TO_CART', {product, productQuantity});
    },
    removeProduct({commit}, item) {
      commit('REMOVE_ITEM', item)
    },
    clearAll({commit}) {
      commit('REMOVE_ALL')
    },
    viewProduct({commit}, product) {
      commit('VIEW_PRODUCT', product)
    },
    viewOrder({commit}, order) {
      commit('VIEW_ORDER', order)
    },
    loginUser({commit}, {token, user}) { 
      commit('SET_CURRENT_USER', user);
      commit('SET_TOKEN', token);

      // set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
   async processPayment({getters}, payload) {
       //on succesful payment, create the order and send to the server

      const cartItems = JSON.stringify(getters.cart)
      const items = JSON.parse(cartItems)
      const productNames = JSON.stringify(items.map(el => el.product.product_name + ',' + " " + "product quantity is" + " " + el.productQuantity + " "))
      
       let order = {
        cart: productNames,
        customerId: getters.getUser.id,
        customerEmail: getters.getUser.email,
        customerName: getters.getUser.firstName,
        customerPhone: getters.getUser.phone,
        total: getters.totalPrice + parseInt(getters.getShippingFee), 
        paystackReference: payload.reference,
        shippingMode: getters.getShippingFee == 10 ? 'Fast' : 'Standard',
        shippingFee: getters.getShippingFee,
        shippingAddress: getters.shippingAddress
    };
    try {
      let response = await axios.post("http://localhost:5000/api/order", order)
      console.log(response)
      window.localStorage.removeItem('cart'); 
      window.location.href = '/'
      
    }
    catch(error){
      console.log(error)
    }
    },
    
    
    shippingMethod({commit}, shippingFee) {
      commit('SHIPPING_FEE', shippingFee)
    },
    shippingAddress({commit}, address) {
      commit('SHIPPING_ADDRESS', address)
    },
   
    logOut({commit}) {
      commit('LOG_OUT');
    }
 
  },

  modules: {
  }
})
