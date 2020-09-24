
import {
    scaffoldState,
    scaffoldActions,
    scaffoldMutations,
} from "undo-redo-vuex";

export default {
	namespaced: true,
    state: scaffoldState({
        // редактируемый обьект контакта
        item: {
            name: '',
            info: '',
            fields: []
        },
        // для сброса к начальному 
        startItem: {
            name: '',
            info: '',
            fields: []
        },
    }),
    mutations: scaffoldMutations({
        // пришлось сделать такой способ присваивания, для работы отмены
        emptyState(state){
            state.item =  { ...state.startItem };
        },
        // старт редактирования
		setItem(state, data){
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
        // редактирование имени и информации
        editItem(state, data){
            state.item = {...state.item, ...data};
        },
        // редактирование полей с телефонами и т.д.
        addField(state, data){
            state.item = { 
                ...state.item, 
            fields: [ 
                ...state.item.fields, 
                {
                    id: new Date().getTime(), 
                    name: '',
                    value: '',
                    ...data
                } 
            ]
            }
        },
        updateField: (state, item) => {
            if (item.index != undefined) {
                state.item = { 
                    ...state.item, 
                    fields: [
                    ...state.item.fields.slice(0, item.index), 
                    { ...state.item.fields.slice(item.index, item.index + 1)[0], ...item }, 
                    ...state.item.fields.slice(item.index + 1)
                ]
                }
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