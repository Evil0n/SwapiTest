import vue from 'vue'

export const state = () => ({
  createdPilotsForStar: {}
})

export const mutations = {
  saveNewPilot(state, { url, name }) {
    if (
      state.createdPilotsForStar[url] &&
      Array.isArray(state.createdPilotsForStar[url])
    ) {
      state.createdPilotsForStar[url].push(name)
    } else {
      vue.set(state.createdPilotsForStar, url, [name])
    }
    localStorage.setItem(
      'createdPilots',
      JSON.stringify(state.createdPilotsForStar)
    )
  },
  refreshPilots(state, pilots) {
    vue.set(state, 'createdPilotsForStar', pilots)
  }
}
