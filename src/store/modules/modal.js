export const state = () => ({
    active: false,
    modalContent: ''
})

export const mutations = {
    set(state, [key, val]){
        // console.log(key);
        // console.log(val);
        state[key] = val;
    },
}

export const actions = {
    openModal({commit}) {
        console.log('openModal');
        commit('set', ['active', true])
    },
    setActiveModal({commit}, data) {
        commit('set', ['active', data])
    },
    setModalContent({commit}, data){
        console.log(data);
        
        commit('set', ['active', true])
        commit('set', ['modalContent', data])
    }
}

export default {
    state,
    mutations,
    actions,
}