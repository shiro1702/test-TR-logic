<template>
    <modal :open.sync="modalState">
        <component 
            v-if="active" 
            :is="active.modalName || active" 
            :info="active" 
            @close="modalState = false"
        />
    </modal>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import modal from '../modal.vue'
    import deleteContact from './deleteContact.vue'
    export default {
        data(){
            return {
                // component: '',
            }
        },
        computed: {
            ...mapGetters('modal', ['active', 'openState']),
            modalState:{
                get(){
                    return this.openState  
                },
                set(val){
                    if (!val) {
                        this.closeModal();
                    }
                }
            },
        },
        methods: {
            ...mapMutations('modal', ['closeModal'])
        },
        components: {
            deleteContact,
            modal
        }
    }
</script>

<style>

</style>