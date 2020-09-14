import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate';

import modal from './modules/modal';
import contacts from './modules/contacts';

export default new Vuex.Store({
  state: {
  },
	plugins: [createPersistedState({
		paths: [
			'contacts',
		]
	})],
  mutations: {
  },
  actions: {
  },
	modules: {
    modal,
    contacts
	},
})
