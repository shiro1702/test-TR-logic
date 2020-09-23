<template>
  <div id="app">
    <cmp-header/>
    <div class="main-content">
      <transition :name="pageAnimation">
        <router-view class="a-page"/>
      </transition>
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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.999 6.99988H5.99902V18.9999C5.99902 20.1039 6.89502 20.9999 8.00002 20.9999H15.999C17.105 20.9999 17.999 20.1039 17.999 18.9999V6.99988ZM14.499 2.9989H9.499L8.5 3.9999H5.999C5.448 3.9999 5 4.4479 5 4.9989V5.9999H19V4.9989C19 4.4479 18.552 3.9999 17.999 3.9999H15.5L14.499 2.9989Z" />
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
body 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

.nav 
  padding: 30px
  a 
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983
.a-container
  max-width: 720px
  width: calc(100% - 32px)
  margin: 0 auto

// анимации пояаления
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0

.a-page
  position: relative
  flex-grow: 1
  width: 100vw
  overflow: hidden

// анимации переходов страниц
.page-forward-enter-active
  transition: transform .4s, opacity .4s
  position: absolute
  top: 0
  left: 0%
  transform: translateX(0%) 

.page-forward-enter
  transform: translateX(100%) 
  opacity: 0

.page-forward-leave-active
  transition: opacity .4s

.page-forward-leave-to
  opacity: 0

.page-back-enter-active
  transition: opacity .4s
  
.page-back-enter
  opacity: 0.5

.page-back-leave-active
  transition: transform .4s, opacity .4s
  position: absolute
  top: 0
  left: 0%
  transform: translateX(0%) 

.page-back-leave-to
  transform: translateX(100%) 
  opacity: 0.5

.main-content
  position: relative


.svg-icon
  display: inline-block
  width: 16px
  height: 16px
  fill: $grey
  transition: fill .3s

.a-favorite
  &__icon
    fill: $grey
  &._active
    .a-favorite
      &__icon
        fill: $orange


// .a-btn

</style>
