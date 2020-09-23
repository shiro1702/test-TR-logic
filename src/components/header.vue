<template>
    <header class="header a-container">
        <router-link 
            :to="{name: 'main'}" 
            class="header__link" 
            :class="pageName" 
            key="contacts"
        >
            Контакты
        </router-link>
    </header>
</template>

<script>
export default {
    computed: {
        pageName(){
            return this.$route.name
        },
    }
}
</script>

<style lang="sass">
.header
    display: flex

</style>