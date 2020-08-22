<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody v-for="(record) of records" :key="record.id">
    <tr>
      <td data-label="#">{{ record.number}}</td>
      <td data-label="Сумма">{{ record.amount | currency('RUB') }}</td>
      <td data-label="Дата">{{ record.date | date('datetime') }}</td>
      <td data-label="Категория">{{record.categoryName}}</td>
      <td data-label="Тип">
        <span
                :class="[record.typeClass]"
                class="white-text badge"
        >{{record.typeText}}</span>
      </td>
      <td data-label="Открыть">
        <button
                v-tooltip="'Посмотреть запись'"
                class="btn-small btn"
                @click="$router.push('/detail/' + record.id)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>


<script>
  export default {
    name: "HistoryTable.vue",
    props: {
      records: {
        required: true,
        type: Array
      }
    }
  }
</script>
