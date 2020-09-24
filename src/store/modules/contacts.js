export default {
	namespaced: true,
	state: {
		items: [
		]
	},
	getters: {
		// короткий отсортированный массив контактов для аваода на главной
		itemsShort(state){
			return state.items
				// трансформация массива доя меньшего веса
				.map(item => {
					return { 
						id: item.id, 
						name: item.name, 
						info: item.info,
						favorite: item.favorite
					}
				})
				// сортировка по имени
				.sort( (item1, item2) => {
					if (item1.name.toLowerCase() < item2.name.toLowerCase()){
						return -1;
					}
					if (item1.name.toLowerCase() > item2.name.toLowerCase()){
						return 1;
					}
					return 0
				});
		},
		// фильтрация короткого отсортированного массива контактов
		filterItems: (state, getters) => params => {
			// params - обьект для фильтрации массива контактов
			// params.q - поиск по части имени
			// params.favorite - поиск по избранным контактам
			// сорировки могут пересекатся

			// поиск софпадения по части имени
			let seacrch = item => item.name.toLowerCase().indexOf(params.q.toLowerCase()) !== -1;
			// поиск по избранным
			let favorite = item => item.favorite === true;
			// дефолтная фукнция сортировки
			let callback = () => true
			// комбинирование в зависимости от условмй
			if (params.q != '') {
				if (params.favorite) {
					callback = (item) => ( seacrch(item) && favorite(item) )
				} else {
					callback = (item) => seacrch(item) 
				}
			} else {
				if (params.favorite) {
					callback = (item) => favorite(item) 
				}
			}
			return getters.itemsShort.filter(callback);
		},
		// возвращает контакт с полной информацией по id
		getItemById: state => id => {
			return state.items.find(item => item.id == id);
		}
	},
	mutations: {
		// создание контакта
		createItem(state, data){ 
			state.items.push(data)
		},
		// редактивроание контакта
		editItem(state, data){
			let i = state.items.findIndex(item => item.id == data.id);
			state.items.splice(i, 1, Object.assign({}, state.items[i], data))
		},
		// удаление контакта
		deleteItem(state, id){
			let i = state.items.findIndex(item => item.id == id);
			state.items.splice(i, 1)
		}
	},
	actions: {
		// функция надстройка для задания или снятия флага избранного у контакта
		// setFavorite({commit}, item){
		// 	item.favorite = !item.favorite;
		// 	commit('editItem', item);
		// },
		saveItem({commit}, item){
			return new Promise((resolve) => {
				// console.log(item.id);
				if (item.id ){
					commit('editItem', item);
					resolve();
				} else {
					let newId = new Date().getTime() 
					commit('createItem', {...item, id: newId});
					resolve(newId);
				}
			})
		},
		// удаление контакта
		deleteItem({commit}, id){
			return new Promise((resolve) => {
				commit('deleteItem', id);
				resolve();
			})
		}
	}
};