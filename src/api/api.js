import axios from 'axios';
// import instance  from './instance';

let base = '';

// export default {
// 	//用户登录
//   userLogin(params){
//       return instance.post(`${base}/login`, params).then(res => res.data); 
//   },
//   // question
//   getQueList(params){
//       return instance.get(`${base}/question/list`, params).then(res => res.data); 
//   },
// }
// 替换到上面
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const testData = params => { return axios.get('http://api.github.com', { params: params }); };

// 测试api
export const testApi = params => { return axios.post(`${base}/test`, params ); };

/*
* 试题 start
* */
//
export const getQueList = params => { return axios.get(`${base}/question/list`, params ); };

// 科目列表
export const getSubjectList = params => { return axios.get(`${base}/subject/list`, params ); };

// tag
export const getTagList = params => { return axios.get(`${base}/tag/list`, params ); };

// course
export const getCourseList = params => { return axios.get(`${base}/course/list`, params ); };

// chapter
export const getChapterList = params => { return axios.get(`${base}/chapter/list`, params ); };

// department
export const getGroupList = params => { return axios.get(`${base}/group/list`, params ); };

// filter
export const getQuestionFilter = params => { return axios.get(`${base}/question/filter`, params ); };

/*
*  设置 start
* */
// log
export const getSetLogList = params => { return axios.get(`${base}/log/list`, params ); };

// alert
export const getSetAlertList = params => { return axios.get(`${base}/alert/list`, params ); };

// chart
export const getSetChartList = params => { return axios.get(`${base}/chart/list`, params ); };

/*
*  后台 start
* */
// department
export const getDepartmentList = params => { return axios.get(`${base}/department/list`, params ); };

// class
export const getClassList = params => { return axios.get(`${base}/class/list`, params ); };

// role
export const getRoleList = params => { return axios.get(`${base}/role/list`, params ); };

// class
export const getClassObject = params => { return axios.get(`${base}/class/detail`, params ); };

// competence
export const getCompetenceList = params => { return axios.get(`${base}/competence/list`, params ); };

// 选课
export const getSelectCourseList = params => { return axios.get(`${base}/selectCourse/list`, params ); };

/*
* 统计 start
* */
// 院系考试统计列表
export const getDepExamStaList = params => { return axios.get(`${base}/department/exam/statistics/list`, params ); };

// 院系成绩统计列表
export const getDepScoreStaList = params => { return axios.get(`${base}/department/score/statistics/list`, params ); };


/*
* 试卷 start
* */
export const getPaperList = params => { return axios.post(`${base}/paper/list`, params ); };
//试卷详情
export const getPaperDetail = params => { return axios.post(`${base}/paper/detail`, params ); };
//获取试卷题目详情
export const getPaperProblem = params => { return axios.post(`${base}/paper/problem`, params ); };
