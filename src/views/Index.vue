<template>
  <main class="index">
    <button  
      class="a-favorite" 
      :class="{_active: favorite}" 
      @click="favorite=!favorite" type="button"
    >
      <svg class="a-favorite__icon svg-icon">
        <use xlink:href="#star"></use>
      </svg>
    </button>
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
          class="contacts__item-favorite a-favorite" 
          :class="{_active: item.favorite}" 
          @click.prevent="editItem({id: item.id, favorite: !item.favorite })" 
          type="button"
        >
          <svg class="a-favorite__icon svg-icon">
            <use xlink:href="#star"></use>
          </svg>
        </button>
        <button @click.prevent="setModal({modalName: 'deleteContact', id: item.id, name: item.name })" type="button">
          <svg class="svg-icon">
            <use xlink:href="#trash"></use>
          </svg>
        </button>
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
      favorite: false,
      // deleteContact: {
      //   id: undefined,
      //   name: ''
      // },
      // modalDel: false
    }
  },
  computed: {
    ...mapGetters('contacts', ['filterItems']),
    items(){
      return this.filterItems({q: this.q, favorite: this.favorite})
    },
    // modalDel:{
    //   get(){
    //     if (this.deleteContact.id == undefined){
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   },
    //   set(val){
    //     if (!val){
    //       this.deleteContact =  {
    //         id: undefined,
    //         name: ''
    //       };
    //     }
    //   }
    // }
  },
  methods: {
    ...mapMutations('contacts', ['editItem']),
    ...mapMutations('modal', ['setModal']),
    // setModal(data){
    //   this.deleteContact = data;
    // }
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