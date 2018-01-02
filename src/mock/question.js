import axios from 'axios';
import u from '../common/js/util';
import MockAdapter from 'axios-mock-adapter';

import {Users} from './data/user';
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

const _type = 'question';
export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);

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

    }
};