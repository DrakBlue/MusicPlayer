import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/Rank'
import Recommend from '@/components/recommend/Recommend'
import Search from '@/components/search/Search'
import Singer from '@/components/singer/Singer'
  import ArrArea from '@/components/singer/components/all-area'
  import InLand from '@/components/singer/components/in-land'
  import OutLand from '@/components/singer/components/out-land'
  import EA from '@/components/singer/components/e-a.vue'
  import BangZi from '@/components/singer/components/bang-zi.vue'



  

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      redirect:'/singer/all-area',
      children:[
        {
          path: 'all-area',
          name: 'ArrArea',
          component: ArrArea
        },
        {
        path: 'in-land',
        name: 'InLand',
        component: InLand
        },
        {
        path: 'out-land',
        name: 'OutLand',
        component: OutLand
        },
        {
        path: 'e-a',
        name: 'EA',
        component:EA 
        },
        {
        path: 'bang-zi',
        name: 'BangZi',
        component: BangZi
        },
        
        
      ],
    }
 
  ]
})
