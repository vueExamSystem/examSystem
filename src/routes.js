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
import PriewPublish from './views/preview/publish/Home.vue'

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
import ListenList from './views/listen/lis/Home.vue'
import ListenError from './views/listen/error/Home.vue'
/*成绩*/
import ScoreHome from './views/score/Home.vue'
import ScoreStudent from './views/score/student/Home.vue'
import ScoreSet from './views/score/set/Home.vue'
import ScoreTotal from './views/score/total/Home.vue'
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
            path: '/index',
            component: DashbordHome,
            defaultPath: true,  
            name: '首页'
        },
        {
            path: '/question',
            component: QuestionHome,  
            name: '试题',
            redirect: '/question/question',
            children: [
                { path: '/question/question', component: QuestionManger, name: '试题管理',icon:'iconfont icon-shiti-larger', defaultPath: true},
                { path: '/question/tag', component: QuestionTag, name: '标签管理',icon:'iconfont icon-tip-larger' },
                { path: '/question/course', component: QuestionCourse, name: '课程管理',icon:'iconfont icon-kecheng-larger' },
                { path: '/question/chapter', component: QuestionChapter, name: '章节管理',icon:'iconfont icon-chapter-larger' },
                { path: '/question/same', component: QuestionSame, name: '相似题组',icon:'iconfont icon-xiangsitizu-larger' }
            ]
        },
        {
            path: '/paper',
            component: PaperHome,  
            name: '试卷',
            redirect: '/paper/paper',
            children: [
                { path: '/paper/paper', component: PaperDefault, name: '考试试卷', icon:'iconfont icon-kaoshi-larger', defaultPath: true},
                { path: '/paper/quiz', component: PaperQuiz, name: '测验试卷', icon:'iconfont icon-ceyan-larger', },
                { path: '/paper/exercises', component: PaperExercises, name: '练习题', icon:'iconfont icon-pencil-larger' }
            ]
        },
        {
            path: '/preview',
            component: PreviewHome,  
            name: '预习',
            redirect: '/preview/list',
            children: [
                { path: '/preview/list', component: PreviewExample, name: '预习列表', icon:'iconfont icon-pencil-larger', defaultPath: true},
                { path: '/preview/publish', component: PriewPublish, name: '发布预习', icon:'iconfont icon-book-larger' },
                { path: '/preview/doc', component: PreviewDoc, name: '预习资料', icon:'iconfont icon-book-larger' }
            ]
        },
        {
            path: '/test',
            component: TestHome,  
            name: '测验',
            redirect: '/test/list',
            children: [
                { path: '/test/list', component: TestInfo, name: '课堂测验', icon:'iconfont icon-ceyan-larger', defaultPath: true},
                { path: '/test/publish', component: TestPublish, name: '发布测验', icon:'iconfont icon-publish-larger' }
            ]
        },
        {
            path: '/exam',
            component: ExamHome,  
            name: '考试',
            redirect: '/exam/list',
            children: [
                { path: '/exam/list', component: ExamInfo, name: '考 试', icon:'iconfont icon-kaoshi-larger', defaultPath: true},
                { path: '/exam/publish', component: ExamPublish, name: '发布考试', icon:'iconfont icon-publish-larger' }
            ]
        },
        {
            path: '/listen',
            component: ListenHome,
            name: '监考',
            redirect: '/listen/list',
            children: [
                { path: '/listen/list', component: ListenList, name: '考试监考', icon:'iconfont icon-kaoshi-larger', defaultPath: true}
                // { path: '/listen/error', component: ListenError, name: '监考异常', icon:'iconfont icon-kaoshi-larger', defaultPath: true}
            ]
        },
        {
            path: '/score',
            component: ScoreHome,
            name: '成绩',
            redirect: '/score/list',
            children: [
                { path: '/score/list', component: ScoreStudent, name: '学生成绩', icon:'iconfont icon-kaoshi-larger', defaultPath: true},
                { path: '/score/set', component: ScoreSet, name: '成绩设置', icon:'iconfont icon-setting-larger'},
                { path: '/score/total', component: ScoreTotal, name: '综合成绩', icon:'iconfont icon-kaoshi-larger'}
            ]
        },
        {
            path: '/statistics',
            component: StatisticsHome,  
            name: '统计',
            redirect: '/statistics/class',
            children: [
                // { path: '/statistics/department', component: StatisticsDepartment, name: '院系统计', icon:'iconfont icon-department-larger', defaultPath: true},
                { path: '/statistics/class', component: StatisticsClass, name: '班级统计', icon:'iconfont icon-class-larger',defaultPath: true},
                { path: '/statistics/student', component: StatisticsStudent, name: '学生统计', icon:'iconfont icon-student-larger'}
            ]
        },
        {
            path: '/backstage',
            component: BackstageHome,  
            name: '后台',
            redirect: '/backstage/student',
            children: [
                { path: '/backstage/student', component: BackstageStudent, name: '院系管理', icon:'iconfont icon-student-larger', defaultPath: true},
                { path: '/backstage/course', component: BackstageCourse, name: '选课管理', icon:'iconfont icon-kecheng-larger' },
                { path: '/backstage/role', component: BackstageRole, name: '角色管理', icon:'iconfont icon-user-larger' },
                { path: '/backstage/score', component: BackstageScore, name: '成绩管理', icon:'iconfont icon-score-larger' }
                //,{ path: '/backstage/competence', component: BackstageCompetence, name: '权限管理', icon:'iconfont icon-lock-larger' }
            ]
        },
        {
            path: '/setting',
            component: SettingHome,  
            name: '设置',
            redirect: '/setting/user',
            children: [
                { path: '/setting/user', component: SettingInfo, name: '个人信息', icon:'iconfont icon-user-larger', defaultPath: true},
                { path: '/setting/log', component: SettingLog, name: '系统日志', icon:'iconfont icon-log-larger' },
                { path: '/setting/alert', component: SettingAlert, name: '考试异常', icon:'iconfont icon-alert-larger' },
                { path: '/setting/chart', component: SettingChart, name: '数据监控', icon:'iconfont icon-chart-larger' },
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


