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

import HomePage from './views/HomePage.vue'
/*首页*/
import DashbordHome from './views/dashboard/Home.vue'
/*试题*/
import QuestionHome from './views/question/Home.vue'
import QuestionManger from './views/question/que/Home.vue'
import QuestionTag from './views/question/tag/Home.vue'
import QuestionSame from './views/question/same/Home.vue'
import QuestionChapter from './views/question/chapter/Home.vue'
import QuestionCourse from './views/question/course/Home.vue'
/*试卷*/
import PaperHome from './views/paper/Home.vue'
import PaperDefault from './views/paper/papers/Home.vue'
import PaperQuiz from './views/paper/quiz/Home.vue'
import PaperExercises from './views/paper/exercises/Home.vue'
/*预习*/
import PreviewHome from './views/preview/Home.vue'
import PreviewExample from './views/preview/example/Home.vue'
import PreviewDoc from './views/preview/doc/Home.vue'
/*测验*/
import TestHome from './views/test/Home.vue'
import TestInfo from './views/test/info/Home.vue'
import TestPublish from './views/test/publish/Home.vue'
/*考试*/
import ExamHome from './views/exam/Home.vue'
import ExamInfo from './views/exam/info/Home.vue'
import ExamPublish from './views/exam/publish/Home.vue'
/*监考*/
import ListenHome from './views/listen/Home.vue'
/*成绩*/
import ScoreHome from './views/score/Home.vue'
/*统计*/
import StatisticsHome from './views/statistics/Home.vue'
import StatisticsDepartment from './views/statistics/department/Home.vue'
import StatisticsClass from './views/statistics/class/Home.vue'
import StatisticsStudent from './views/statistics/student/Home.vue'
/*后台*/
import BackstageHome from './views/backstage/Home.vue'
import BackstageStudent from './views/backstage/student/Home.vue'
import BackstageCourse from './views/backstage/course/Home.vue'
import BackstageCompetence from './views/backstage/competence/Home.vue'
import BackstageRole from './views/backstage/role/Home.vue'
import BackstageScore from './views/backstage/score/Home.vue'
/*设置*/
import SettingHome from './views/setting/Home.vue'
import SettingInfo from './views/setting/info/Home.vue'
import SettingLog from './views/setting/log/Home.vue'
import SettingAlert from './views/setting/alert/Home.vue'
import SettingChart from './views/setting/chart/Home.vue'

import testApi from './views/demo/Test.vue'

export const constantRouterMap = [{
    path: '/login',
    component: Login,
    name: '',
    hidden: true
}];

export const asyncRouterMap  = [{
    path: '/',
    component: HomePage,
    redirect: '/index',
    children: [
        {
            path: 'index',
            component: DashbordHome,
            name: '首页'
        },
        {
            path: 'question',
            component: QuestionHome,
            redirect: '/question/question',
            children: [
                { path: 'question', component: QuestionManger, name: '试题管理' },
                { path: 'tag', component: QuestionTag, name: '标签管理' },
                { path: 'course', component: QuestionCourse, name: '课程管理' },
                { path: 'chapter', component: QuestionChapter, name: '章节管理' },
                { path: 'same', component: QuestionSame, name: '相似题组' },
            ]
        },
        {
            path: 'paper',
            component: PaperHome,
            redirect: '/paper/paper',
            children: [
                { path: 'paper', component: PaperDefault, name: '考试试卷',},
                { path: 'quiz', component: PaperQuiz, name: '随堂测验' },
                { path: 'exercises', component: PaperExercises, name: '练习题' }
            ]
        },
        {
            path: 'preview',
            component: PreviewHome,
            redirect: '/preview/list',
            children: [
                { path: 'list', component: PreviewExample, name: '预习题',},
                { path: 'doc', component: PreviewDoc, name: '预习资料' },
            ]
        },
        {
            path: 'test',
            component: TestHome,
            redirect: '/test/list',
            children: [
                { path: 'list', component: TestInfo, name: '课堂测验',},
                { path: 'publish', component: TestPublish, name: '发布测验' },
            ]
        },
        {
            path: 'exam',
            component: ExamHome,
            redirect: '/exam/list',
            children: [
                { path: 'list', component: ExamInfo, name: '考试',},
                { path: 'publish', component: ExamPublish, name: '发布考试' },
            ]
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
            redirect: '/statistics/department',
            children: [
                { path: 'department', component: StatisticsDepartment, name: '院系',},
                { path: 'class', component: StatisticsClass, name: '院系',},
                { path: 'student', component: StatisticsStudent, name: '院系',},
            ]
        },
        {
            path: 'backstage',
            component: BackstageHome,
            redirect: '/backstage/student',
            children: [
                { path: 'student', component: BackstageStudent, name: '学生管理',},
                { path: 'course', component: BackstageCourse, name: '选课管理' },
                { path: 'role', component: BackstageRole, name: '角色管理' },
                { path: 'score', component: BackstageScore, name: '成绩管理' },
                { path: 'competence', component: BackstageCompetence, name: '权限管理' },
            ]
        },
        {
            path: 'setting',
            component: SettingHome,
            redirect: '/setting/user',
            children: [
                { path: 'user', component: SettingInfo, name: '个人信息',},
                { path: 'log', component: SettingLog, name: '系统日志' },
                { path: 'alert', component: SettingAlert, name: '考试异常' },
                { path: 'chart', component: SettingChart, name: '数据监控' },
            ]
        } 
    ]},
    {
        path: '/404',
        component: NotFound,
        name: '404'
    },
    {
        path: '*',
        redirect: { path: '/404' }
    }];
