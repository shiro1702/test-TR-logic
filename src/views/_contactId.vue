<template>
  <main class="page-contant" >

    <div class="a-page__header_top">
      <transition name="fade" mode="out-in">
        <template v-if="!editState && !createState">
          <button 
              class="contacts__btn-edit a-btn" 
              @click="edit(true)" 
              type="button"
              key="main-btn"
            >
            <svg class="svg-icon a-btn__icon">
              <use xlink:href="#edit"></use>
            </svg>
          </button>
        </template>
        <template v-else>
          <div class="a-btns">
            <button v-if="!createState" class="contacts__btn-edit a-btn" @click.prevent="setModal({modalName: 'deleteContact', id: itemC.id, name: itemC.name })" type="button">
              <svg class="svg-icon a-btn__icon">
                <use xlink:href="#trash"></use>
              </svg>
            </button>
            <button
              class="contacts__btn-edit a-btn"
              @click="cancel"
              type="button"
              key="main-btn"
            >
              <span>отмена</span>
            </button>
          </div>
        </template>
      </transition>
    </div>
    <div class="a-page__header">
      <transition name="hide">
        <template v-if="editState || createState">
          <div class="a-page__header-content">
            <button
              class="contacts__btn-edit a-btn"
              @click="undo"
              :disabled="!canUndo"
              type="button"
            >
              <svg class="undo svg-icon a-btn__icon">
                <use xlink:href="#left"></use>
              </svg>
            </button>
            <button
              class="contacts__btn-edit a-btn" 
              @click="redo"
              :disabled="!canRedo"
              type="button"
            >
              <svg class="redo svg-icon a-btn__icon">
                <use xlink:href="#right"></use>
              </svg>
            </button>
            <button
              class="contacts__btn-edit a-btn" 
              :disabled="!hasChanges"
              @click="save()"
              type="button"
            >
              сохранить
            </button>
          </div>
        </template>
      </transition>
    </div>
    <div class="a-field a-container_small">
      <textarea-autosize
        class="a-input a-input_h1"
        v-model.lazy.trim="itemC.name" 
        :readonly="!editState && !createState"
        :min-height="36"
        rows="1"
        placeholder="Введите имя">
      </textarea-autosize>

      <button 
        class="a-favorite page-contant__favorite a-btn _outline" 
        :class="{_active: item.favorite}" 
        @click.prevent="setItem({...item, favorite: !item.favorite })" 
        type="button"
      >
        <svg class="a-favorite__icon svg-icon a-btn__icon">
          <use xlink:href="#star"></use>
        </svg>
      </button>
    </div>

    <div class="a-field a-container_small">
      <textarea-autosize
        class="a-input a-input_h2"
        v-model.lazy.trim="itemC.info"
        :readonly="!editState && !createState"
        :min-height="32"
        rows="1"
        placeholder="Введите краткую информацию">
      </textarea-autosize>
    </div>
    <list-transition 
      tag="ul" 
      class="fields a-container_small" 
      :itemHeight="'36px'"
    >
      <li 
        v-for="(field, index) in itemC.fields" :key="'li'+field.id"
        class="fields__item"
      >
        <input 
          type="text" 
          class="fields__item-input text_right"
          v-model.lazy.trim="field.name"
          :readonly="!editState && !createState">
        -
        <input 
          type="text" 
          class="fields__item-input"
          v-model.lazy.trim="field.value" 
          :readonly="!editState && !createState">
        
        <transition name="fade">
          <button 
            v-if="editState || createState"
            class="fields__item-delete a-btn"  
            @click="deleteModal(index)"
            type="button"
          >
            <svg class="svg-icon a-btn__icon">
              <use xlink:href="#trash"></use>
            </svg>
          </button>
        </transition>
      </li>
    </list-transition>
    <transition name="fade">
      <button 
        v-if="editState || createState"
        class="fields__btn-add a-btn"  
        @click="addField({})"
        type="button"
        key="add-btn"
      >
        <svg class="svg-icon a-btn__icon">
          <use xlink:href="#add"></use>
        </svg>
      </button>
    </transition>
    <modal :open.sync="cancelModal">
      <h1 class="title-h2 mb_m">Изменения будут потеряны. вы уверены?</h1>  
      <button 
        @click="clearChange(), cancelModal = false"
        class="a-btn"
        type="button"
      >
        да
      </button>
      <button 
        @click="cancelModal = false"
        class="a-btn _outline"
        type="button"
      >
        нет
      </button>
    </modal>
    <modal :open.sync="deleteFieldModal">
      <h1 class="title-h2 mb_m">Поле будет удалено, вы уверены?</h1>  
      <button 
        @click="deleteField(deleteFieldIndex), deleteFieldModal = false"
        type="button"
        class="a-btn"
      >
        да
      </button>
      <button 
        @click="deleteFieldModal = false"
        type="button"
        class="a-btn _outline"
      >
        нет
      </button>
    </modal>
  </main>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

