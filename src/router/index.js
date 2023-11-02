import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requireAuth: true,
      verificarRol: true,
      rol: 'admin'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/area',
    name: 'area',
    component: () => import(/* webpackChunkName: "area" */ '../views/Area.vue')
  },
  {
    path: '/area/:id',
    name: 'areaUpdate',
    component: () => import(/* webpackChunkName: "areaUpdate" */ '../views/AreaUpdate.vue')
  },
  {
    path: '/bienactivo',
    name: 'bienactivo',
    component: () => import(/* webpackChunkName: "bienactivo" */ '../views/Bienactivo.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some((record) => record.meta.requireAuth)){
    if(null === localStorage.getItem('auth') || 'false' == localStorage.getItem('auth')){
      next({name: "home"});
    }
  }
  next();
});

export default router