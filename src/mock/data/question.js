import Mock from 'mockjs';

const TypeList = [];
const UsageList = [];
const DepartmentList = [];
const ChapterList = [];
const SubjectList = [];
const QuestionList = [];

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
    }));
}
for (let i = 0; i < 3; i++) {
    DepartmentList.push(Mock.mock({
        id: i,
        name: `题组_${i}`,
    }));
}
for (let i = 0; i < 86; i++) {
    QuestionList.push(Mock.mock({
        id: Mock.Random.guid(),
        name: '万有引力',
        type: '单选',
        subject: '大学物理',
        chapter: '基础物理',
        creator: 'admin',
        same: '组01',
    }));
}

export {
    TypeList,
    UsageList,
    SubjectList,
    ChapterList,
    DepartmentList,
    QuestionList,
};
