import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home';
import Perfil from '../views/Perfil';

Vue.use(VueRouter)

const routes = [
  {path: '/', 
  component:() => import('@/layouts/Default'),
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

export default router
