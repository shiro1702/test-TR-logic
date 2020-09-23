import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import createPersistedState from 'vuex-persistedstate';

import modal from './modules/modal';
import contacts from './modules/contacts';
import contact from './modules/contact';

import undoRedo from "undo-redo-vuex";

export default new Vuex.Store({
  state: {
  },
	plugins: [
    createPersistedState({
      paths: [
        'contacts',
      ],
    }),
    undoRedo({
      // The config object for each store module is defined in the 'paths' array
      paths: [
        {
          namespace: 'contact',
          // Any mutations that you want the undo/redo mechanism to ignore
          ignoreMutations: ['setItem', 'editItemShadow'],
        },
      ],
    }),

    // undoRedo({
    //   // NB: Include 'ignoreMutations' at root level, and do not provide the list of 'paths'.
    //   ignoreMutations: ["addShadow", "removeShadow"],
    // }),
  ],
  
  mutations: {
  },
  actions: {
  },
	modules: {
    modal,
    contacts,
    contact
  },
  strict: process.env.NODE_ENV !== 'production',
})
