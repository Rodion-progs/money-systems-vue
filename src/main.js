import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/commands/message.plugin'
import Loader from '@/components/app/Loader'
import dateFilter from '@/filter/date.filter'
import localizeFilter from '@/filter/localize.filter'
import currencyFilter from '@/filter/currency.filter'
import titlePlugin from '@/commands/title.plugin'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)
firebase.initializeApp({
  apiKey: "AIzaSyBoRzXZXDNBQXLgrTgtNJc7BjNQXNcsXIs",
  authDomain: "vue-crm-rodion.firebaseapp.com",
  databaseURL: "https://vue-crm-rodion.firebaseio.com",
  projectId: "vue-crm-rodion",
  storageBucket: "vue-crm-rodion.appspot.com",
  messagingSenderId: "977999402814",
  appId: "1:977999402814:web:85f74d653dd26e81debe6f",
  measurementId: "G-LQBPSV7RKR"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})