// import store from '@/store'

import { genSetGet } from '@/assets/js/helpers.js'
import listTransition from '@/components/listTransition.vue';
import modal from '@/components/modal.vue';


export default {
  name: 'Home',
  props: {
    contactId: {
      type: [String, Number],
      default: 'create'
    }
  },
  components: {
    listTransition,
    modal
  },
  data(){
    return {
      // режим редактирования
      editState: false,
      // модалки
      cancelModal: false,
      deleteFieldIndex: undefined,
    }
  },
  computed: {
    ...mapState('contact', ['item', 'startItem', 'canUndo', 'canRedo']),
    ...mapGetters('contacts', ['getItemById']),
    
    // текущий контакт
    itemState(){
      return this.getItemById(this.contactId) || {};
    },
    itemC(){
      if (this.item){
        let item = this.genSetGet({
          name: 'item',
          children: [
            {name: 'name', method: 'editItem'}, 
            {name: 'info', method: 'editItem'},
            {
              name: 'fields',
              inArray: [
                {
                  name: 'id', 
                  method: 'updateField'
                },
                {
                  name: 'name', 
                  method: 'updateField'
                },
                {
                  name: 'value', 
                  method: 'updateField'
                }
              ]
            }
          ]
        });
        return item
      }
      return undefined
    },
    // режим создания нового контакта
    createState(){
      return this.contactId == 'create';
    },
    // наличие изменений
    hasChanges(){
      // console.log(JSON.stringify(this.item))
      // console.log(JSON.stringify(this.startItem))
      return !(JSON.stringify(this.item)===JSON.stringify(this.startItem));
    },

    deleteFieldModal: {
      get(){
        if (this.deleteFieldIndex != undefined) {
          return true
        } else {
          return false
        }
      },
      set(val){
        if (!val) {
          this.deleteFieldIndex = undefined
        }
      }
    },
  },
  watch: {
    editState(newVal){
      if(!newVal){
        this.clear();
      }
    }
  },
  methods: {
    ...mapMutations('contact', ['setItem', 'editItem', 'addField', 'deleteField', 'updateField']),
    ...mapActions('contact', [ 'undo', 'redo', 'clear']),
    ...mapMutations('modal', ['setModal']),
    ...mapActions('contacts', ['saveItem']),
    genSetGet,
    deleteModal(index){
      if (this.itemC.fields[index].name != '' || this.itemC.fields[index].value != '' ) {
        this.deleteFieldIndex = index
      } else {
        this.deleteField(index)
      }
    },
    // изменить режим редактирования
    edit(state){
      this.editState = state;
    },
    save(){
      // сохранение контакта
      this.saveItem(Object.assign({}, this.item ))
        .then(id => {
          // если возрващается id то нужно сменить маршрут на созданный контакт
          if (id) {
            this.$router.push({ name: 'contactId', params: {contactId: id} });
          }
          this.setItem(this.item);
          // снять режим редактирования
          this.editState = false;
        });
    },
    // нажатие на кнопку "отмена"
    cancel(){
      // если есть изменения 
      if (this.hasChanges) {
        // вывести предупреждение о том что они будут потеряны
        this.cancelModal = true;
        // отменить их
        
      } else {
        // если изменений нет
        // если это создание контакта
        if (this.createState) {
          // перейти на главную
          this.$router.push({name: 'main'});
        } else {
          // если это редакьтрование слова, то отключить режим редактирования
          this.editState = false;
        }
      }
    },
    // сброс изменений
    clearChange(){
      if (this.createState) {
        // если это создание контакта
        this.setItem({});
      } else {
        // если это редактирование слова, то приравнять к изнакчальному состоянию
        this.setItem(Object.assign({}, this.itemState));
      }
      this.editState = false;
    },
    crtZ(e){
      if( e.which === 89 && (e.ctrlKey || e.metaKey) ){
        this.redo()
      }
      else if( e.which === 90 && (e.ctrlKey || e.metaKey) ){
        this.undo()
      }
    },
  },
  created(){
    this.clear();
    this.clearChange();
    document.addEventListener('keydown', this.crtZ);
  },
  beforeDestroy(){
    this.clear();
    document.removeEventListener('keydown', this.crtZ);
  }
}
</script>

<style lang="sass">
.page-contant
  display: flex
  flex-direction: column
  align-items: center
  &__favorite
    position: absolute
    left: calc(100% + 8px)
    top: 0px

.undo, .redo
  fill: currentColor

.fields
  width: 100%
  display: flex
  flex-direction: column
  &__item
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    // padding: 8px 16px
    background: $cartBG
    margin-bottom: 4px
    &-input
      padding: 8px 16px
      width: calc(100%/2 - 16px)
    &-delete
      position: absolute
      left: calc(100% + 8px)

</style>