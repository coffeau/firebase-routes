import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home';
import Perfil from '../views/Perfil';
import { auth } from '../plugins/firebase'

Vue.use(VueRouter)

const routes = [
  {path: '/', 
  component:() => import('@/layouts/Default'),
  meta: {requiresAuth: true,},
  children:[
    {path: '', component: Home, name: "Home"},
    {path: '/perfil', component: Perfil, name:"Perfil"},
  ]},

   {path: '/', 
   component:() => import('@/layouts/Blank'),
   children:[
     { path: '/login', 
      name:"Login",
      component: () => import('../views/Login.vue')}
  ]}
]

const router = new VueRouter({
  mode:"history",
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser){
    next('/login')
  } else{
    next()
  }
})

export default router
