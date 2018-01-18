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
        subject: '大学物理',
        creator: 'admin',
        desc: '描述',
    }));
}
for (let i = 0; i < 86; i++) {
    QuestionList.push(Mock.mock({
        id: Mock.Random.id(),
        name: '万有引力',
        type: '单选',
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
        subject: '大学物理',
        chapter: '第一章',
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
for (let i = 0; i < 86; i++) {
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
        field: 'project',
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
    }, {
        title: '章节',
        field: 'chapter',
        children: [{
            value: 'physics',
            text: '基础物理'
        }, {
            value: 'mathOne',
            text: '高等数学上'
        }, {
            value: 'mathTwo',
            text: '高等数学下'
        }, {
            value: 'english',
            text: '英语口语'
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
};
