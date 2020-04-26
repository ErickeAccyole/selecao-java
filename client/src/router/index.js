import Vue from 'vue'
import Router from 'vue-router'
import constants from '@/constants/index'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import tableMapRouter from './modules/tableMap'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // USUARIO
  {
    path: '/usuario',
    component: Layout,
    alwaysShow: true,
    redirect: 'noredirect',
    name: 'Usuarios',
    meta: {
      title: 'Usuários',
      icon: 'user',
      roles: [constants.roles.ADMIN]
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/usuario/index'),
        name: 'List',
        meta: { title: 'Lista', noCache: true }
      },
      {
        path: 'create',
        component: () => import('@/views/usuario/new'),
        name: 'Create',
        meta: { title: 'Novo', noCache: true }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/usuario/edit'),
        name: 'Edit',
        hidden: true,
        meta: { title: 'Editar', noCache: true }
      }
    ]
  },
  {
    path: '/consulta',
    component: Layout,
    alwaysShow: true,
    redirect: 'noredirect',
    name: 'Consultas',
    meta: {
      title: 'Consultas',
      icon: 'search',
      roles: [constants.roles.ADMIN]
    },
    children: [
      {
        path: 'consulta-por-municipio',
        component: () => import('@/views/consulta/municipio'),
        name: 'municipio',
        meta: { title: 'Município', noCache: true }
      },
      {
        path: 'informacoes-regiao',
        component: () => import('@/views/consulta/regiao'),
        name: 'regiao',
        meta: { title: 'Região', noCache: true }
      },
      {
        path: 'informacoes-distribuidora',
        component: () => import('@/views/consulta/distribuidora'),
        name: 'distribuidora',
        meta: { title: 'Distribuidora', noCache: true }
      },
      {
        path: 'informacoes-revendas-data-coleta',
        component: () => import('@/views/consulta/dataColetaRevenda'),
        name: 'revendaDataColeta',
        meta: { title: 'Data da coleta', noCache: true }
      },
      {
        path: 'media-compra-venda-municipio',
        component: () => import('@/views/consulta/compraVendaPorMunicipio'),
        name: 'mediaCompraVendaMunicipio',
        meta: { title: 'Média município', noCache: true }
      },
      {
        path: 'media-compra-venda-bandeira',
        component: () => import('@/views/consulta/compraVendaPorBandeira'),
        name: 'mediaCompraVendaBandeira',
        meta: { title: 'Média bandeira', noCache: true }
      }
      // {
      //   path: 'create',
      //   component: () => import('@/views/usuario/new'),
      //   name: 'Create',
      //   meta: { title: 'Novo', noCache: true }
      // },
      // {
      //   path: 'edit/:id',
      //   component: () => import('@/views/usuario/edit'),
      //   name: 'Edit',
      //   hidden: true,
      //   meta: { title: 'Editar', noCache: true }
      // }
    ]
  },
  {
    path: '/usuario/my-account',
    component: Layout,
    hidden: true,
    meta: {
      title: 'Minha conta',
      noCache: true,
      roles: [constants.roles.ADMIN]
    },
    children: [
      {
        path: '',
        component: () => import('@/views/usuario/myAccount'),
        name: 'My Account',
        meta: {
          title: 'Minha conta',
          noCache: true,
          roles: [constants.roles.ADMIN]
        }
      }
    ]
  },
  {
    path: '/importacao',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: '',
        component: () => import('@/views/importacao/index'),
        name: 'Importacao',
        meta: { title: 'Importação CSV', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/revenda',
    component: Layout,
    alwaysShow: true,
    redirect: 'noredirect',
    name: 'Revendas',
    meta: {
      title: 'Revendas',
      icon: 'skill',
      roles: [constants.roles.ADMIN]
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/revendas/index'),
        name: 'List',
        meta: { title: 'Lista', noCache: true }
      },
      {
        path: 'create',
        component: () => import('@/views/revendas/new'),
        name: 'Create',
        meta: { title: 'Novo', noCache: true }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/revendas/edit'),
        name: 'Edit',
        hidden: true,
        meta: { title: 'Editar', noCache: true }
      }
    ]
  },
  /** When your routing table is too long, you can split it into small modules**/
  // TABLE MAP
  // tableMapRouter,
  { path: '*', redirect: '/404', hidden: true }
]
