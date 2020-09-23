<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'main'}" class="t-btn" key="contacts">
        Контакты
      </router-link>
    </div>
    <router-view/>
    <wrapper/>
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

</style>
