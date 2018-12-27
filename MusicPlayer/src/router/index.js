import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const Recommend = (resolve)=>{
  import ('@/components/recommend/Recommend').then((modlue)=>{
    resolve(modlue)
  })
}

const RecommendDisc = (resolve)=>{
  import ('@/components/disc/recommend-disc').then((modlue)=>{
    resolve(modlue)
  })
}


const Rank = (resolve)=>{
  import ('@/components/rank/Rank').then((modlue)=>{
    resolve(modlue)
  })
}

const TopList = (resolve)=>{
  import ('@/components/topList/top-list').then((modlue)=>{
    resolve(modlue)
  })
}



const Search = (resolve)=>{
  import ('@/components/search/Search').then((modlue)=>{
    resolve(modlue)
  })
}
const PersonArea = (resolve)=>{
  import ('@/components/Person/PersonArea').then((modlue)=>{
    resolve(modlue)
  })
}

const Singer = (resolve)=>{
  import ('@/components/singer/Singer').then((modlue)=>{
    resolve(modlue)
  })
}
const ID = ()=> import('@/components/singer-detail/singer-detail')

const ArrArea = ()=> import('@/components/singer/components/all-area')

const InLand = ()=> import('@/components/singer/components/in-land')

const  OutLand = ()=> import('@/components/singer/components/out-land')

const EA = ()=> import('@/components/singer/components/e-a')

const BangZi = ()=> import('@/components/singer/components/bang-zi')







export default new Router({
  routes: [
    {
      path:'/person',
      component:PersonArea
    },
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children:[
        {
          path:':id',
          name:'TopList',
          component:TopList
        }
      ]
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children:[
        {
          path:':id',
          name:'RecommendDisc',
          component:RecommendDisc
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children:[
        {
          path:':id',
          name:'Searchid',
          component:ID
        }
      ]
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
        {
          path:':id',
          name:'id',
          component:ID
        },
        
        
      ],
    }
 
  ]
})
