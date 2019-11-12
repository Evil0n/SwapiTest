<template>
  <div class="st-main">
    <h1>
      Список пилотов
    </h1>
    <pilot-card
      v-for="(pilot, id) in people.results"
      :key="id"
      :name="pilot.name"
      :ship-list="getStarshipsByLink(pilot.starships)"
    />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="people.count"
      :disabled="disabled"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PilotCard from '@/components/PilotCard.vue'
export default {
  components: {
    PilotCard
  },
  data() {
    return {
      disabled: false
    }
  },
  computed: {
    ...mapState('people', ['people', 'starshipsForPilots'])
  },
  fetch({ store }) {
    return store.dispatch('people/getPeople')
  },
  methods: {
    ...mapActions('people', ['getPeople']),
    changePage(event) {
      this.disabled = true
      this.getPeople({ page: event }).then(() => {
        this.disabled = false
      })
    },
    getStarshipsByLink(starshipsLinkList) {
      return starshipsLinkList.map((link) => {
        return this.starshipsForPilots[link]
      })
    }
  }
}
</script>
<style scoped lang="scss">
.st-main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
