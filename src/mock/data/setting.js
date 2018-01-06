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
const LogList = [{
    id: 1,
    account: 12345678,
    time: '2017/12/22 11:20:34',
    state: '手机端，登录成功',
},{
    id: 2,
    account: 21111111,
    time: '2017/12/23 11:20:34',
    state: '手机端，登录成功',
},{
    id: 3,
    account: 222222222,
    time: '2017/11/22 11:20:34',
    state: '电脑端，登录成功',
}];

const AlertList= [
    {
        id: 1,
        account: 2111101,
        name: '张三',
        examName: '大学物理',
        errorTime: '2017/11/22 11:20:34',
        desc: '多端登录',
    }
];

const ChartList= [
    {
        id: 1,
        database: 'student.sql',
        isOnline: '是',
    }
];

export {
    LogList,
    AlertList,
    ChartList,
};
