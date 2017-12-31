import Mock from 'mockjs';

const TypeList = [];
const UsageList = [];
const DepartmentList = [];
const ChapterList = [];
const SubjectList = [];

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

export {
    TypeList,
    UsageList,
    SubjectList,
    ChapterList,
    DepartmentList,
};
