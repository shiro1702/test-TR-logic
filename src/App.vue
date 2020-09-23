<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'main'}" class="t-btn" key="contacts">
        Контакты
      </router-link>
    </div>
    <router-view/>
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
    </svg>
  </div>
</template>

<script>
import wrapper from '@/components/modals/wrapper.vue';
export default {
  components: {
    wrapper
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

.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0

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