let routes = [
    {
        path: '/',
        component: HomePage,
        children: [
            {
                path: '/index',
                component: DashbordHome,
                name: '首页',
                children: []
            },
            {
                path: 'question',
                component: QuestionHome,
                children: [
                    { path: '/', component: QuestionManger, name: '试题管理' },
                    { path: 'tag', component: QuestionTag, name: '标签管理' },
                    { path: 'course', component: QuestionCourse, name: '课程管理' },
                    { path: 'chapter', component: QuestionChapter, name: '章节管理' },
                    { path: 'same', component: QuestionSame, name: '相似题组' },
                ]
            },
            {
                path: 'paper',
                component: PaperHome,
                children: [
                    { path: '/', component: PaperDefault, name: '考试试卷',},
                    { path: 'quiz', component: PaperQuiz, name: '随堂测验' },
                    { path: 'exercises', component: PaperExercises, name: '练习题' }
                ]
            },
            {
                path: 'preview',
                component: PreviewHome,
                children: [
                    { path: '/', component: PreviewExample, name: '预习题',},
                    { path: 'doc', component: PreviewDoc, name: '预习资料' },
                ]
            },
            {
                path: 'test',
                component: TestHome,
                children: [
                    { path: '/', component: TestInfo, name: '课堂测验',},
                    { path: 'publish', component: TestPublish, name: '发布测验' },
                ]
            },
            {
                path: 'exam',
                component: ExamHome,
                children: [
                    { path: '/', component: ExamInfo, name: '考试',},
                    { path: 'publish', component: ExamPublish, name: '发布考试' },
                ]
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
                children: [
                    { path: '/', component: StatisticsDepartment, name: '院系',},
                    { path: 'class', component: StatisticsClass, name: '院系',},
                    { path: 'student', component: StatisticsStudent, name: '院系',},
                ]
            },
            {
                path: 'backstage',
                component: BackstageHome,
                children: [
                    { path: '/', component: BackstageStudent, name: '学生管理',},
                    { path: 'course', component: BackstageCourse, name: '选课管理' },
                    { path: 'role', component: BackstageRole, name: '角色管理' },
                    { path: 'score', component: BackstageScore, name: '成绩管理' },
                    { path: 'competence', component: BackstageCompetence, name: '权限管理' },
                ]
            },
            {
                path: 'setting',
                component: SettingHome,
                children: [
                    { path: '/', component: SettingInfo, name: '个人信息',},
                    { path: 'log', component: SettingLog, name: '系统日志' },
                    { path: 'alert', component: SettingAlert, name: '考试异常' },
                    { path: 'chart', component: SettingChart, name: '数据监控' },
                ]
            },
        ]
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    // { path: '/main', component: Main },
    // {
    //     path: '/past',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/testApi',
    //     component: testApi,
    //     name: 'testApi',
    // },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

