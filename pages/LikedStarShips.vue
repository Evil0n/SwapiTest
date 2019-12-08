<template>
  <div class="st-main">
    <h1>
      Список кораблей
    </h1>
    <star-card
      v-for="(star, id) in likedStars"
      :key="id"
      :name="star.name"
      :pilot-list="star.pilots"
      @like="toggleLikedStars({ star })"
    />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import StarCard from '@/components/StarCard.vue'
export default {
  components: {
    StarCard
  },
  computed: {
    ...mapState('likeStar', ['likedStars'])
  },
  fetch({ store }) {
    const likedStars = JSON.parse(localStorage.getItem('starsWithLike'))
    store.commit('likeStar/refreshLikedStars', likedStars || [])
  },
  methods: {
    ...mapMutations('likeStar', ['toggleLikedStars'])
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
