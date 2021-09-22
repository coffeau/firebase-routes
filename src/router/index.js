import Vue from 'vue'
import VueRouter from 'vue-router'
import PaginaUm from "../components/pages/PaginaUm";
import PaginaDois from "../components/pages/PaginaDois";
import Usuario from "../components/pages/Usuario";

Vue.use(VueRouter)

const routes = [
  { path: "/", component: PaginaUm, name: "Home" },
  { path: "/p2", component: PaginaDois, name: "P2" },
  { path: "/usuario/:username", component: Usuario, name: "usuario" }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
]

const router = new VueRouter({
  routes
})

export default router
