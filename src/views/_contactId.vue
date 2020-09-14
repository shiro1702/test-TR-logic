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
    </template>
    <input type="text" v-model="item.name" :readonly="!editState && !createState">
    <input type="text" v-model="item.info" :readonly="!editState && !createState">
    <ul class="fealds">
      <li 
        v-for="(feald, index) in item.fealds" :key="index"
        class="fealds__item"
      >
        <!-- {{ feald.name }} - {{ feald.value }} -->

        <input type="text" v-model="feald.name" :readonly="!editState && !createState">
        -
        <input type="text" v-model="feald.value" :readonly="!editState && !createState">
        <button 
          v-show="!(!editState && !createState)"
          class="fealds__item-delete"  
          @click="deleteFeald"
          type="button"
        >
          x
        </button>
      </li>
      <button 
        v-show="!(!editState && !createState)"
        class="fealds__btn-add"  
        @click="addFeald"
        type="button"
      >
        +
      </button>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      item: {}
    }
  },
  computed: {
    ...mapGetters('contacts', ['getItemById']),
    // текущий контакт
    itemState(){
      return this.getItemById(this.contactId) || {};
    },
    // режим создания нового контакта
    createState(){
      return this.contactId == 'create';
    },
    // наличие изменений
    hasChanges(){
      return !(JSON.stringify(this.item)===JSON.stringify(this.itemState));
    },
  },
  components: {
  },
  methods: {
    // изменить режим редактирования
    edit(state){
        this.editState = state;
    },
    save(){
      this.editState = false;
    },
    // нажатие на кнопку "отмена"
    cancel(){
      // если есть изменения 
      if (this.hasChanges) {
        // вывести предупреждение о том что они будут потеряны
        
        // отменить их
        this.clear()
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
    addFeald(){
      this.addFealdModal = true;
    },
    deleteFeald(){
      
    },
    // сброс изменений
    clear(){
      if (this.createState) {
        // если это создание контакта
        this.item = {}
      } else {
        // если это редакьтрование слова, то приравнять к изнакчальному состоянию
        this.item = Object.assign({}, this.itemState);
      }
      this.editState = false;
    }
  },
  created(){
    if (this.createState) {
      this.editState = true;
    }
    this.clear()
  }
}
</script>