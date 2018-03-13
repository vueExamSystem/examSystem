import axios from 'axios';
import instance  from './instance';
import qs from 'qs'

// let base = '';
//let base = 'http://localhost:8081/api';
let base = 'http://121.43.164.178:8081/api';//公网线上调试api
//export const requestLogin = params => { return axios.get(`${base}/login/verify`,params).then(res => res.data); };
 export const requestLogin = params => { return axios.post(`${base}/login/verify`,  qs.stringify(params)).then(res => res.data); };

//用户信息
export const getUserInfo = params => { return instance.post(`${base}/user/info`, qs.stringify(params)).then(res => res.data); };

/*
* dashboard
* */
// 本周考试
export const getWeekExam = params => { return instance.get(`${base}/weekExam/list`, params ).then(res => res.data); };
// 学生成绩统计
export const getStudentSta = params => { return instance.get(`${base}/studentScore/chart`, params ).then(res => res.data); };

/*
* 试题 question start
* */
//
//添加试题的条件请求
export const getQueAddFilter = params => { return instance.get(`${base}/question/questionAddFilter`,  { params: params } ).then(res => res.data); };
//根据课程id 章节id 题型id获取相似题组
export const getgroupList = params => { return instance.get(`${base}/question/groupList`,  { params: params } ).then(res => res.data); };
export const getQueList = params => { return instance.post(`${base}/question/list`, qs.stringify(params) ).then(res => res.data); };

export const getQuestionDetail = params => { return instance.post(`${base}/question/detail`,  qs.stringify(params) ).then(res => res.data); };

export const saveQue = params => { return instance.post(`${base}/question/save`, qs.stringify(params)).then(res => res.data); };
// export const saveQue = params => { return instance.get(`${base}/question/save`, qs.stringify(params) ); };

// 科目列表
export const getSubjectList = params => { return instance.get(`${base}/subject/list`, params ).then(res => res.data); };

// tag
export const getTagList = params => {return instance.get(`${base}/category/list`, { params: params } ).then(res => res.data); };


export const saveTag = params => { return instance.post(`${base}/category/save`, qs.stringify(params) ); };


// course
export const getCourseList = params => { 
	return instance.get(`${base}/course/list`, { params: params } ).then(res => res.data); };
//加载课程列表
export const getCoursesMap = params => { 
	return instance.get(`${base}/course/map`, { params: params } ).then(res => res.data); };
export const editCourse = params => {
	return instance.get(`${base}/course/edit`, params ).then(res => res.data); };
//course filter
export const getCourseFilter = params => { 
    return instance.get(`${base}/course/filter`, { params: params } ).then(res => res.data); };

// chapter

export const getChapterList = params => { return instance.post(`${base}/chapter/list`, qs.stringify(params)).then(res => res.data); };


export const getChapterAll = params => { return instance.post(`${base}/chapter/all`, qs.stringify(params)).then(res => res.data); };


export const editChapter = params => {
    return instance.post(`${base}/chapter/edit`, qs.stringify(params) ).then(res => res.data); };
    
export const addChapter = params => {
    return instance.post(`${base}/chapter/add`, qs.stringify(params) ).then(res => res.data); };
    
// section
export const getSectionFilter = params => { return instance.post(`${base}/chapter/filter`, qs.stringify(params) ).then(res => res.data); };


// department
export const getSameList = params => { return instance.post(`${base}/same/list`, qs.stringify(params) ).then(res => res.data); };

// department
export const getGroupList = params => { return instance.get(`${base}/group/list`, params ).then(res => res.data); };

/*
* filter
* */
// question filter
export const getSameGroupList = params => { return instance.get(`${base}/same/list`, params ).then(res => res.data); };

// filter
export const getQuestionFilter = params => { return instance.get(`${base}/question/filter`, params ).then(res => res.data);};
// same filter
export const getSameFilter = params => { return instance.get(`${base}/same/filter`, { params: params } ).then(res => res.data);};

//remove 相似题组中试题
export const removeSameGroup= params => { return instance.get(`${base}/same/removeSameGroup`, { params: params } ).then(res => res.data);};

//remove 相似题组
export const removeSameQuestion= params => { return instance.get(`${base}/same/removeQuestion`, { params: params } ).then(res => res.data);};

//获取试题树
export const getSameTreeList = params => { return instance.post(`${base}/same/tree`, qs.stringify(params) ).then(res => res.data); };

