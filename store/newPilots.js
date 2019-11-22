import vue from 'vue'

export const state = () => ({
  createdPilotsForStar: {}
})

export const mutations = {
  saveNewPilot(state, { url, name }) {
    vue.set(state.createdPilotsForStar, url, [
      ...(state.createdPilotsForStar[url] || []),
      name
    ])
    localStorage.setItem(
      'createdPilotsForStar',
      JSON.stringify(state.createdPilotsForStar)
    )
  },
  refreshPilots(state, payload) {
    vue.set(state, 'createdPilotsForStar', payload)
  }
}
