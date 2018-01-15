import Mock from 'mockjs';
import _ from 'lodash';

const DepExamStaList = [];
const DepScoreStaList = [];
for (let i = 0; i < 20; i++) {
    DepExamStaList.push(Mock.mock({
        id: i,
        course: '大学物理',
        examName: '大学物理上第一月考',
        class: `${i}班`,
        highest: 98,
        lowest: 47,
        average: 72,
        passNum: 40,
        passPercent: '80%',
    }));
}


for (let i = 0; i < 3; i++) {
    DepScoreStaList.push(Mock.mock({
        id: i,
        course: '大学物理',
        team: '第一学期',
        class: `${i + 1}班`,
        highest: 98,
        lowest: 47,
        average: 72,
        passNum: 40,
        passPercent: '80%',
    }));
}

export {
    DepExamStaList,
    DepScoreStaList,
};
