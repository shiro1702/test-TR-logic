<template>
    <transition name="fade" >
        <section class="t-modal" @click="setActiveModal('')" >
            <div class="t-modal__close">
                <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.0417 26.8701L12.0209 38.8909L14.8493 41.7193L26.8701 29.6985L38.8909 41.7193L41.7194 38.8909L29.6985 26.8701L41.7194 14.8492L38.8909 12.0208L26.8701 24.0416L14.8493 12.0208L12.0209 14.8492L24.0417 26.8701Z" fill="#282E30"/>
                </svg>
            </div>
            <slot>
                <transition name="fade">
                    <component v-bind:is="currentModalComponent" key="currentModalComponent" :id="id" @click.stop="">
                    </component>
                </transition>
            </slot>
        </section>
    </transition>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    // import signIn from '~/components/modals/SignIn.vue'
    // import reg from '~/components/modals/Reg.vue'

    export default {
        components:{
            // signIn,
            // reg
        },
        computed: {
            ...mapState('modal', ['active', 'modalContent'])
        },
        methods:{
            ...mapActions('modal', ['setActiveModal'])
        }
    }
</script>

<style lang="sass">

    .t-modal
        position: fixed
        top: 0
        left: 0
        width: 100vw
        height: 100vh
        z-index: 200 
        overflow-y: scroll
        transition: background .3s
        @media (max-width: 1024px)
            touch-action: manipulation
            touch-action: pan-y
            -webkit-overflow-scrolling: touch

        &__close
            position: fixed
            top: 50px
            right: 45px
            width: 54px
            height: 54px
            border-radius: 100%
            border: 2px solid transparent
            transition: border-color .3s
            cursor: pointer
            z-index: 100
            &:active
                transform: scale(0.98)
            @media (max-width: 1366px)
                top: 10px
                right: 25px
            @media (max-width: 770px)
                position: fixed
                top: 8px
                right: 8px
            svg 
                width: 100%
                height: 100%
            &:hover
                border: 2px solid $hightlight

</style>