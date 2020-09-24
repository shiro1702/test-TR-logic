<template>
  <main class="index">
    <div class="a-page__header">
      <div class="a-container_small a-page__header-content">
        <div class="search">
          <input class="search__input" v-model="q" placeholder="Поиск"/>
          <div class="search__icon-wrapper">
            <svg class="search__icon svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"/>
            </svg>
          </div>
        </div>
        <button  
          class="a-favorite a-btn _outline" 
          :class="{_active: favorite}" 
          @click="favorite=!favorite" 
          type="button"
        >
          <svg class="a-favorite__icon svg-icon a-btn__icon">
            <use xlink:href="#star"></use>
          </svg>
        </button>
        <router-link :to="{name:'create'}" class="a-btn" >
          <svg class="svg-icon a-btn__icon">
            <use xlink:href="#add"></use>
          </svg>
        </router-link>
      </div>
    </div>
    <list-transition
      name="list" 
      class="contacts a-container_small"
      tag="div"
      :itemHeight="'55px'"
    >
      <router-link 
        v-for="item in items" :key="'contact-'+item.id" 
        :to="{ name:'contactId', params: { contactId: item.id } }"
        class="contacts__item"
      >
        <div class="contacts__item-info">
          <h2 class="contacts__item-title">
            {{ item.name }}
          </h2>
          <span  class="contacts__item-desc">
            {{ item.info }}
          </span>
        </div>
        <div>
          <button 
            class="contacts__item-favorite a-favorite a-btn _outline" 
            :class="{_active: item.favorite}" 
            @click.prevent="editItem({id: item.id, favorite: !item.favorite })" 
            type="button"
          >
            <svg class="a-favorite__icon svg-icon a-btn__icon">
              <use xlink:href="#star"></use>
            </svg>
          </button>
          <button class="a-btn" @click.prevent="setModal({modalName: 'deleteContact', id: item.id, name: item.name })" type="button">
            <svg class="svg-icon a-btn__icon">
              <use xlink:href="#trash"></use>
            </svg>
          </button>
        </div>
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
    },
  },
  methods: {
    ...mapMutations('contacts', ['editItem']),
    ...mapMutations('modal', ['setModal']),
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
    &__item
      display: flex
      align-items: center
      justify-content: space-between
      padding: 8px 16px
      background: $cartBG
      transition: background .3s
      &:hover
        background: $grey-light
      &-title
        display: block
        height: 19px
        margin-bottom: 4px
        font-size: 16px
        line-height: 120%
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      &-desc
        display: block
        height: 16px
        font-size: 14px
        line-height: 120%
        opacity: .6
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      &-info
        flex: 1 1 0
        overflow: hidden

  .list-move 
    transition: transform 1s

  .list-complete-item
    display: inline-block
    transition: all 1s
    // margin-right: 10px
  .search
    position: relative
    // max-width: 280px
    width: calc(100% - 8px - 36px - 8px - 36px - 8px - 16px - 8px)
    margin-right: 8px
    &__input
      width: 100%
      padding: 8px 16px
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12)
    &__icon
      fill: $primary
      &-wrapper
        position: absolute
        top: 0
        right: 8px
        display: flex
        justify-content: center
        align-items: center
        height: 100%
</style>