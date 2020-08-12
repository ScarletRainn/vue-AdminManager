import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/login',
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


router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
