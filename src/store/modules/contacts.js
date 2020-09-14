export default {
	namespaced: true,
	state: {
		items: [
			{
				id: 1,
				name: 'Ивановский Иван Иванович',
				info: 'короткая информация 1',
				favorite: true,
				fealds: [
					{
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
						name: 'email',
						value: 'test@test.te'
					}
				]
			},
			{
				id: 2,
				name: 'Петровский Пётр Петрович',
				info: 'короткая информация 2',
				fealds: []
			},
			{
				id: 3,
				name: 'Сидоров Иван Анатольевич',
				info: 'короткая информация 1',
				favorite: true,
				fealds: [
					{
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
						name: 'email',
						value: 'test@test.te'
					}
				]
			},
			{
				id: 4,
				name: 'Степанов Степан Иванович',
				info: 'короткая информация 1',
				fealds: [
					{
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
						name: 'email',
						value: 'test@test.te'
					}
				]
			},
			{
				id: 5,
				name: 'Ивановский Станислав Иванович',
				info: 'короткая информация 1',
				fealds: [
					{
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
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
				fealds: [
					{
						name: 'телефон',
						value: '+7 999 999 99 99'
					},
					{
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
          if (item1.name < item2.name){
            return -1;
          }
          if (item1.name > item2.name){
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
			let date = new Date().getTime() 
			state.items.push({...data, id: date})
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
		setFavorite({commit}, item){
			item.favorite = !item.favorite;
			commit('editItem', item);
		}
	}
};