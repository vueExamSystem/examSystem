import axios from 'axios';
import u from '../common/js/util';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users} from './data/user';
import {
    TypeList,
    UsageList,
    SubjectList,
    ChapterList,
    DepartmentList,
    QuestionList,
    CourseList,
    TagList,
} from './data/question';
import {
    PaperList,
    PaperDetail,
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

let _Users = Users;

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);

        //登录
        mock.onPost('/login').reply(config => {
            let {username, password} = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    let hasUser = LoginUsers.some(u => {
                        if (u.username === username && u.password === password) {
                            user = JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });

                    if (hasUser) {
                        resolve([200, {code: 200, msg: '请求成功', data:user}]);
                    } else {
                        resolve([200, {code: 500, msg: '账号或密码错误'}]);
                    }
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


        /** 以下question **/

        //获取que列表
        mock.onGet('/question/list').reply(config => {
            return u.getMockList(config, QuestionList);
        });

        //获取tag列表
        mock.onGet('/tag/list').reply(config => {
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

        //获取题组列表
        mock.onGet(`/department/list`).reply(config => {
            return u.getMockList(config, DepartmentList);
        });

        //获取course列表
        mock.onGet(`/course/list`).reply(config => {
            return u.getMockList(config, CourseList);
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

        /** 以下paper **/
        //获取试卷列表
        mock.onPost(`/paper/list`).reply(config => {
            return u.getMockList(config, PaperList);
        });
        //获取试卷详情
        mock.onPost(`/paper/detail`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, PaperDetail]);
                }, 1000);
            });
        });
        //获取试卷题目详情
        mock.onPost(`/paper/problem`).reply(config => {
            var params = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(params.isNecessary){
                        if(params.type === 'radio'){
                            resolve([200, radioProblem]);
                        }else if(params.type === 'check'){
                            resolve([200, checkProblem]);
                        }else if(params.type === 'judge'){
                            resolve([200, judgeProblem]);
                        }
                    }else{
                        resolve([200, optionProblem]);
                    }
                }, 1000);
            });
        });
    }
};