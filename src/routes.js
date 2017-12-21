import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/demo/Home.vue'
import Main from './views/demo/Main.vue'
import Table from './views/demo/nav1/Table.vue'
import Form from './views/demo/nav1/Form.vue'
import user from './views/demo/nav1/user.vue'
import Page4 from './views/demo/nav2/Page4.vue'
import Page5 from './views/demo/nav2/Page5.vue'
import Page6 from './views/demo/nav3/Page6.vue'
import echarts from './views/demo/charts/echarts.vue'
import Test from './views/Test.vue'
import HomePage from './views/HomePage.vue'
/*首页*/
import DashbordHome from './views/dashbord/Home.vue'
/*试题*/
import QuestionHome from './views/question/Home.vue'
import QuestionManger from './views/question/QuestionManger.vue'
import TagManger from './views/question/TagManger.vue'
/*试卷*/
import PaperHome from './views/paper/Home.vue'
import PaperDefault from './views/paper/papers/Home.vue'
import PaperQuiz from './views/paper/quiz/Home.vue'
import PaperExercises from './views/paper/exercises/Home.vue'
/*预习*/
import PreviewHome from './views/preview/Home.vue'
/*测验*/
import TestHome from './views/test/Home.vue'
/*考试*/
import ExamHome from './views/exam/Home.vue'
/*监考*/
import ListenHome from './views/listen/Home.vue'
/*成绩*/
import ScoreHome from './views/score/Home.vue'
/*统计*/
import StatisticsHome from './views/statistics/Home.vue'
/*后台*/
import BackstageHome from './views/backstage/Home.vue'
/*设置*/
import SettingHome from './views/setting/Home.vue'


let routes = [
    {
        path: '/',
        component: HomePage,
        children: [
            {
                path: 'dashbord',
                component: DashbordHome,
                name: '首页',
                children: []
            },
            {
                path: 'question',
                component: QuestionHome,
                name: '试题',
                children: [
                    { path: 'questionTag', component: TagManger, name: '标签管理' },
                    { path: '/', component: QuestionManger, name: '试题管理' },
                ]
            },
            {
                path: 'paper',
                component: PaperHome,
                name: '试卷',
                children: [
                    { path: '/', component: PaperDefault, name: '考试试卷',},
                    { path: 'quiz', component: PaperQuiz, name: '随堂测验' },
                    { path: 'exercises', component: PaperExercises, name: '练习题' }
                ]
            },
            {
                path: 'preview',
                component: PreviewHome,
                name: '预习',
                children: []
            },
            {
                path: 'test',
                component: TestHome,
                name: '测验',
                children: []
            },
            {
                path: 'exam',
                component: ExamHome,
                name: '考试',
                children: []
            },
            {
                path: 'listen',
                component: ListenHome,
                name: '监考',
                children: []
            },
            {
                path: 'score',
                component: ScoreHome,
                name: '成绩',
                children: []
            },
            {
                path: 'statistics',
                component: StatisticsHome,
                name: '统计',
                children: []
            },
            {
                path: 'backstage',
                component: BackstageHome,
                name: '后台',
                children: []
            },
            {
                path: 'setting',
                component: SettingHome,
                name: '设置',
                children: []
            },
        ]
    },

    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    { path: '/main', component: Main },
    {
        path: '/past',
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
        path: '/past',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/past',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/past',
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
];

export default routes;