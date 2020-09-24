import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import ContactId from '../views/_contactId.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Index,
    meta: { depth: 1 }
  },
  {
    path: '/create',
    name: 'create',
    component: ContactId,
    props: { contactId: 'create' },
    meta: { depth: 2 }
  },
  {
    path: '/:contactId',
    name: 'contactId',
    component: ContactId,
    meta: { depth: 3 },
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
