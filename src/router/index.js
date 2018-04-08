import Vue from 'vue'
import Router from 'vue-router'
import Pos from '../components/page/Pos.vue'
// import leftNav from '../components/page/common/leftNav.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Pos',
      component: Pos
    }
    // {
    //   path: '/leftNav',
    //   name: 'leftNav',
    //   component: leftNav
    // },
  ]
})
