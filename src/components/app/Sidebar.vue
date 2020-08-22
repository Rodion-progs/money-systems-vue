<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link v-for="link in links" :key="link.url" tag="li" active-class="active" :to="link.url" :exact="link.exact">
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>


  </ul>

</template>

<script>
  import localazeFilter from "@/filter/localize.filter";
  export default {
      name: "Sidebar.vue",
      props: ['value'],
      data: () => ({
          links: [
              {title: localazeFilter('Menu_Bill'), url: '/', exact: true},
              {title: localazeFilter('Menu_History'), url: '/history'},
              {title: localazeFilter('Menu_Planning'), url: 'planning'},
              {title: localazeFilter('Menu_Record'), url: 'record'},
              {title: localazeFilter('Menu_Category'), url: 'categories'}
          ]
      })
  }
</script>

<style scoped>

</style>