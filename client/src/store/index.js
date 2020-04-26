import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import usuarios from './modules/usuarios'
import consultas from './modules/consultas'
import importacao from './modules/importacao'
import distribuidores from './modules/distribuidores'
import combustiveis from './modules/combustiveis'
import revendas from './modules/revendas'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    usuarios,
    consultas,
    importacao,
    distribuidores,
    combustiveis,
    revendas
  },
  getters
})

export default store
