<template>
    <div>
        <h1>
            Удалить контакт <span>{{ info.name }}</span>?
        </h1>
        <button 
            class="a-btn"
            @click.prevent="deleteContact(info.id)" 
            type="button"
        >
            да
        </button>
        <button 
            class="a-btn"
            @click.prevent="$emit('close')" 
            type="button"
        >
            нет
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['info'],
    data(){
        return {
            contact: {
                id: undefined,
                name: ''
            },
        }
    },
    methods: {
        ...mapActions('contacts', ['deleteItem']),
        deleteContact(){
            this.deleteItem(this.contact).then(()=>{
                this.$emit('close')
            })
        }
    }

}
</script>

<style lang="sass">

</style>