//获取指定试题
export const selectQuestions = params => { return instance.post(`${base}/same/selectQuestions`, qs.stringify(params) ).then(res => res.data); };

//向相似题组添加试题
export const addQuestionToGroup = params => { return instance.post(`${base}/same/addQuestion`, qs.stringify(params) ).then(res => res.data); };

//添加相似题组
export const addSame = params => { return instance.post(`${base}/same/add`, qs.stringify(params) ).then(res => res.data); };

// 删除，添加，编辑 demo api
export const addDemo = params => {
    return instance.get(`${base}/add`, params ).then(res => res.data); };
export const delDemo = params => {
    return instance.get(`${base}/del`, params ).then(res => res.data); };

/*
*  预习 start
* */

export const getExampleFilter = params => { return instance.get(`${base}/example/filter`, params ).then(res => res.data);};

export const getExampleList = params => { return instance.get(`${base}/example/list`, params ).then(res => res.data);};

export const getExampleDetailFilter = params => { return instance.get(`${base}/example/detail/filter`, params ).then(res => res.data);};

export const getExampleDetailList = params => { return instance.get(`${base}/example/detail/list`, params ).then(res => res.data);};

export const getExampleAddInfo = params => { return instance.get(`${base}/example/add/info`, params ).then(res => res.data);};

export const getDocAddInfo = params => { return instance.get(`${base}/doc/add/info`, params ).then(res => res.data);};

export const getDocFilter = params => { return instance.get(`${base}/doc/filter`, params ).then(res => res.data);};

export const getDocList = params => { return instance.get(`${base}/doc/list`, params ).then(res => res.data);};

/*
*  测验 start
* */
export const getClassTestFilter = params => { return instance.get(`${base}/classTest/filter`, params ).then(res => res.data);};

export const getClassTestList = params => { return instance.get(`${base}/classTest/list`, params ).then(res => res.data);};

export const getClassTestDetailFilter = params => { return instance.get(`${base}/classTest/detail/filter`, params ).then(res => res.data);};

export const getClassTestDetailList = params => { return instance.get(`${base}/classTest/detail/list`, params ).then(res => res.data);};


/*
*  设置 start
* */
// log
export const getSetLogList = params => { return instance.get(`${base}/log/list`, params ).then(res => res.data); };

// alert
export const getSetAlertList = params => { return instance.get(`${base}/alert/list`, params ).then(res => res.data); };

// chart
export const getSetChartList = params => { return instance.get(`${base}/chart/list`, params ).then(res => res.data); };

/*
*  成绩 start
* */
// list
export const getStudentScoreList = params => { return instance.get(`${base}/student/list`, params ).then(res => res.data); };

// filter
export const getStudentScoreFilter = params => { return instance.get(`${base}/student/filter`, params ).then(res => res.data); };


/*
*  后台 start
* */
// department
export const getDepartmentList = params => { return instance.get(`${base}/college/list`, params ).then(res => res.data); };
 
// class
export const getClassList = params => { return instance.get(`${base}/group/list`, params ).then(res => res.data); };

// role
export const getRoleList = params => { return instance.get(`${base}/role/list`, params ).then(res => res.data); };

// class
export const getClassObject = params => { return instance.get(`${base}/class/detail`, params ).then(res => res.data); };

// competence
export const getCompetenceList = params => { return instance.get(`${base}/competence/list`, params ).then(res => res.data); };

// 选课
export const getSelectCourseList = params => { return instance.get(`${base}/selectCourse/list`, params ).then(res => res.data); };

export const saveStudent=params => { return instance.post(`${base}/user/addStudent`, qs.stringify(params) ).then(res => res.data); };

/*
* 统计 start
* */
// 院系考试统计列表
export const getDepExamStaList = params => { return instance.get(`${base}/department/exam/statistics/list`, params ).then(res => res.data); };

// 院系成绩统计列表
export const getDepScoreStaList = params => { return instance.get(`${base}/department/score/statistics/list`, params ).then(res => res.data); };


/*
* 试卷 start
* */
export const getPaperFilter = params => { return instance.get(`${base}/paper/filter`, params ).then(res => res.data);};

export const getPaperList = params => { return instance.post(`${base}/paper/list`, qs.stringify(params)  ).then(res => res.data);};

export const savePaper = params => { return instance.post(`${base}/paper/save`, qs.stringify(params)  ).then(res => res.data);};

