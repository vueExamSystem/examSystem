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
const TypeList = [];
const UsageList = [];
const GroupList = [];
const ChapterList = [];
const SubjectList = [];
const QuestionList = [];
const TagList = [];
const CourseList = [];
const WeekExam = [];

for (let i = 0; i < 30; i++) {
    WeekExam.push(Mock.mock({
        id: i + 1,
        name: '物理期中考试',
        time: '2017/12/10 8:00-9:00',
        state: i === 2 ? '0' : '1',
        teacher: '张老师',
        examPerson: '16级计算机3班',
    }));
}

for (let i = 0; i < 3; i++) {
    TypeList.push(Mock.mock({
        id: i,
        name: `类型_${i}`,
    }));
}
for (let i = 0; i < 3; i++) {
    UsageList.push(Mock.mock({
        id: i,
        name: `用途_${i}`,
    }));
}
for (let i = 0; i < 3; i++) {
    SubjectList.push(Mock.mock({
        id: i,
        name: `科目_${i}`,
    }));
}
for (let i = 0; i < 3; i++) {
    ChapterList.push(Mock.mock({
        id: i,
        name: `章节_${i}`,
        course: {
            id: 1,
            name: '大学物理1',
        },
        creator: 'admin',
        desc: '描述',
    }));
}
for (let i = 0; i < 86; i++) {
    QuestionList.push(Mock.mock({
        id: Mock.Random.id(),
        name: '万有引力',
        type: '单选',
        course: {
            id: 0,
            name: '大学物理',
        },
        section: {
            id: 1,
            name: '基础物理',
        },
        subject: '大学物理',
        chapter: '基础物理',
        creator: 'admin',
        same: `组${i}`,
    }));
}
for (let i = 0; i < 20; i++) {
    const arr = _.slice(QuestionList, i * 3, i * 3 + 4);
    GroupList.push(Mock.mock({
        id: i,
        name: `题组_${i}`,
        course: {
            id: 1,
            name: '大学物理',
        },
        section: {
            id: 1,
            name: '第一章',
        },
        children: arr,
    }));
}
for (let i = 0; i < 86; i++) {
    TagList.push(Mock.mock({
        id: i,
        name: `标签${i}`,
        creator: 'admin',
        desc: '描述',
    }));
}
for (let i = 0; i < 11; i++) {
    CourseList.push(Mock.mock({
        id: i,
        name: `课程${i}`,
        subject: '物理',
        grade: '14级',
        creator: 'admin',
    }));
}
const QuestionFilter = [
    {
        title: '课程',
        field: 'course',
        children: [{
            value: '1',
            text: '大学物理'
        }, {
            value: '2',
            text: '高等数学'
        }, {
            value: '3',
            text: '大学英语'
        }]
    }, {
        title: '题型',
        field: 'questionType',
        children: [{
            value: 'radio',
            text: '单选'
        }, {
            value: 'multiple',
            text: '多选'
        }, {
            value: 'judgment',
            text: '判断'
        }, {
            value: 'fillIn',
            text: '填空'
        }, {
            value: 'short',
            text: '简答'
        }, {
            value: 'analysis',
            text: '分析'
        }, {
            value: 'discussion',
            text: '论述'
        }]
    }, {
        title: '类别',
        field: 'kind',
        children: [{
            value: 'exam',
            text: '考试'
        }, {
            value: 'quiz',
            text: '随堂测试'
        }, {
            value: 'exercises',
            text: '练习题'
        }]
    }, {
        title: '标签',
        field: 'tip',
        children: [{
            value: 'sendPoints',
            text: '送分题'
        }, {
            value: 'simple',
            text: '简单题'
        }, {
            value: 'easyProblem',
            text: '易错题'
        }]
    }
];
const SectionFilter = {
    "title": "章节",
    "field": "section",
    "children": [{
        "courseid": 1,
        "text": "刚体的转轴运动1111",
        "value": 1
    }, {
        "courseid": 2,
        "text": "刚体的转轴运动222",
        "value": 2
    }]
};
const SectionFilter1 = {
    "title": "章节",
    "field": "section",
    "children": [{
        "courseid": 1,
        "text": "hhhh",
        "value": 1
    }, {
        "courseid": 2,
        "text": "wwww",
        "value": 2
    }]
};
const SameFilter = [
    {
        title: '课程',
        field: 'course',
        children: [{
            value: 'physics',
            text: '大学物理'
        }, {
            value: 'mathematics',
            text: '高等数学'
        }, {
            value: 'english',
            text: '大学英语'
        }]
    }];

export {
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
    SameFilter,
    SectionFilter1,
};
