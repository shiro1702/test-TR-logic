<template>
  <div id="app">
    <div class="a-wrapper a-container">
      <cmp-header/>
      <div class="main-content ">
        <transition :name="pageAnimation">
          <router-view class="a-page"/>
        </transition>
      </div>
    </div>
    <wrapper/>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <symbol id="star" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
      </symbol>
      <symbol id="edit" viewBox="0 0 24 24">
        <path d="M3 17.2501V21.0001H6.75L17.81 9.94006L14.06 6.19006L3 17.2501ZM20.71 7.04006C21.1 6.65006 21.1 6.02006 20.71 5.63006L18.37 3.29006C17.98 2.90006 17.35 2.90006 16.96 3.29006L15.13 5.12006L18.88 8.87006L20.71 7.04006Z"/>
      </symbol>
      <symbol id="trash" viewBox="0 0 24 24">
        <path fill-rlie="evenodd" clip-rule="evenodd" d="M17.999 6.99988H5.99902V18.9999C5.99902 20.1039 6.89502 20.9999 8.00002 20.9999H15.999C17.105 20.9999 17.999 20.1039 17.999 18.9999V6.99988ZM14.499 2.9989H9.499L8.5 3.9999H5.999C5.448 3.9999 5 4.4479 5 4.9989V5.9999H19V4.9989C19 4.4479 18.552 3.9999 17.999 3.9999H15.5L14.499 2.9989Z" />
      </symbol>

      <symbol id="left" viewBox="0 0 24 24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4 7.4L14 6L8 12L14 18L15.4 16.6L10.8 12L15.4 7.4Z"/>
      </symbol>
      <symbol id="right" viewBox="0 0 24 24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.6001 7.4L10.0001 6L16.0001 12L10.0001 18L8.6001 16.6L13.2001 12L8.6001 7.4Z"/>
      </symbol>
      <symbol id="add" viewBox="0 0 24 24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5V11H5V13H11V19H13V13H19V11H13V5H11Z"/>
      </symbol>
    </svg>
  </div>
</template>

<script>
import wrapper from '@/components/modals/wrapper.vue';
import header from '@/components/header.vue';

export default {
  components: {
    wrapper,
    'cmp-header': header
  },
  data(){
    return {
      q: '',
      favorite: false,
      pageAnimation: ''
    }
  },
  // computed: {
  //   pageAnimation(){
  //     return 'page-forward'
  //     // return 'page-back'
  //   }
  // },
  watch: {
    $route(to, from) {
      this.pageName = to.name
      this.pageAnimation = to.meta.depth > from.meta.depth ? 'page-forward' : 'page-back'
    }
  }
}
</script>

<style lang="sass">

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')

*
  margin: 0
  padding: 0
  box-sizing: border-box
  
body 
  font-family: $font-fam
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  color: rgba($black, .78)
  background: rgba($black, .12)

input, textarea
  line-height: 120%
  border: 2px solid $primary
  transition: border-color .3s
  font-family: $font-fam
  
  @include placeholder
      color: $grey
      transition: .6s
      opacity: 1
  &:focus
    outline: none
    border-color: $orange
    @include placeholder
        transform: translateX(10%)
        opacity: 0
  &[readonly]
    border-color: transparent

a
  color: inherit
  text-decoration: none

li
  list-style-type: none

.a-container
  max-width: 720px
  width: calc(100% - 32px)
  margin: 0 auto
  &_small
    max-width: 480px
    width: calc(100% - 32px)
    margin: 0 auto


.a-page
  position: relative
  // width: 100vw
  width: 100%
  // overflow: hidden
  min-height: 70vh
  background: $cartBG
  &__header
    position: sticky
    top: 32px
    width: 100%
    margin-bottom: 16px
    padding: 8px
    background: $cartBG
    z-index: 1
    &-content
      display: flex
      justify-content: center
      align-items: center
    &_top
      position: absolute
      bottom: calc(100% + 8px)
      right: 0


.a-wrapper
  margin-top: 80px
  padding: 24px
  border-radius: 8px
  background: $cartBG
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12)

// анимации переходов страниц
.page-forward-enter-active
  transition: transform .4s, opacity .4s
  position: absolute
  top: 0
  left: 0%
  transform: translateX(0%) 
  z-index: 1

.page-forward-enter
  transform: translateX(25%) 
  opacity: 0

.page-forward-leave-active
  transition: opacity .4s

.page-forward-leave-to
  opacity: 0

.page-back-enter-active
  transition: opacity .4s
  
.page-back-enter
  opacity: 0

.page-back-leave-active
  transition: transform .4s, opacity .4s
  position: absolute
  top: 0
  left: 0%
  transform: translateX(0%) 
  z-index: 1

.page-back-leave-to
  transform: translateX(25%) 
  opacity: 0

.main-content
  position: relative

.a-field
  position: relative
  display: flex
  align-items: flex-start
  justify-content: center
  margin: 0 auto 8px

.a-input
  width: 100%
  text-align: center
  &_h1
    font-size: 32px
  &_h2
    font-size: 24px
  @include placeholder
    color: $grey
    transition: .6s
    opacity: 1
  &:focus
    @include placeholder
      transform: translateX(0%)
      opacity: 0

.svg-icon
  display: inline-block
  width: 16px
  height: 16px
  fill: currentColor
  transition: fill .3s

.a-btns
  display: flex
  align-items: center

.a-btn
  display: inline-flex
  justify-content: center
  align-items: center
  width: fit-content
  padding: 8px 16px
  border: 2px solid transparent
  border-radius: 40px
  background: $primary
  color: $white
  cursor: pointer
  transition: background .3s, transform .3s
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12)
  font-size: 16px
  line-height: 16px
  &__icon
    margin: 0 -8px
    // fill: $white
  &:not(:last-child)
    margin-right: 8px
  &:hover
    background: lighten($primary, 5)
    transform: scale(1.03)
  &:active
    background: darken($primary, 5)
    transform: scale(.97)
  &[disabled]
    background: $grey
    cursor: auto
  &:focus
    outline: none
  &._outline
    background: transparent
    border-color: $primary
    color: $primary
.a-favorite
  &__icon
    fill: $grey
  &._active
    .a-favorite
      &__icon
        fill: $orange
.title
  &-h1
    font-size: 32px
  &-h2
    font-size: 24px
.mb
  &_m
    margin-bottom: 16px
.text
  &_right
    text-align: right

// анимации пояаления
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0

.hide-enter-active, .hide-leave-active 
    transition: opacity .4s, max-height .6s
    overflow: hidden
    max-height: 100px
.hide-enter, .hide-leave-to 
    opacity: 0
    max-height: 0
</style>
