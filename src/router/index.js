import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/Login',
      component: ()=>import('../views/Login.vue')
    },
    {
      path:'/',
      component: ()=>import('../views/Login.vue')
    },
    {
      path:'/test',
      component:()=>import('../views/test.vue')
    },
    {
      path:'/UserManager',
      component:()=>import('../views/UserManager.vue')
    }

]
const router = new VueRouter({
  routes
})

export default router
