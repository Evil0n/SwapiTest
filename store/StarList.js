import Vue from 'vue'

export const state = () => ({
  currentPage: 1,
  StarList: {},
  pilotForStar: {}
})

export const mutations = {
  setStarList(state, payload) {
    Vue.set(state, 'StarList', payload)
  },
  saveStarPilot(state, payload) {
    Vue.set(state.pilotForStar, payload.id, payload.people)
  }
}

export const actions = {
  async getStarList({ commit, dispatch }, payload = {}) {
    const { data } = await this.$axios.get(`/api/starships`, {
      params: { page: payload.page || 1 }
    })
    let starPilot = []
    data.results.map((starship) => {
      starPilot = [...starPilot, ...starship.pilots]
    })
    await Promise.all(
      starPilot.map((url) => {
        return dispatch('getStarPilot', { url })
      })
    )
    commit('setStarList', data)
    return data
  },
  async getStarPilot({ commit, state }, payload = {}) {
    if (!payload.url) {
      return
    }
    if (!state.pilotForStar[payload.url]) {
      let id = payload.url.split('/')
      id = id[id.length - 2]
      const { data } = await this.$axios.get(`/api/people/${id}`)
      commit('saveStarPilot', { id: payload.url, people: data })
      return data
    }
    return state.pilotForStar[payload.url]
  }
}
