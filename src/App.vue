<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>
    import EmptyLayout from '@/layouts/EmptyLayout'
    import MainLayout from '@/layouts/MainLayout'
    export default {
        computed: {
            layout() {
                return this.$route.meta.layout + 'Layout' || 'empty' + 'Layout'
            }
        },
        components: {
            EmptyLayout, MainLayout
        }
    }
</script>
<style lang="sass">
  @import '~materialize-css/dist/css/materialize.min.css'
  @import 'assets/index.css'
</style>
