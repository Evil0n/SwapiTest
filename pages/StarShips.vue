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
        :pilot-list="getPilotByLink(valueStarShip.pilots)"
        @like="
          toggleLikedStars({
            valueStarShip,
            pilots: getPilotByLink(valueStarShip.pilots)
          })
        "
        @create-pilot="dialog = !dialog"
      />
      {{ valueStarShip.name }}
      <create-new-pilot
        :star="valueStarShip"
        :visible="dialog"
        @update:visible="dialog = $event"
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
    const createdPilotsA = JSON.parse(
      localStorage.getItem('createdPilotsForStar')
    )
    store.commit('newPilots/refreshPilots', createdPilotsA)
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
    getPilotByLink(pilotLinkList) {
      return pilotLinkList.map((link) => {
        return this.pilotForStar[link]
      })
    },
    create(name, star) {
      /* вытащить урл корабля (стар), создать объект в котором должны быть скомпанованы имя и ай ди корабля */
      console.log(name, 'name', star, 'star', { [star.url]: [name] })
      console.log(this.getPilotByLink(star.pilots))
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
