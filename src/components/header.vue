<template>
    <header 
        class="header"
        :class="'_' + pageName" 
    >
        <nav class="header__content a-container">
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
        </nav>
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
    // padding: 24px 0px
    margin-bottom: 24px
    background: $cartBG
    // transition: all .3s
    // text-align: center
    &__content
        display: flex
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
        &._main
            font-size: 32px
        &:not(._main)
            &:hover
                color: $primary
    &:not(._main)
        .header__content
            &::before
                width: 0px
</style>