import Mock from 'mockjs';
import _ from 'lodash';

const _selectArr = [
    {
        id: '0',
        name: '筛选项_0'
    },
    {
        id: '1',
        name: '筛选项_1'
    },
    {
        id: '2',
        name: '筛选项_2'
    },
];
const DepartmentList = [
    {
        id: 1,
        department: '计算机',
        classArr: [
            {
                id: 1,
                name: '1班',
                personNum: 40,
                counselor: '张老师',
            }, {
                id: 2,
                name: '2班',
                personNum: 40,
                counselor: '张老师',
            }, {
                id: 3,
                name: '3班',
                personNum: 40,
                counselor: '张老师',
            }
        ],
    }, {
        id: 1,
        department: '物电学院',
        classArr: [
            {
                id: 1,
                name: '1班',
                personNum: 40,
                counselor: '李老师',
            }, {
                id: 2,
                name: '2班',
                personNum: 40,
                counselor: '柳老师',
            }, {
                id: 3,
                name: '3班',
                personNum: 40,
                counselor: '张老师',
            }
        ],
    },
];

const ClassObject= {
    name: '16级计算机科学与技术3班',
    department: '计算机科学与技术',
    className: '3班',
    boyNum: 20,
    girlNum: 14,
    counselor: 'Miss Li',
    studentArr: [
        {
            id: 1,
            studentId: 211111011,
            name: '张三',
            className: '16级计算机科学与技术3班',
            sex: '男',
            account: 1112322,
        },{
            id: 2,
            studentId: 211111014,
            name: '王二',
            className: '16级计算机科学与技术3班',
            sex: '男',
            account: 1112323,
        },{
            id: 3,
            studentId: 211111012,
            name: '李四',
            className: '16级计算机科学与技术3班',
            sex: '女',
            account: 1112324,
        },
    ],
};

const ClassList = [
    {
        id: 1,
        name: '1班',
    },{
        id: 2,
        name: '2班',
    },{
        id: 3,
        name: '3班',
    },{
        id: 4,
        name: '4班',
    },{
        id: 5,
        name: '5班',
    },
];

const RoleList = [
    {
        id: 0,
        role: '管理员',
        competence: '权限1，权限2，权限3，权限4，权限5，权限6',
    },{
        id: 1,
        role: '老师',
        competence: '权限1，权限2，权限3，权限4，权限6',
    },{
        id: 2,
        role: '学生',
        competence: '权限1，权限2，权限5，权限6',
    },
];
const CompetenceList = [];
for (let i = 0; i < 20; i++) {
    CompetenceList.push(Mock.mock({
        id: i,
        name: `权限${i}`,
    }));
}


export {
    DepartmentList,
    ClassObject,
    ClassList,
    RoleList,
    CompetenceList,
};