//试卷详情
export const getPaperDetail = params => { return instance.post(`${base}/paper/detail`, qs.stringify(params)  ).then(res => res.data); };
//获取试卷题目详情
export const getPaperProblem = params => { return instance.post(`${base}/paper/problem`, qs.stringify(params)  ).then(res => res.data); };

//获取试卷题目列表
export const getPaperProblemList = params => { return instance.post(`${base}/paper/problem/list`, qs.stringify(params) ).then(res => res.data); };
//删除试卷题目
export const removePaperProblem = params => { return instance.post(`${base}/paper/problem/remove`, qs.stringify(params) ).then(res => res.data); };
//更新试卷状态
export const updatePaperStatus = params => { return instance.post(`${base}/paper/update/status`, params ).then(res => res.data); };

//获取试卷题目过滤器
export const getProblemFilter = params => { return instance.post(`${base}/paper/problem/filter`, qs.stringify(params) ).then(res => res.data); };
//获取试卷试题列表
export const getProblemList = params => { return instance.post(`${base}/paper/problem/question`, qs.stringify(params) ).then(res => res.data); };
//试卷添加试题
export const addPaperProblem = params => { return instance.post(`${base}/paper/problem/add`, qs.stringify(params) ).then(res => res.data); };

//添加试卷
export const paperSubmit = params => { return instance.post(`${base}/paper/submit`, params ).then(res => res.data); };

//编辑试卷
export const eidtPaper = params => { return instance.post(`${base}/paper/edit`, params ).then(res => res.data); };
//删除试卷
export const removePaper = params => { return instance.post(`${base}/paper/remove`, params ).then(res => res.data); };


/* 
*	监考 start
*/
// 监考过滤数据
export const getListenFilter = params => { return instance.get(`${base}/listen/filter`, params ).then(res => res.data);};
//监考列表
export const getListenList = params => { return instance.post(`${base}/listen/list`, params ).then(res => res.data);};
//被监考的考试人员filter
export const getListenDetailFilter = params => { return instance.get(`${base}/listen/detail/filter`, params ).then(res => res.data);};
//被监考的考试统计信息
export const getListentStatistics = params => { return instance.post(`${base}/listen/statistics`, params ).then(res => res.data);};
//被监考的考试人员列表
export const getListenDetailList = params => { return instance.post(`${base}/listen/detail/list`, params ).then(res => res.data);};
//监考异常列表
export const getAbnormalList = params => { return instance.post(`${base}/listen/abnormal/list`, params ).then(res => res.data);};
//更新异常列表
export const updateAbnormal = params => { return instance.post(`${base}/listen/abnormal/update`, params ).then(res => res.data);};

/*
* 考试 start
* */
//考试过滤器
export const getExamFilter = params => { return instance.post(`${base}/exam/filter`, qs.stringify(params) ).then(res => res.data);};
//考试列表
export const getExamList = params => { return instance.post(`${base}/exam/list`, qs.stringify(params) ).then(res => res.data);};
// 编辑考试
export const updateExam = params => { return instance.post(`${base}/exam/update`, qs.stringify(params) ).then(res => res.data); };
// 发布考试
export const addExam = params => { return instance.post(`${base}/exam/add`, qs.stringify(params) ).then(res => res.data); };
//考试班级列表
export const getExamClassList = params => { return instance.post(`${base}/exam/grouplist`, qs.stringify(params) ).then(res => res.data); };
//获取学习该课程但未参加考试的班级
export const getUnExamClassList = params => { return instance.post(`${base}/exam/ungrouplist`, qs.stringify(params) ).then(res => res.data); };
//添加考试班级
export const addExamClass = params => { return instance.post(`${base}/exam/addclass`, qs.stringify(params) ).then(res => res.data); };
//获取班级学生
export const getStudentsByClassId = params => { return instance.post(`${base}/exam/group/student`, qs.stringify(params) ).then(res => res.data); };
//保存班级考生
export const saveExammer = params => { return instance.post(`${base}/exam/savestudents`, qs.stringify(params) ).then(res => res.data); };
//删除考试班级
export const delExamClass = params => { return instance.post(`${base}/exam/removeclass`, qs.stringify(params) ).then(res => res.data); };
//发布考试
export const publishExam = params => { return instance.post(`${base}/exam/publish`, qs.stringify(params) ).then(res => res.data); };
   