<template>
    <transition name="fade" >
        <section v-if="open" class="a-modal" @click="close()">
            <div class="a-modal__content" @click.stop="">
                <div class="a-modal__close" @click="close()">
                    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0417 26.8701L12.0209 38.8909L14.8493 41.7193L26.8701 29.6985L38.8909 41.7193L41.7194 38.8909L29.6985 26.8701L41.7194 14.8492L38.8909 12.0208L26.8701 24.0416L14.8493 12.0208L12.0209 14.8492L24.0417 26.8701Z" fill="#282E30"/>
                    </svg>
                </div>
                <slot>
                    
                </slot>
            </div>
        </section>
    </transition>
</template>

<script>
    export default {
        props:['open'],
        methods: {
            close(){
                console.log('close')
                this.$emit('update:open', false);
            }
        }
    }
</script>

<style lang="sass">
    .a-modal
        position: fixed
        top: 0
        left: 0
        display: flex
        justify-content: center
        align-items: center
        width: 100vw
        height: 100vh
        z-index: 200
        background: rgba($black, 0.5)
        &__content
            // margin: auto
            max-width: 720px
            width: calc(100% - 64px)
            min-width: 320px
            background: $cartBG
            overflow-y: scroll
            @media (max-width: 1024px)
                max-width: unset
                width: calc(100% - 32px)
                min-width: unset
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
            // &:hover
            //     border: 2px solid $hightlight

</style>