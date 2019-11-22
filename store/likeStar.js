export const state = () => ({
  likedStars: []
})
export const mutations = {
  toggleLikedStars(state, { star, pilots }) {
    const findedStarIndex = state.likedStars.findIndex((savedStar) => {
      return savedStar.url === star.url
    })
    if (findedStarIndex === -1) {
      const starWithPilots = { ...star, pilots }
      state.likedStars.push(starWithPilots)
    } else {
      state.likedStars.splice(findedStarIndex, 1)
    }
  }
}
