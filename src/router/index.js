import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Logon from '@/components/Logon'
import NotFound from '@/components/404'
import Home from '@/components/Home'
import Main from '@/components/Main'
import Table from '@/components/nav1/Table'
import Form from '@/components/nav1/Form'
import user from '@/components/nav1/user'
import Page4 from '@/components/nav2/Page4'
import Page5 from '@/components/nav2/Page5'
import Page6 from '@/components/nav3/Page6'
import echarts from '@/components/charts/echarts'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login,
            name: '',
            hidden: true
        },
        {
            path: '/logon',
            component: Logon,
            name: '',
            hidden: true
        },
        {
            path: '/404',
            component: NotFound,
            name: '',
            hidden: true
        },
        //{ path: '/main', component: Main },
        {
            path: '/',
            component: Home,
            name: '导航一',
            iconCls: 'el-icon-message',//图标样式class
            children: [
                { path: '/main', component: Main, name: '主页', hidden: true },
                { path: '/table', component: Table, name: 'Table' },
                { path: '/form', component: Form, name: 'Form' },
                { path: '/user', component: user, name: '列表' },
            ]
        },
        {
            path: '/',
            component: Home,
            name: '导航二',
            iconCls: 'fa fa-id-card-o',
            children: [
                { path: '/page4', component: Page4, name: '页面4' },
                { path: '/page5', component: Page5, name: '页面5' }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '',
            iconCls: 'fa fa-address-card',
            leaf: true,//只有一个节点
            children: [
                { path: '/page6', component: Page6, name: '导航三' }
            ]
        },
        {
            path: '/',
            component: Home,
            name: 'Charts',
            iconCls: 'fa fa-bar-chart',
            children: [
                { path: '/echarts', component: echarts, name: 'echarts' }
            ]
        },
        {
            path: '*',
            hidden: true,
            redirect: { path: '/404' }
        }
    ]
})

export default router;
