export default {
	namespaced: true,
    state: {
        modalContent: [],
    },
    getters: {
        openState(state){
            if (state.modalContent.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        active(state){
            return state.modalContent[state.modalContent.length - 1]
        }
    },
    mutations: {
        setModal(state, name){
            state.modalContent.push(name)
        },
        closeModal(state){
            state.modalContent.splice(- 1, 1)
        }
    },
}