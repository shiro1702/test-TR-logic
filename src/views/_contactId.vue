<template>
  <main class="page-contant" >
    <div class="a-container page-contant__content">
      <button 
        class="a-favorite" 
        :class="{_active: item.favorite}" 
        @click.prevent="editItem({id: item.id, favorite: !item.favorite })" 
        type="button"
      >
        <svg class="a-favorite__icon svg-icon">
          <use xlink:href="#star"></use>
        </svg>
      </button>
      <template v-if="!editState && !createState">
        <button class="contacts__btn-edit a-btn" @click="edit(true)" type="button">
          <svg class="svg-icon">
            <use xlink:href="#edit"></use>
          </svg>
        </button>
        <button class="contacts__btn-edit a-btn" @click.prevent="setModal({modalName: 'deleteContact', id: itemC.id, name: itemC.name })" type="button">
          <svg class="svg-icon">
            <use xlink:href="#trash"></use>
          </svg>
        </button>
      </template>
      <template v-else>
        <button
          class="contacts__btn-edit a-btn"
          @click="cancel"
          type="button"
        >
          отмена
        </button>
        <button
          class="contacts__btn-edit a-btn" 
          :disabled="!hasChanges"
          @click="save()"
          type="button"
        >
          сохранить
        </button>
        <button
          class="contacts__btn-edit a-btn"
          @click="undo"
          :disabled="!canUndo"
          type="button"
        >
          <svg class="undo svg-icon">
            <use xlink:href="#right"></use>
          </svg>
        </button>
        <button
          class="contacts__btn-edit a-btn" 
          @click="redo"
          :disabled="!canRedo"
          type="button"
        >
          <svg class="redo svg-icon">
            <use xlink:href="#right"></use>
          </svg>
        </button>
      </template>
      <input 
        type="text" 
        v-model.lazy.trim="itemC.name" 
        :readonly="!editState && !createState">
      <input 
        type="text" 
        v-model.lazy.trim="itemC.info"
        :readonly="!editState && !createState">
      <list-transition tag="ul" class="fields">
        <li 
          v-for="(field, index) in itemC.fields" :key="'li'+field.id"
          class="fields__item"
        >
          <input 
            type="text" 
            v-model.lazy.trim="field.name"
            :readonly="!editState && !createState">
          -
          <input 
            type="text" 
            v-model.lazy.trim="field.value" 
            :readonly="!editState && !createState">
          <button 
            v-show="!(!editState && !createState)"
            class="fields__item-delete"  
            @click="deleteFieldIndex = index"
            type="button"
          >
            <svg class="svg-icon">
              <use xlink:href="#trash"></use>
            </svg>
          </button>
        </li>
        <button 
          v-show="!(!editState && !createState)"
          class="fields__btn-add"  
          @click="addField({})"
          type="button"
          key="add-btn"
        >
          <svg class="svg-icon">
            <use xlink:href="#add"></use>
          </svg>
        </button>

      </list-transition>
      <modal :open.sync="cancelModal">
        <h1>Изменения будут потеряны. вы уверены?</h1>  
          <button 
            @click="clearChange(), cancelModal = false"
            type="button"
          >
            да
          </button>
          <button 
            @click="cancelModal = false"
            type="button"
          >
            нет
          </button>
      </modal>
      <modal :open.sync="deleteFieldModal">
        <h1>Поле будет удалено, вы уверены?</h1>  
          <button 
            @click="deleteField(deleteFieldIndex), deleteFieldModal = false"
            type="button"
          >
            да
          </button>
          <button 
            @click="deleteFieldModal = false"
            type="button"
          >
            нет
          </button>
      </modal>
    </div>
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

    // ...mapState({
    //   undoButtonEnabled: "canUndo",
    //   redoButtonEnabled: "canRedo",
    // }),
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
    // itemFields(){
    //   return this.genSetGet('item', 'editItem', ['name', 'info']);
    // },
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
      // this.clear();
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
    this.clearChange();
    document.addEventListener('keydown', this.crtZ);
  },
  beforeDestroy(){
    document.removeEventListener('keydown', this.crtZ);
  }
}
</script>

<style lang="sass">
.page-contant
  &__content
    display: flex
    flex-direction: column

.undo, .redo
  fill: currentColor
.undo
  transform: rotate(180deg)
</style>