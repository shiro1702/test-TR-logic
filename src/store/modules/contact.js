
// import { scaffoldStore } from "undo-redo-vuex";
import {
  scaffoldState,
  scaffoldActions,
  scaffoldMutations,
} from "undo-redo-vuex";

export default {
	namespaced: true,
  state: scaffoldState({
		item: {
      name: '',
      info: '',
      fields: []
    },
    startItem: {
      name: '',
      info: '',
      fields: []
    },
  }),
  mutations: scaffoldMutations({
    emptyState(state){
      state.item =  { ...state.startItem };
    },
		// создание контакта
		setItem(state, data){
      console.log(data);
			state.item = { ...{
        name: '',
        info: '',
        fields: []
      }, ...data};
      state.startItem = { ...{
        name: '',
        info: '',
        fields: []
      }, ...data};
    },
    editItem(state, data){
			state.item = {...state.item, ...data};
    },
    addField(state, data){
      
      state.item = { 
        ...state.item, 
        fields: [ 
          ...state.item.fields, 
          {
            name: '',
            value: '',
            ...data
          } 
        ]
      }
    },
    updateField: (state, item) => {
      console.log(item);
      console.log( [
        ...state.item.fields.slice(0, item.index),
      ]);
      console.log( [
        { ...state.item.fields.slice(item.index, item.index + 1)[0], ...item }, 
      ]);
      console.log( [
        ...state.item.fields.slice(item.index + 1)
      ]);
      console.log( [
        ...state.item.fields.slice(0, item.index), 
        { ...state.item.fields.slice(item.index, item.index + 1)[0], ...item }, 
        ...state.item.fields.slice(item.index + 1)
      ]);
      if (item.index != undefined) {
        state.item = { 
          ...state.item, 
          fields: [
            ...state.item.fields.slice(0, item.index), 
            { ...state.item.fields.slice(item.index, item.index + 1)[0], ...item }, 
            ...state.item.fields.slice(item.index + 1)
          ]
        }
        console.log(state.item);
      }
    },
    deleteField(state, i){
      state.item = { 
        ...state.item, 
        fields: [...state.item.fields.slice(0, i), ...state.item.fields.slice(i+1)]
      }
    },
  }),
  actions: scaffoldActions({}),
};