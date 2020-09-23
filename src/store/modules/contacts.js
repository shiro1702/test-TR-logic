export default {
	namespaced: true,
	state: {
		items: [
			{
				id: 1,
				name: 'Ивановский Иван Иванович',
				info: 'короткая информация 1',
				favorite: true,
				fields: [
					{
            id: 1,
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
            id: 2,
						name: 'email',
						value: 'test@test.te'
					}
				]
			},
			{
				id: 2,
				name: 'Петровский Пётр Петрович',
				info: 'короткая информация 2',
				fields: []
			},
			{
				id: 3,
				name: 'Сидоров Иван Анатольевич',
				info: 'короткая информация 1',
				favorite: true,
				fields: [
					{
            id: 3,
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
            id: 4,
						name: 'email',
						value: 'test@test.te'
					}
				]
			},
			{
				id: 4,
				name: 'Степанов Степан Иванович',
				info: 'короткая информация 1',
				fields: [
					{
            id: 5,
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
            id: 6,
						name: 'email',
						value: 'test@test.te'
					}
				]
			},
			{
				id: 5,
				name: 'Ивановский Станислав Иванович',
				info: 'короткая информация 1',
				fields: [
					{
            id: 7,
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
            id: 8,
						name: 'email',
						value: 'test@test.te'
					}
				]
			},
			{
				id: 6,
				name: 'Ивановский Иван Иванович',
				info: 'короткая информация 1',
				favorite: true,
				fields: [
					{
            id: 9,
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
            id: 10,
						name: 'email',
						value: 'test@test.te'
					}
				]
			},
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
        console.log(item.id);
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