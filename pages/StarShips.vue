<template>
  <div class="st-main">
    <h1>
      Список кораблей
    </h1>
    <div
      v-for="(valueStarShip, idStarShip) in StarList.results"
      :key="idStarShip"
    >
      <star-card
        :name="valueStarShip.name"
        :pilot-list="getAllPilots(valueStarShip)"
        @like="
          toggleLikedStars({
            star: valueStarShip,
            pilots: getAllPilots(valueStarShip)
          })
        "
        @create-pilot="dialog = valueStarShip.url"
      />
      <create-new-pilot
        :visible="dialog === valueStarShip.url"
        @update:visible="onVisibilityChange($event, valueStarShip.url)"
        @add-pilot="create($event, valueStarShip)"
      />
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="StarList.count"
      :disabled="disabled"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import StarCard from '@/components/StarCard.vue'
import createNewPilot from '@/components/createNewPilot'

export default {
  components: {
    StarCard,
    createNewPilot
  },
  data() {
    return {
      disabled: false,
      dialog: false
    }
  },
  computed: {
    ...mapState('StarList', ['StarList', 'pilotForStar']),
    ...mapState('newPilots', ['createdPilotsForStar'])
  },
  fetch({ store }) {
    const createdPilotsA = JSON.parse(localStorage.getItem('createdPilots'))
    const likedStars = JSON.parse(localStorage.getItem('starsWithLike'))
    store.commit('newPilots/refreshPilots', createdPilotsA || {})
    store.commit('likeStar/refreshLikedStars', likedStars || [])
    return store.dispatch('StarList/getStarList')
  },
  methods: {
    ...mapActions('StarList', ['getStarList']),
    ...mapMutations('likeStar', ['toggleLikedStars']),
    ...mapMutations('newPilots', ['saveNewPilot']),

    changePage(event) {
      this.disabled = true
      this.getStarList({ page: event }).then(() => {
        this.disabled = false
      })
    },
    getAllPilots(star) {
      return [
        ...this.getPilotByLink(star.pilots),
        ...(this.createdPilotsForStar[star.url] || [])
      ]
    },
    getPilotByLink(pilotLinkList) {
      return pilotLinkList.map((link) => {
        return this.pilotForStar[link]
      })
    },
    onVisibilityChange(e, url) {
      this.dialog = e ? url : ''
    },
    create(name, star) {
      const starWithNewPilot = {
        url: star.url,
        name
      }
      this.saveNewPilot(starWithNewPilot)
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
