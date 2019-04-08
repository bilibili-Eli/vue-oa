import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import dictionary from './modules/dictionary'
import user from './modules/user'
import menus from './modules/menus'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    menus,
    dictionary
  },
  getters
})

export default store
