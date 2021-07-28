import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    code: 1,
    registrant: '王香琴',
    Registered_unit: '厅长秘书处'
  },
  mutations: {
    registrant(state, name) {
      state.registrant = name
    },
    Registered_unit(state, unit) {
      state.Registered_unit = unit
    }
  },
  actions: {},
  modules: {}
})
