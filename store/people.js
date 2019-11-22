import Vue from 'vue'

export const state = () => ({
  people: {},
  currentPage: 1,
  starshipsForPilots: {},
  StarList: {},
  pilotForStar: {}
})
export const mutations = {
  setPeople(state, payload) {
    Vue.set(state, 'people', payload)
  },
  saveStarship(state, payload) {
    Vue.set(state.starshipsForPilots, payload.id, payload.starship)
  },
  /* asdlfkhgasodjfhasgfjasdhgfkjhasgdkfjhasdgkfhgsakdhfksjadhgfkjsahgdfkjhsagkdjfhgskadjfhgksajdghfkjsadhgfkjsdgh */
  setStarList(state, payload) {
    Vue.set(state, 'starList', payload)
  },
  saveStarPilot(state, payload) {
    Vue.set(state.pilotForStar, payload.id, payload.starship)
  }
}

export const actions = {
  async getPeople({ commit, dispatch }, payload = {}) {
    const { data } = await this.$axios.get(`/api/people`, {
      params: { page: payload.page || 1 }
    })
    let starships = []
    data.results.map((pilot) => {
      starships = [...starships, ...pilot.starships]
    })
    await Promise.all(
      starships.map((url) => {
        return dispatch('getStarship', { url })
      })
    )
    commit('setPeople', data)
    return data
  },
  async getStarship({ commit, state }, payload = {}) {
    if (!payload.url) {
      return
    }
    if (!state.starshipsForPilots[payload.url]) {
      let id = payload.url.split('/')
      id = id[id.length - 2]
      const { data } = await this.$axios.get(`/api/starships/${id}`)
      commit('saveStarship', { id: payload.url, starship: data })
      return data
    }
    return state.starshipsForPilots[payload.url]
  }
}
