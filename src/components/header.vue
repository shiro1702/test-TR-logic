<template>
    <header 
        class="header a-container"
        :class="'_' + pageName" 
    >
        <router-link 
            :to="{name: 'main'}" 
            class="header__link-main" 
            :class="'_' + pageName" 
            key="contacts"
        >
            <svg 
                v-if="pageName != 'main'"
                class="svg-icon"
            >
                <use xlink:href="#left"></use>
            </svg>
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
    // transition: all .3s
    // text-align: center
    &::before
        content: ''
        width: 100%
        transition: all .3s
    &::after
        content: ''
        width: 100%
        transition: all .3s
    &__link-main
        font-size: 16px
        transition: all .3s
        display: flex
        align-items: center
        // display: inline-block
        &._main
            font-size: 32px
    // &._main
        // margin: 0 auto
        // margin-left: auto
    &:not(._main)
        &::before
            width: 0px
</style>