import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/authority',
    component: Layout,
    redirect: '/authority/role',
    name: 'Authority',
    meta: { title: '权限管理', icon: 'authority' },
    children: [{
      path: 'role',
      name: 'Role',
      component: () => import('@/views/authority/role'),
      meta: { title: '角色设置', icon: 'authority' }
    }]
  },
  {
    path: '/menus',
    component: Layout,
    redirect: '/menus/setting',
    name: 'Menus',
    meta: { title: '目录管理', icon: 'menus' },
    children: [{
      path: 'setting',
      name: 'MenusSetting',
      component: () => import('@/views/menus/setting/index'),
      meta: { title: '目录配置', icon: 'menus' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/online',
    name: 'User',
    meta: { title: '用户管理', icon: 'user' },
    children: [{
      path: 'online',
      name: 'Online',
      component: () => import('@/views/user/online/index'),
      meta: { title: '在线用户', icon: 'user' }
    }]
  },
  {
    path: '/dictionary',
    component: Layout,
    redirect: '/dictionary/index',
    name: 'Dictionary',
    meta: { title: '字典表', icon: 'dictionary' },
    children: [{
      path: 'index',
      name: 'DictionaryIndex',
      component: () => import('@/views/dictionary/index'),
      meta: { title: '字典表', icon: 'dictionary' }
    }]
  },
  {
    path: '/sql',
    component: Layout,
    redirect: '/sql/index',
    name: 'Sql',
    meta: { title: '数据库维护', icon: 'dictionary' },
    children: [{
      path: 'index',
      name: 'SqlIndex',
      component: () => import('@/views/sql/edit/index'),
      meta: { title: '数据库管理', icon: 'dictionary' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
