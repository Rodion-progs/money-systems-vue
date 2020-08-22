<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
                    v-for="c of categories"
                    :key="c.id"
                    :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
                  id="name"
                  type="text"
                  v-model="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span class="helper-text invalid"
                v-if="$v.title.$dirty && !$v.title.required"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{invalid: ($v.limit.$dirty && !$v.limit.minValue) || ($v.limit.$dirty && !$v.limit.required)}"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid"
                v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальное значение {{$v.limit.$params.minValue.min}}</span>
          <span class="helper-text invalid"
                v-if="$v.limit.$dirty && !$v.limit.required"
          >Поле не может быть пустым</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {minValue, required} from "vuelidate/lib/validators";
  import M from "materialize-css";

  export default {
    name: "CategoryEdit",
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      select: null,
      title: '',
      limit: 100,
      current: null
    }),
    validations: {
      title: {required},
      limit: {required, minValue: minValue(100)}
    },
    created() {
      const {id, title, limit} = this.categories[0]
      this.current = id
      this.title = title
      this.limit = limit
    },
    watch: {
      current(catId) {
        const {title, limit} = this.categories.find(c => c.id === catId)
        this.title = title
        this.limit = limit
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        try {
          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
          }
          await this.$store.dispatch('updateCategory', categoryData)
          this.$message('Категория успешно обновлена')
          this.$emit('updated', categoryData)
        } catch (e) {}
      }
    },
    mounted() {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.search.destroy()
      }
    }
  }
</script>

<style scoped>

</style>