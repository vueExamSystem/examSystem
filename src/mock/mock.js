import axios from 'axios';
import instance  from '../api/instance';
import u from '../common/js/util';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users} from './data/user';
import {
    TypeList,
    UsageList,
    SubjectList,
    ChapterList,
    GroupList,
    QuestionList,
    CourseList,
    TagList,
    QuestionFilter,
    WeekExam,
    SectionFilter,
    SectionFilter1,
    SameFilter,
} from './data/question';
import {
    PaperList,
    PaperDetail,
    ProblemList,
    AnalysisList,
    radioProblem,
    checkProblem,
    judgeProblem,
    optionProblem
} from './data/paper';
import {
    LogList,
    AlertList,
    ChartList,
} from './data/setting';
import {
    DepExamStaList, DepScoreStaList,
} from './data/statistics';
import {
    DepartmentList,
    ClassObject,
    ClassList,
    RoleList,
    CompetenceList,
    SelectCourseList,
} from './data/backstage';

let _Users = Users;

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        
        let noTokenMock = new MockAdapter(axios);
        let mock = new MockAdapter(instance);

        //登录
        noTokenMock.onGet('/login/verify').reply(config => {
            // let {username, password} = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    // let hasUser = LoginUsers.some(u => {
                    //     if (u.username === username && u.password === password) {
                    //         user = JSON.parse(JSON.stringify(u));
                    //         user.password = undefined;
                    //         return true;
                    //     }
                    // });
                    //
                    // if (hasUser) {
                    //     resolve([200, {code: 0, msg: '请求成功', data:{token: new Date().getTime()}}]);
                    // } else {
                    //     resolve([200, {code: 500, msg: '账号或密码错误'}]);
                    // }
                    resolve([200, {code: 0, msg: '请求成功', data:{token: new Date().getTime()}}]);
                }, 1000);
            });
        });

        //获取用户信息
        mock.onPost('/user/info').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            roles: ['admin'],
                            userName: 'admin',
                            routes:[
                                {
                                    path: '/index'
                                },
                                {
                                    path: '/question',
                                    children: [
                                        { path: '/question/question'},
                                        { path: '/question/tag'},
                                        { path: '/question/course' },
                                        { path: '/question/chapter'},
                                        { path: '/question/same'}
                                    ]
                                },
                                {
                                    path: '/paper',
                                    children: [
                                        { path: '/paper/paper'},
                                        { path: '/paper/quiz'},
                                        { path: '/paper/exercises' }
                                    ]
                                },
                                {
                                    path: '/preview',
                                    children: [
                                        { path: '/preview/list'},
                                        { path: '/preview/doc'},
                                    ]
                                },
                                {
                                    path: '/test',
                                    children: [
                                        { path: '/test/list'},
                                        { path: '/test/publish'}
                                    ]
                                },
                                {
                                    path: '/exam',
                                    children: [
                                        { path: '/exam/list'},
                                        { path: '/exam/publish'}
                                    ]
                                },
                                {
                                    path: '/listen',
                                    children: []
                                },
                                {
                                    path: '/score',
                                    children: []
                                },
                                {
                                    path: '/statistics',
                                    children: [
                                        { path: '/statistics/department'},
                                        { path: '/statistics/class'},
                                        { path: '/statistics/student' }
                                    ]
                                },
                                {
                                    path: '/backstage',
                                    children: [
                                        { path: '/backstage/student'},
                                        { path: '/backstage/course'},
                                        { path: '/backstage/role'},
                                        { path: '/backstage/score'},
                                        { path: '/backstage/competence'},
                                    ]
                                },
                                {
                                    path: '/setting',
                                    children: [
                                        { path: '/setting/user'},
                                        { path: '/setting/log'},
                                        { path: '/setting/alert'},
                                        { path: '/setting/chart'}
                                    ]
                                } 
                            ]
                        }
                    }]);
                }, 1000);
            });
        });

        //获取用户列表
        mock.onGet('/user/list').reply(config => {
            let {name} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });

        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(config => {
            let {page, name, pageSize} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            pageSize = pageSize ? pageSize : 20;
            mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });

        //删除用户
        mock.onGet('/user/remove').reply(config => {
            let {id} = config.params;
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除用户
        mock.onGet('/user/batchremove').reply(config => {
            let {ids} = config.params;
            ids = ids.split(',');
            _Users = _Users.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //编辑用户
        mock.onGet('/user/edit').reply(config => {
            let {id, name, addr, age, birth, sex} = config.params;
            _Users.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.addr = addr;
                    u.age = age;
                    u.birth = birth;
                    u.sex = sex;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onGet('/user/add').reply(config => {
            let {name, addr, age, birth, sex} = config.params;
            _Users.push({
                name: name,
                addr: addr,
                age: age,
                birth: birth,
                sex: sex
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
        // test
        mock.onPost('/test').reply(config => {
            const {para} = config.params;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (para === '1') {
                        resolve([200, {code: 200, msg: 'success'}]);
                    } else {
                        resolve([200, {code: 500, msg: 'error'}]);
                    }
                }, 1000);
            });
        });

        //新增
        mock.onGet('/add').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
        //新增
        mock.onGet('/del').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //新增
        mock.onGet('/question/save').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });

        //获取本周考试
        mock.onGet('/weekExam/list').reply(config => {
            return u.getMockList(config, WeekExam);
        });

        // /studentScore/chart
        mock.onGet('/studentScore/chart').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {code: 200, msg: 'success', data: {
                        name: ['班级一','班级二','班级三','班级四','班级五','班级六','班级七'],
                        excellect: [8, 8, 8, 8, 8, 8, 8],
                        good: [30, 30, 30, 30, 30, 30, 30],
                        mid: [54, 54, 54, 54, 54, 54, 54],
                        noPass: [8, 8, 8, 8, 8, 8, 8],
                    }}]);
                }, 2000);
            });
        });
        /** 以下question **/

        //获取que列表
        mock.onGet('/question/list').reply(config => {
            return u.getMockList(config, QuestionList);
        });

        mock.onGet('/question/filter').reply(config => {
            return u.getMockList(config, QuestionFilter);
        });
        //获取章节列表
        mock.onGet(`/question/detail`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: {
                            isNecessary: true,//必做題
                            type:'radio',//題目類型
                            title: '某物体在一足够大的光滑平面上向西运动，当它受到一个向南的恒定外力作用时，物体运动将是（）',
                            answer:'A',
                            options:[{
                                flag:'A',
                                text:'直线运动且是匀变速直线运动'
                            },{
                                flag:'B',
                                text:'曲线运动但加速度方向不变、大小不变，是匀变速运动'
                            },{
                                flag:'C',
                                text:'曲线运动但加速度方向改变、大小不变，是非匀变速曲线运动'
                            },{
                                flag:'D',
                                text:'曲线运动，加速度大小和方向均改变，是非匀变速曲线运动'
                            }],
                            analysis:'光滑、摩擦力',
                            keynote:'曲线运动，匀速运动',
                            creator:'Admin',
                        }
                    }]);
                }, 2000);
            });
        });
        //获取章节列表
        mock.onGet(`/same/filter`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, SameFilter]);
                }, 2000);
            });
        });

        //获取tag列表
        mock.onGet('/category/list').reply(config => {
            return u.getMockList(config, TagList);
        });

        //获取科目列表
        mock.onGet(`/subject/list`).reply(config => {
            return u.getMockList(config, SubjectList);
        });

        //获取章节列表
        mock.onGet(`/chapter/list`).reply(config => {
            return u.getMockList(config, ChapterList);
        });

        //获取章节列表
        mock.onGet(`/section/filter`).reply(config => {
            const course = config.filter.courseid;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, course === '1' ? SectionFilter : SectionFilter1]);
                }, 2000);
            });
        });

        //获取题组列表
        mock.onGet(`/same/list`).reply(config => {
            return u.getMockList(config, GroupList);
        });
        mock.onGet(`/same/tree`).reply(config => {
            return u.getMockList(config, {
                id: 1,
                label: '课程 1',
                children: [{
                    id: 4,
                    label: '章节 1',
                    children: [{
                        id: 9,
                        label: '题目 1'
                    }, {
                        id: 10,
                        label: '题目 2'
                    }]
                }]
            });
        });

        //获取course列表
        mock.onGet(`/course/list`).reply(config => {
            return u.getMockList(config, CourseList);
        });

        //编辑course
        mock.onGet('/course/edit').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        /**  以下成绩 **/
        mock.onGet(`/student/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: {
                            totalCount: '3',
                            rows: [{
                                id: '1',
                                course: '大学物理',
                                studentNo: '211111011',
                                name: '张三',
                                previewPoint: '80',
                                testPoint: '88',
                                examPoint: '76',
                                score: '83',
                                grade: '优秀',
                            },{
                                id: '2',
                                course: '大学物理',
                                studentNo: '211111011',
                                name: '张三1',
                                previewPoint: '80',
                                testPoint: '88',
                                examPoint: '76',
                                score: '83',
                                grade: '优秀',
                            },{
                                id: '3',
                                course: '大学物理',
                                studentNo: '211111011',
                                name: '张三2',
                                previewPoint: '80',
                                testPoint: '88',
                                examPoint: '76',
                                score: '83',
                                grade: '优秀',
                            }],
                        },
                    }]);
                }, 2000);
            });
        });
        mock.onGet(`/student/filter`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: [{
                            title:'年级',
                            field:'grade',
                            children:[{
                                value:'2014',
                                text:'14级'
                            },{
                                value:'2015',
                                text:'15级'
                            },{
                                value:'2016',
                                text:'16级'
                            },{
                                value:'2017',
                                text:'17级'
                            }]
                        },{
                            title:'院系',
                            field:'dep',
                            children:[{
                                value:'2014',
                                text:'计算机'
                            },{
                                value:'2015',
                                text:'物电'
                            },{
                                value:'2016',
                                text:'体院'
                            }]
                        },{
                            title:'课程',
                            field:'project',
                            children:[{
                                value:'hysics',
                                text:'大学物理'
                            },{
                                value:'mathematics',
                                text:'高等数学'
                            },{
                                value:'english',
                                text:'大学英语'
                            }]
                        },{
                            title:'班级',
                            field:'status',
                            children:[{
                                value:'1',
                                text:'11班'
                            },{
                                value:'2',
                                text:'12班'
                            }]
                        }],
                    }]);
                }, 2000);
            });
        });

        /**  以下预习 **/
        //列表
        mock.onGet(`/example/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: {
                            totalCount: '3',
                            rows: [{
                                id: '1',
                                name: '物理第一章预习',
                                paperName: '物理第一章',
                                endTime: '2017/12/10 8:00',
                                previewClass: '16级计算机3班'
                            },{
                                id: '2',
                                name: '物理第一章预习',
                                paperName: '物理第一章',
                                endTime: '2017/12/10 8:00',
                                previewClass: '16级计算机3班'
                            },{
                                id: '3',
                                name: '物理第一章预习',
                                paperName: '物理第一章',
                                endTime: '2017/12/10 8:00',
                                previewClass: '16级计算机3班'
                            }],
                        },
                    }]);
                }, 2000);
            });
        });

        //filter
        mock.onGet(`/example/filter`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: [{
                            title:'课程',
                            field:'project',
                            children:[{
                                value:'hysics',
                                text:'大学物理'
                            },{
                                value:'mathematics',
                                text:'高等数学'
                            },{
                                value:'english',
                                text:'大学英语'
                            }]
                        },{
                            title:'年级',
                            field:'grade',
                            children:[{
                                value:'2014',
                                text:'14级'
                            },{
                                value:'2015',
                                text:'15级'
                            },{
                                value:'2016',
                                text:'16级'
                            },{
                                value:'2017',
                                text:'17级'
                            }]
                        },{
                            title:'状态',
                            field:'status',
                            children:[{
                                value:'unfinished',
                                text:'未结束'
                            },{
                                value:'finished',
                                text:'已结束'
                            }]
                        }],
                    }]);
                }, 2000);
            });
        });
        //列表
        mock.onGet(`/example/detail/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: {
                            totalCount: '3',
                            rows: [{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            }],
                        },
                    }]);
                }, 2000);
            });
        });

        //filter
        mock.onGet(`/example/detail/filter`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: [{
                            title: '院系',
                            field: 'department',
                            children: [{
                                value: 'computer',
                                text: '计算机'
                            },{
                                value: 'accounting',
                                text: '会计'
                            },{
                                value: 'traffic',
                                text: '交运'
                            },{
                                value: 'park',
                                text: '园林'
                            },{
                                value: 'architecture ',
                                text: '建筑与艺术'
                            }]
                        },{
                            title: '班级',
                            field: 'class',
                            children: [{
                                value: '20170801',
                                text: '1班'
                            },{
                                value: '20170802',
                                text: '2班'
                            },{
                                value: '20170803',
                                text: '3班'
                            }]
                        }],
                    }]);
                }, 2000);
            });
        });
        //列表
        mock.onGet(`/example/add/info`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: {
                            subject: [{
                                id: '0',
                                name: '大学物理',
                            },{
                                id: '1',
                                name: '英语',
                            },{
                                id: '2',
                                name: '体育',
                            },],
                            grade: [{
                                id: '0',
                                name: '14',
                            },{
                                id: '1',
                                name: '15',
                            }],
                            department: [{
                                id: '0',
                                name: '计科',
                            }, {
                                id: '1',
                                name: '物电',
                            },],
                            class: [{
                                id: '0',
                                name: '01班',
                            },{
                                id: '3',
                                name: '06班',
                            }],
                        },
                    }]);
                }, 2000);
            });
        });
        mock.onGet(`/doc/add/info`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: {
                            course: [{
                                id: '0',
                                name: '大学物理',
                            },{
                                id: '1',
                                name: '英语',
                            },{
                                id: '2',
                                name: '体育',
                            }]
                        },
                    }]);
                }, 2000);
            });
        });
        //列表
        mock.onGet(`/doc/list`).reply(config => {
            return u.getMockList(config, [{
                id: '1',
                name:'物理期中考试',
                project:'大学物理'
            },{
                id: '2',
                name:'物理期中考试',
                project:'大学物理'
            },{
                id: '3',
                name:'物理期中考试',
                project:'大学物理'
            }]);
        });

        //filter
        mock.onGet(`/doc/filter`).reply(config => {
            return u.getMockList(config, [{
                title:'课程',
                field:'project',
                children:[{
                    value:'hysics',
                    text:'大学物理'
                },{
                    value:'mathematics',
                    text:'高等数学'
                },{
                    value:'english',
                    text:'大学英语'
                }]
            }]);
        });

        /** 以下test **/
        mock.onGet(`/classTest/list`).reply(config => {
            return u.getMockList(config, [{
                id: '1',
                name:'物理测试1',
                paper: {
                    id: 2,
                    name: '物理期中试卷1',
                },
                testRange:'2018/01/01 8:00-8:20',
                status:'进行中',
                grade: {
                    id: 5,
                    name: '18级',
                },
                department: {
                    id: 2,
                    name: '物理',
                },
                listener:{
                    id: 3,
                    name: '张老师',
                },
                testClass:{
                    id: 7,
                    name: '16级计算机3班',
                },
            }]);
        });
        mock.onGet(`/classTest/filter`).reply(config => {
            return u.getMockList(config, [{
                title:'课程',
                field:'project',
                children:[{
                    value:'hysics',
                    text:'大学物理'
                },{
                    value:'mathematics',
                    text:'高等数学'
                },{
                    value:'english',
                    text:'大学英语'
                }]
            },{
                title:'状态',
                field:'status',
                children:[{
                    value:'0',
                    text:'未开始'
                },{
                    value:'1',
                    text:'进行中'
                },{
                    value:'2',
                    text:'已结束'
                }]
            }]);
        });
        mock.onGet(`/classTest/detail/list`).reply(config => {
            return u.getMockList(config, [{
                studentNo: '01112307',
                name: '叶子',
                class: '16级计算机3班',
                percentage: 70
            },{
                studentNo: '01112307',
                name: '叶子',
                class: '16级计算机3班',
                percentage: 70
            },{
                studentNo: '01112307',
                name: '叶子',
                class: '16级计算机3班',
                percentage: 70
            },{
                studentNo: '01112307',
                name: '叶子',
                class: '16级计算机3班',
                percentage: 70
            },{
                studentNo: '01112307',
                name: '叶子',
                class: '16级计算机3班',
                percentage: 70
            },{
                studentNo: '01112307',
                name: '叶子',
                class: '16级计算机3班',
                percentage: 70
            }]);
        });
        mock.onGet(`/classTest/detail/filter`).reply(config => {
            return u.getMockList(config, [{
                title: '院系',
                field: 'department',
                children: [{
                    value: 'computer',
                    text: '计算机'
                },{
                    value: 'accounting',
                    text: '会计'
                },{
                    value: 'traffic',
                    text: '交运'
                },{
                    value: 'park',
                    text: '园林'
                },{
                    value: 'architecture ',
                    text: '建筑与艺术'
                }]
            },{
                title: '班级',
                field: 'class',
                children: [{
                    value: '20170801',
                    text: '1班'
                },{
                    value: '20170802',
                    text: '2班'
                },{
                    value: '20170803',
                    text: '3班'
                }]
            }]);
        });
        mock.onGet(`/publish/add/info`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '成功',
                        data: {
                            subjects: [{
                                id: '0',
                                name: '大学物理上',
                            },{
                                id: '1',
                                name: '大学物理下',
                            },{
                                id: '2',
                                name: '大学英语',
                            }],
                            test: [{
                                id: '0',
                                name: '物理测试卷1',
                            },{
                                id: '1',
                                name: '物理测试卷2',
                            },{
                                id: '2',
                                name: '物理测试卷3',
                            }],
                            grade: [{
                                id: '0',
                                name: '16级',
                            },{
                                id: '1',
                                name: '14级',
                            }],
                            department: [{
                                id: '0',
                                name: '物理工程系',
                            },{
                                id: '1',
                                name: '计算机工程系',
                            }],
                            class: [{
                                id: '0',
                                name: '1班',
                            },{
                                id: '1',
                                name: '3班',
                            }],
                            listeners: [{
                                id: '0',
                                name: '张老师',
                            },{
                                id: '1',
                                name: '李老师',
                            }],
                        },
                    }]);
                }, 2000);
            });
        });


        /** 以下setting **/

        //获取log列表
        mock.onGet('/log/list').reply(config => {
            return u.getMockList(config, LogList);
        });
        //获取log列表
        mock.onGet('/alert/list').reply(config => {
            return u.getMockList(config, AlertList);
        });
        //获取chart列表
        mock.onGet('/chart/list').reply(config => {
            return u.getMockList(config, ChartList);
        });


        /** 以下statistics **/
        //获取院系考试统计列表
        mock.onGet('/department/exam/statistics/list').reply(config => {
            return u.getMockList(config, DepExamStaList);
        });
        //获取院系成绩统计列表
        mock.onGet('/department/score/statistics/list').reply(config => {
            return u.getMockList(config, DepScoreStaList);
        });

        /** 以下backstage **/
        //获取院系列表
        mock.onGet('/department/list').reply(config => {
            return u.getMockList(config, DepartmentList);
        });
        //获取班级列表
        mock.onGet('/class/list').reply(config => {
            return u.getMockList(config, ClassList);
        });
        //获取班级列表
        mock.onGet('/role/list').reply(config => {
            return u.getMockList(config, RoleList);
        });
        //获取权限列表
        mock.onGet('/competence/list').reply(config => {
            return u.getMockList(config, CompetenceList);
        });
        //获取选课列表
        mock.onGet('/selectCourse/list').reply(config => {
            return u.getMockList(config, SelectCourseList);
        });
        //获取班级详情
        mock.onGet('/class/detail').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, ClassObject]);
                }, 1000);
            });
        });

        /** 以下paper **/
        //获取试卷列表
        mock.onGet(`/paper/filter`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        data: [{
                            title:'课程',
                            field:'project',
                            children:[{
                                value:'hysics',
                                text:'大学物理'
                            },{
                                value:'mathematics',
                                text:'高等数学'
                            },{
                                value:'english',
                                text:'大学英语'
                            }]
                        },{
                            title:'类别',
                            field:'category',
                            children:[{
                                value:'1',
                                text:'随机组卷'
                            },{
                                value:'2',
                                text:'手动组卷'
                            }]
                        },{
                            title:'状态',
                            field:'status',
                            children:[{
                                value:'0',
                                text:'未完成'
                            },{
                                value:'1',
                                text:'已完成'
                            }]
                        }],
                        msg: "获取成功"
                    }]);
                },1000);
            });
        });
        //获取试卷列表
        mock.onPost(`/paper/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        data: {
                            totalCount: 239,
                            rows: PaperList
                        },
                        msg: "获取成功"
                    }]);
                },1000);
            });
            return u.getMockList(config, PaperList);
        });
        //获取试卷题目列表
        mock.onPost(`/paper/problem/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '获取成功',
                        data: {
                            detail:{
                                status: '0',
                                creator: 'admin',
                                mode: 'manual',
                                name: '1111111'
                            },
                            list: AnalysisList
                        }
                    }]);
                }, 1000);
            });
        });
        //删除试卷题目
        mock.onPost(`/paper/problem/remove`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '删除成功',
                        data: '删除成功'
                    }]);
                }, 1000);
            });
        });
        //更新试卷状态
        mock.onPost(`/paper/update/status`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '更新成功',
                        data: '更新成功'
                    }]);
                }, 1000);
            });
        });
        //获取试卷题目过滤器
        mock.onPost(`/paper/problem/filter`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '获取成功',
                        data: [{
                            title: '分类',
                            field: 'category',
                            children:[{
                                value: 'wuli',
                                text: '基础物理'
                            },{
                                value: 'shuxue1',
                                text: '高等数学上'
                            },{
                                value: 'shuxue2',
                                text: '高等数学下'
                            },{
                                value: 'yingyu',
                                text: '英语口语'
                            }]
                        },{
                            title: '标签',
                            field: 'label',
                            children:[{
                                value: 'easy',
                                text: '送分题'
                            },{
                                value: 'simple',
                                text: '简单题'
                            },{
                                value: 'trap',
                                text: '易错题'
                            }]
                        }]
                    }]);
                }, 1000);
            });
        });
        //获取试卷题目过滤器
        mock.onPost(`/paper/problem/question`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200,{
                        code: '0',
                        msg: '获取成功',
                        data: {
                            totalCount: 231,
                            rows:[{
                                name: '万有引力',
                                category: '单选',
                                project: '大学物理',
                                chapter: '第一章',
                                questionGroup: '组别01',
                                innerRadio: '11',
                                children:[{
                                    id: '11',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                },{
                                    id: '12',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                }]
                            },{
                                name: '万有引力',
                                category: '单选',
                                project: '大学物理',
                                chapter: '第一章',
                                questionGroup: '组别02',
                                innerRadio: '21',
                                children:[{
                                    id: '21',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                },{
                                    id: '22',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                }]
                            },{
                                name: '万有引力',
                                category: '单选',
                                project: '大学物理',
                                chapter: '第一章',
                                questionGroup: '组别03',
                                innerRadio: '31',
                                children:[{
                                    id: '31',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                },{
                                    id: '32',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                }]
                            },{
                                name: '万有引力',
                                category: '单选',
                                project: '大学物理',
                                chapter: '第一章',
                                questionGroup: '组别04',
                                innerRadio: '41',
                                children:[{
                                    id: '41',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                },{
                                    id: '42',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                }]
                            },{
                                name: '万有引力',
                                category: '单选',
                                project: '大学物理',
                                chapter: '第一章',
                                questionGroup: '组别05',
                                innerRadio: '51',
                                children:[{
                                    id: '51',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                },{
                                    id: '52',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                }]
                            },{
                                name: '万有引力',
                                category: '单选',
                                project: '大学物理',
                                chapter: '第一章',
                                questionGroup: '组别06',
                                innerRadio: '61',
                                children:[{
                                    id: '61',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                },{
                                    id: '6',
                                    name: '万有引力',
                                    category: '单选',
                                    project: '大学物理',
                                    chapter: '第一章'
                                }]
                            }]
                        }
                    }]);
                }, 1000);
            });
        });
        //试卷添加试题
        mock.onPost(`/paper/problem/add`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                            code: '0',
                            msg: '添加成功',
                            data: ''
                        }]);
                }, 1000);
            });
        });
        //添加试卷
        mock.onPost(`/paper/submit`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                            code: '0',
                            msg: '提交成功',
                            data: ''
                        }]);
                }, 1000);
            });
        });
        //编辑试卷
        mock.onPost(`/paper/edit`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                            code: '0',
                            msg: '提交成功',
                            data: ''
                        }]);
                }, 1000);
            });
        });
        //删除试卷
        mock.onPost(`/paper/remove`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                            code: '0',
                            msg: '删除成功',
                            data: ''
                        }]);
                }, 1000);
            });
        });


        //监考filter
        mock.onGet(`/listen/filter`).reply(config => {
            return u.getMockList(config, [{
                title:'课程',
                field:'project',
                children:[{
                    value:'hysics',
                    text:'大学物理'
                },{
                    value:'mathematics',
                    text:'高等数学'
                },{
                    value:'english',
                    text:'大学英语'
                }]
            },{
                title:'年级',
                field:'grade',
                children:[{
                    value:'2014',
                    text:'14级'
                },{
                    value:'2015',
                    text:'15级'
                },{
                    value:'2016',
                    text:'16级'
                },{
                    value:'2017',
                    text:'17级'
                }]
            }]);
        });
        //监考列表
        mock.onPost(`/listen/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: {
                            totalCount: Math.floor(Math.random() * 1000),
                            rows: [{
                                id: 1,
                                name: '物理期中考试1',
                                endTime: '2018/02/26 16:27',
                                listener: '张老师',
                                exammer: '16级计算机3班,4班' 
                            },{
                                id: 2,
                                name: '物理期中考试3',
                                endTime: '2018/02/26 17:15',
                                listener: '张老师',
                                exammer: '16级计算机3班,4班' 
                            },{
                                id: 3,
                                name: '物理期中考试3',
                                endTime: '2018/02/26 17:10',
                                listener: '张老师',
                                exammer: '16级计算机3班,4班' 
                            },{
                                id: 4,
                                name: '物理期中考试4',
                                endTime: '2018/02/27 16:16',
                                listener: '张老师',
                                exammer: '16级计算机3班,4班' 
                            },{
                                id: 5,
                                name: '物理期中考试5',
                                endTime: '2018/02/28 15:00',
                                listener: '张老师',
                                exammer: '16级计算机3班,4班' 
                            },{
                                id: 6,
                                name: '物理期中考试6',
                                endTime: '2018/03/01 17:00',
                                listener: '张老师',
                                exammer: '16级计算机3班,4班' 
                            }],
                        }
                    }]);
                }, 1000);
            });
        });

        //被监考的考试人员filter
        mock.onGet(`/listen/detail/filter`).reply(config => {
            return u.getMockList(config, [{
                title: '院系',
                field: 'department',
                children: [{
                    value: 'computer',
                    text: '计算机'
                },{
                    value: 'accounting',
                    text: '会计'
                },{
                    value: 'traffic',
                    text: '交运'
                },{
                    value: 'park',
                    text: '园林'
                },{
                    value: 'architecture ',
                    text: '建筑与艺术'
                }]
            },{
                title: '班级',
                field: 'class',
                children: [{
                    value: '20170801',
                    text: '1班'
                },{
                    value: '20170802',
                    text: '2班'
                },{
                    value: '20170803',
                    text: '3班'
                }]
            }]);
        });

        //被监考的考试人员列表
        mock.onPost(`/listen/statistics`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: {
                            complete: 0.6, //已完成比例
                            online: 25, //在线人数
                            outline: 5, //不在线
                            total: 30, //参考总人数
                            submitted: 0.7, //已交卷比例
                            avgExam: 0.6, //考试总体平均答题
                            unExam: 0.01 //未开始答卷
                        }
                    }]);
                }, 1000);
            });
        });

        //被监考的考试人员列表
        mock.onPost(`/listen/detail/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: {
                            totalCount: Math.floor(Math.random() * 1000),
                            rows: [{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            },{
                                studentNo: '01112307',
                                name: '叶子',
                                class: '16级计算机3班',
                                percentage: 70
                            }]
                         }
                    }]);
                }, 1000);
            });
        });

        //监考异常列表
        mock.onPost(`/listen/abnormal/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: {
                            totalCount: Math.floor(Math.random() * 1000),
                            rows:[{
                                id: 1,
                                studentNo: '01112307',
                                studentName: '黄烨',
                                abnTime: '2018/02/25 16:08:29',
                                abnEvent: '多端登录，有作弊现象',
                                isOutline: 1, //强制下线
                                isCheap: 1 //作弊处理
                            },{
                                id: 2,
                                studentNo: '01112308',
                                studentName: '张一',
                                abnTime: '2018/02/25 16:18:29',
                                abnEvent: '多端登录，有作弊现象',
                                isOutline: 0, //强制下线
                                isCheap: 1 //作弊处理
                            },{
                                id: 3,
                                studentNo: '01112308',
                                studentName: '张一',
                                abnTime: '2018/02/25 16:18:29',
                                abnEvent: '多端登录，有作弊现象',
                                isOutline: 1, //强制下线
                                isCheap: 0 //作弊处理
                            },{
                                id: 4,
                                studentNo: '01112307',
                                studentName: '黄烨',
                                abnTime: '2018/02/25 16:08:29',
                                abnEvent: '多端登录，有作弊现象',
                                isOutline: 0, //强制下线
                                isCheap: 0 //作弊处理
                            }]
                        }
                    }]);
                }, 1000);
            });
        });
        //更新异常列表
        mock.onPost(`/listen/abnormal/update`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: ''
                    }]);
                }, 1000);
            });
        });


        //考试过滤器
        mock.onGet(`/exam/filter`).reply(config => {
            return u.getMockList(config, [{
                title:'课程',
                field:'project',
                children:[{
                    value:'hysics',
                    text:'大学物理'
                },{
                    value:'mathematics',
                    text:'高等数学'
                },{
                    value:'english',
                    text:'大学英语'
                }]
            },{
                title:'状态',
                field:'status',
                children:[{
                    value:'0',
                    text:'未开始'
                },{
                    value:'1',
                    text:'进行中'
                },{
                    value:'2',
                    text:'已结束'
                }]
            }]);
        });
        //考试列表
        mock.onPost(`/exam/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: {
                            totalCount: 234,
                            rows: [{
                                id: '1',
                                name:'物理测试1',
                                paper: {
                                    id: 2,
                                    name: '物理期中试卷1',
                                },
                                beginTime:'2018/02/27 16:00',
                                endTime: '2018/02/27 18:20',
                                status:'2',
                                grade: {
                                    id: 5,
                                    name: '18级',
                                },
                                department: {
                                    id: 2,
                                    name: '物理',
                                },
                                listener:{
                                    id: 3,
                                    name: '张老师',
                                },
                                testClass:{
                                    id: 7,
                                    name: '18级计算机3班',
                                },
                            },{
                                id: '2',
                                name:'物理测试2',
                                paper: {
                                    id: 2,
                                    name: '物理期中试卷2',
                                },
                                beginTime:'2018/02/27 17:00',
                                endTime: '2018/02/27 18:20',
                                status:'1',
                                grade: {
                                    id: 5,
                                    name: '16级',
                                },
                                department: {
                                    id: 2,
                                    name: '物理',
                                },
                                listener:{
                                    id: 3,
                                    name: '张老师',
                                },
                                testClass:{
                                    id: 7,
                                    name: '16级计算机3班',
                                },
                            },{
                                id: '3',
                                name:'物理测试3',
                                paper: {
                                    id: 2,
                                    name: '物理期中试卷3',
                                },
                                beginTime:'2018/02/27 14:00',
                                endTime: '2018/02/27 16:00',
                                status:'3',
                                grade: {
                                    id: 5,
                                    name: '15级',
                                },
                                department: {
                                    id: 2,
                                    name: '物理',
                                },
                                listener:{
                                    id: 3,
                                    name: '张老师',
                                },
                                testClass:{
                                    id: 7,
                                    name: '15级计算机3班',
                                },
                            },{
                                id: '4',
                                name:'物理测试4',
                                paper: {
                                    id: 2,
                                    name: '物理期中试卷4',
                                },
                                beginTime:'2018/02/27 14:00',
                                endTime: '2018/02/27 16:00',
                                status:'3',
                                grade: {
                                    id: 5,
                                    name: '17级',
                                },
                                department: {
                                    id: 2,
                                    name: '物理',
                                },
                                listener:{
                                    id: 3,
                                    name: '张老师',
                                },
                                testClass:{
                                    id: 7,
                                    name: '17级计算机3班',
                                },
                            },{
                                id: '5',
                                name:'物理测试5',
                                paper: {
                                    id: 2,
                                    name: '物理期中试卷5',
                                },
                                beginTime:'2018/02/27 14:00',
                                endTime: '2018/02/27 16:00',
                                status:'3',
                                grade: {
                                    id: 5,
                                    name: '17级',
                                },
                                department: {
                                    id: 2,
                                    name: '物理',
                                },
                                listener:{
                                    id: 3,
                                    name: '张老师',
                                },
                                testClass:{
                                    id: 7,
                                    name: '17级计算机3班',
                                },
                            }]
                        }
                    }]);
                }, 1000);
            });
        });
        // 编辑考试
        mock.onPost(`/exam/update`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: ''
                    }]);
                }, 1000);
            });
        });
        // 发布考试
        mock.onPost(`/exam/add`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: {
                            id: '88'
                        }
                    }]);
                }, 1000);
            });
        });
        // 考试班级列表
        mock.onPost(`/exam/classlist`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: [{
                            id: '1',
                            department: {
                                id: '1',
                                name: '计算机'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '1',
                                name: '3班',
                                count: 30,
                                headmaster: '张老师',
                                exammer: ['211111001','211111003','211111014','211111016','211111008','211111009']
                            },
                        },{
                            id: '2',
                            department: {
                                id: '1',
                                name: '计算机'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '1',
                                name: '4班',
                                count: 32,
                                headmaster: '李老师',
                                exammer: ['211111011','211111012','211111014','211111001','211111010','211111009']
                            },
                        },{
                            id: '3',
                            department: {
                                id: '1',
                                name: '物电'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '1',
                                name: '4班',
                                count: 32,
                                headmaster: '张老师',
                                exammer: ['211111001','211111003','211111014','211111006','211111008']
                            },
                        },{
                            id: '4',
                            department: {
                                id: '1',
                                name: '物电'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '1',
                                name: '5班',
                                count: 30,
                                headmaster: '张老师',
                                exammer: ['211111001','211111013','211111004','211111005','211111007','211111009']
                            },
                        },{
                            id: '5',
                            department: {
                                id: '1',
                                name: '化工'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '1',
                                name: '4班',
                                count: 31,
                                headmaster: '张老师',
                                exammer: ['211111011','211111013','211111014','211111016','211111008','211111009']
                            },
                        }]
                    }]);
                }, 1000);
            });
        });
        // 获取学习该课程但未参加考试的班级
        mock.onPost(`/exam/unclasslist`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: [{
                            department: {
                                id: '1',
                                name: '计算机'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '2',
                                name: '2班',
                                count: 32
                            }
                        },{
                            department: {
                                id: '1',
                                name: '计算机'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '3',
                                name: '3班',
                                count: 33
                            }
                        },{
                            department: {
                                id: '1',
                                name: '计算机'
                            },
                            grade: {
                                id: '2',
                                name: '18级'
                            },
                            class: {
                                id: '4',
                                name: '4班',
                                count: 32
                            },
                        },{
                            department: {
                                id: '2',
                                name: '物电'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '24',
                                name: '4班',
                                count: 32
                            },
                        },{
                            department: {
                                id: '2',
                                name: '物电'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '25',
                                name: '5班',
                                count: 30
                            },
                        },{
                            department: {
                                id: '3',
                                name: '化工'
                            },
                            grade: {
                                id: '1',
                                name: '17级'
                            },
                            class: {
                                id: '34',
                                name: '4班',
                                count: 31
                            }
                        }]
                    }]);
                }, 1000);
            });
        });
        // 添加考试班级
        mock.onPost(`/exam/addclass`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: ''
                    }]);
                }, 1000);
            });
        });
        //获取班级学生
        mock.onPost(`/class/student`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: '0',
                        msg: '成功',
                        data: [{
                            studentNo: '211111001',
                            name: '张一',
                            gender: '1',
                            age: '18',
                            remark: '班长'
                        },{
                            studentNo: '211111002',
                            name: '张二',
                            gender: '0',
                            age: '18',
                            remark: '体育特长生'
                        },{
                            studentNo: '211111003',
                            name: '张三',
                            gender: '0',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111004',
                            name: '张三',
                            gender: '0',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111005',
                            name: '张三',
                            gender: '0',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111006',
                            name: '张三',
                            gender: '1',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111007',
                            name: '张三',
                            gender: '1',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111008',
                            name: '张三',
                            gender: '0',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111009',
                            name: '张三',
                            gender: '0',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111010',
                            name: '张三',
                            gender: '1',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111011',
                            name: '张三',
                            gender: '1',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111012',
                            name: '张三',
                            gender: '0',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111013',
                            name: '张三',
                            gender: '1',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111014',
                            name: '张三',
                            gender: '0',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111015',
                            name: '张三',
                            gender: '1',
                            age: '18',
                            remark: ''
                        },{
                            studentNo: '211111016',
                            name: '张三',
                            gender: '1',
                            age: '18',
                            remark: ''
                        }]
                    }]);
                }, 1000);
            });
        });
    }
};
