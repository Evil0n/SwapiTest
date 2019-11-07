import Vue from 'vue'

export const state = () => ({
  people: {},
  currentPage: 1
})
export const mutations = {
  setPeople(state, payload) {
    Vue.set(state, 'people', payload)
  }
}

export const actions = {
  async getPeople({ commit }, payload = {}) {
    const { data } = await this.$axios.get(`/api/people`, {
      props: { page: payload.page || 1 }
    })
    commit('setPeople', data)
    return data
  }
}
