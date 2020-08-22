<template>
 <div>
   <loader v-if="loading"/>
   <div class="app-main-layout"  v-else>
     <Navbar @click="isOpen = !isOpen"/>
     <Sidebar v-model="isOpen" :key="locale"/>
     <main class="app-content" :class="{full: !isOpen}">
       <div class="app-page">
         <router-view />
       </div>
     </main>

     <div class="fixed-action-btn" >
       <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Добавить новую запись'">
         <i class="large material-icons">add</i>
       </router-link>
     </div>
   </div>
 </div>
</template>
<script>
  import Navbar from '@/components/app/Navbar'
  import Sidebar from '@/components/app/Sidebar'
  import messages from "../commands/messages";
  import M from "materialize-css";
  export default {
      name: 'main-layout',
      data: () => ({
          isOpen: true,
          loading: true,
      }),
    async mounted() {
        if (!Object.keys(this.$store.getters.info).length) {
          await this.$store.dispatch('fetchInfo')
        }
        this.loading = false
    },
    components: {
        Navbar, Sidebar
      },
    computed: {
      error() {
        return this.$store.getters.error
      },
      locale() {
        return this.$store.getters.info.locale
      }
    },
    methods: {
      updateWidth() {
        if(window.innerWidth < 650) {
          this.isOpen= false
        }
      }
    },
    created() {
      this.updateWidth();
    },
    watch: {
      // locale() {
      //   console.log('change')
      // },
      error(fbError) {
        this.$error(messages[fbError.code ] || 'Что-то пошло не так')
      },
      '$route'(to){
        this.updateWidth()
      }
    }
  }
</script>
