<template>
    <transition name="fade" >
        <section v-if="open" class="a-modal" @click="close()">
            <div class="a-modal__content a-container_small" @click.stop="">
                <div class="a-modal__close" @click="close()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z" fill="black" fill-opacity="0.6"/>
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
            position: relative
            // margin: auto
            text-align: center
            min-width: 320px
            padding: 32px
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
            position: absolute
            top: 8px
            right: 9px
            width: 24px
            height: 24px
            border-radius: 100%
            border: 2px solid transparent
            transition: border-color .3s
            cursor: pointer
            z-index: 100
            &:active
                transform: scale(0.98)
            svg 
                width: 100%
                height: 100%
            // &:hover
            //     border: 2px solid $hightlight

</style>