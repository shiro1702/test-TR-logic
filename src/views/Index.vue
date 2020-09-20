<template>
  <main class="index">
    <button @click="favorite=!favorite" type="button">Избранное</button>
    <router-link :to="{name:'create'}">Создать</router-link>
    <div class="search">
      <input class="search__input" v-model="q"/>
    </div>
    <list-transition
      name="list" 
      class="contacts"
      tag="div"
    >
      <router-link 
        v-for="item in items" :key="'contact-'+item.id" 
        :to="{ name:'contactId', params: { contactId: item.id } }"
        class="contacts__item"
      >
        {{ item.name }}
        <button 
          class="contacts__item-favorite" 
          :class="{_active: item.favorite}" 
          @click.prevent="editItem({id: item.id, favorite: !item.favorite })" 
          type="button"
        >
          Избранное
        </button>
        <button @click.prevent="" type="button">x</button>
      </router-link>
    </list-transition>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import listTransition from '@/components/listTransition.vue';

export default {
  name: 'Home',
  data(){
    return {
      q: '',
      favorite: false
    }
  },
  computed: {
    ...mapGetters('contacts', ['filterItems']),
    items(){
      return this.filterItems({q: this.q, favorite: this.favorite})
    }
  },
  methods: {
    ...mapMutations('contacts', ['editItem']),
  },
  components: {
    listTransition
  }
}
</script>
<style lang="sass">
  .contacts
    // display: inline-block
    display: flex
    flex-direction: column

  .list-move 
    transition: transform 1s

  .list-complete-item
    display: inline-block
    transition: all 1s
    // margin-right: 10px
  
  // .list-complete-enter, .list-complete-leave-to
  //   opacity: 0
  //   transform: translateX(30px)
  
  // .list-complete-leave-active
  //   position: absolute
  
</style>