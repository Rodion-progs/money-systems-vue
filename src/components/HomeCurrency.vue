<template>
  <div class="col s12 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur of currencies" :key="cur">
            <td data-label="Валюта">{{cur}}</td>
            <td data-label="Курс">{{getCurrency(cur) | currency()}}</td>
            <td data-label="Дата">{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['rates', 'date'],
    data: () => ({
      currencies: ['USD', 'EUR']
    }),
    methods: {
      getCurrency(currency) {
        return this.rates['RUB']/ this.rates[currency]
      }
    }
  }
</script>