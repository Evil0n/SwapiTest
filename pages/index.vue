<template>
  <div>
    <h1>
      Список пилотов
    </h1>
    <pilot-card :name="people.name" :ship-list="[{ name: 'valeraOdin' }]" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PilotCard from '@/components/PilotCard.vue'
export default {
  components: {
    PilotCard
  },
  computed: {
    ...mapState('people', ['people'])
  },
  fetch({ store }) {
    store.dispatch('people/getPeople')
  }
}
</script>
