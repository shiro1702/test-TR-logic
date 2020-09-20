<template>
  <div class="contacts">
    <template v-if="!editState && !createState">
      <button class="contacts__btn-edit t-btn" @click="edit(true)" type="button">
        править
      </button>
    </template>
    <template v-else>
      <button
        class="contacts__btn-edit t-btn"
        @click="cancel"
        type="button"
      >
        отмена
      </button>
      <button
        class="contacts__btn-edit t-btn" 
        :disabled="!hasChanges"
        @click="save()"
        type="button"
      >
        сохранить
      </button>
      <button
        class="contacts__btn-edit t-btn"
        @click="undo"
        :disabled="!canUndo"
        type="button"
      >
        назад
      </button>
      <button
        class="contacts__btn-edit t-btn" 
        @click="redo"
        :disabled="!canRedo"
        type="button"
      >
        вперед
      </button>
    </template>
    <input type="text" v-model.lazy.trim="itemC.name" :readonly="!editState && !createState">
    <input type="text" v-model.lazy.trim="itemC.info" :readonly="!editState && !createState">
    <ul class="fields" ref="fields">
      <li 
        v-for="(field, index) in itemC.fields" :key="index"
        class="fields__item"
      >
        <!-- {{ field.name }} - {{ field.value }} -->
<!-- @input="updateField({index: index})" -->
        <input type="text" v-model.lazy.trim="field.name"  :readonly="!editState && !createState">
        -
        <input type="text" v-model.lazy.trim="field.value" :readonly="!editState && !createState">
        <button 
          v-show="!(!editState && !createState)"
          class="fields__item-delete"  
          @click="deleteField(index)"
          type="button"
        >
          x
        </button>
      </li>
      <button 
        v-show="!(!editState && !createState)"
        class="fields__btn-add"  
        @click="addField({})"
        type="button"
      >
        +
      </button>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

// import store from '@/store'

import { genSetGet } from '@/assets/js/helpers.js'

export default {
  name: 'Home',
  props: {
    contactId: {
      type: [String, Number],
      default: 'create'
    }
  },
  data(){
    return {
      // режим редактирования
      editState: false,
      // item: {},
    }
  },
  computed: {
    ...mapState('contact', ['item', 'canUndo', 'canRedo']),

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
        console.log('genSetGet');
      }

      let item = this.genSetGet({
        name: 'item',
        children: [
          {name: 'name', method: 'editItem'}, 
          {name: 'info', method: 'editItem'},
          {
            name: 'fields',
            inArray: [
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
      // console.log(JSON.stringify(this.itemState))
      return !(JSON.stringify(this.item)===JSON.stringify(this.itemState));
    },
  },
  watch: {
    editState(newVal){
      if(!newVal){
        this.clear();
      }
    }
  },
  components: {
  },
  methods: {
    ...mapMutations('contact', ['setItem', 'editItem', 'addField', 'deleteField', 'updateField']),
    ...mapActions('contact', [ 'undo', 'redo', 'clear']),
    // ...mapMutations('contact', ['setItem', 'editItem', 'addField', 'deleteField', 'undoRedo']),

    // ...mapMutations('undoRedo', ['undo', 'redo']),
    // undo(){
    //   this.undoRedo.undo()
    // },
    // redo(){
      
    //   this.undoRedo.redo()
    // },

    
    // ...mapMutations('undoRedo',['undo', 'redo']),
    ...mapActions('contacts', ['saveItem']),
    genSetGet,
    // изменить режим редактирования
    edit(state){
      this.editState = state;
    },
    save(){
      // сохранение контакта
      this.saveItem(Object.assign({}, this.itemC ))
        .then(id => {
          // если возрващается id то нужно сменить маршрут на созданный контакт
          if (id) {
            this.$router.push({ name: 'contactId', params: {contactId: id} });
          }
          // снять режим редактирования
          this.editState = false;
        });
    },
    // нажатие на кнопку "отмена"
    cancel(){
      // если есть изменения 
      if (this.hasChanges) {
        // вывести предупреждение о том что они будут потеряны
        
        // отменить их
        this.clearChange()
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
    }
  },
  created(){
    this.clearChange();
  }
}
</script>