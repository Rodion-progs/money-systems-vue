<template>
  <div>
  <div class="page-title">
    <h3>{{'ProfileTitle'| localize}}</h3>
  </div>

  <form class="form" @submit.prevent="sumbitHandler">
    <div class="input-field">
      <input
              id="description"
              type="text"
              v-model="name"
              :class="{invalid: ($v.name.$dirty && !$v.name.required)}"

      >

      <label for="description">{{'Name' | localize}}</label>
      <small class="helper-text"
             v-if="$v.name.$dirty && !$v.name.required"
      >{{'Message_EnterName'| localize}}</small>
    </div>
    <div class="switch">
      <label>
        English
        <input type="checkbox" class="checkbox" v-model="isRuLocale">
        <span class="lever"></span>
        Русский
      </label>
    </div>
    <button class="btn waves-effect waves-light" type="submit">
      {{'Update' | localize}}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from "vuelidate/lib/validators"
import localizeFilter from "@/filter/localize.filter"
export default {
  name: 'profile',
  metaInfo() {
    return {
      title: this.$title('Title_Profile')
    }
  },
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: {required}
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async sumbitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  }
}
</script>
<style scoped>
  .switch{
    margin-bottom: 2rem;
  }
</style>

