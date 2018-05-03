import instance  from './instance';
import qs from 'qs'

let base = 'aps/api';
//let base='/api';
//let base = 'http://127.0.0.1:8081/api';
//let base = 'http://121.43.164.178:8081/api';//公网线上调试api
//export const requestLogin = params => { return axios.post(`${base}/login/verify`,params).then(res => res.data); };
 export const requestLogin = params => { return instance.post(`${base}/login/verify`,  qs.stringify(params)).then(res => res.data); };

//用户信息
export const getMenuInfo = params => { return instance.get(`${base}/user/menu`,{params:params}).then(res => res.data); };

export const getUserInfo = params => { return instance.get(`${base}/user/info`, {params:params}).then(res => res.data); };

//修改用户密码
export const updatePassword = params => { return instance.post(`${base}/user/editpwd`, qs.stringify(params)).then(res => res.data); };

/*
* dashboard
* */

export const getDashboardInfo = params => { return instance.get(`${base}/index/getDashboardInfo`, { params: params } ).then(res => res.data); };
// 本周考试
export const getWeekExam = params => { return instance.post(`${base}/index/weekExam/list`, qs.stringify(params) ).then(res => res.data); };
// 学生成绩统计
export const getStudentSta = params => { return instance.post(`${base}/studentScore/chart`, qs.stringify(params) ).then(res => res.data); };

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
export const getGroupList = params => { return instance.get(`${base}/group/list`, { params: params } ).then(res => res.data); };

/*
* filter
* */
// question filter
export const getSameGroupList = params => { return instance.get(`${base}/same/list`, { params: params } ).then(res => res.data); };

// filter
export const getQuestionFilter = params => { return instance.get(`${base}/question/filter`, { params: params } ).then(res => res.data);};

export const copyQuestion = params => { return instance.post(`${base}/question/copy`, qs.stringify(params) ).then(res => res.data);};

export const deleteQuestion = params => { return instance.post(`${base}/question/delete`, qs.stringify(params) ).then(res => res.data);};

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
export const getStudentScoreList = params => { return instance.post(`${base}/score/list`, qs.stringify(params)  ).then(res => res.data); };

// filter
export const getStudentScoreFilter = params => { return instance.get(`${base}/score/filter`, { params: params } ).then(res => res.data); };

export const getStudentScoreDetailList = params => { return instance.get(`${base}/score/student/detailList`, { params: params } ).then(res => res.data); };

export const judgeOne= params => { return instance.post(`${base}/score/judgeOne`, qs.stringify(params)  ).then(res => res.data); };

export const judgeBatch= params => { return instance.post(`${base}/score/batchJudge`, qs.stringify(params)  ).then(res => res.data); };

export const getStudentTotalScoreList = params => { return instance.post(`${base}/score/total/list`, qs.stringify(params)  ).then(res => res.data); };
/*
*  后台 start
* */
export const getAddStuFilter = params => { return instance.get(`${base}/back/filter`, { params: params } ).then(res => res.data); };

export const saveOneStudent=params => { return instance.post(`${base}/back/addStudent`, qs.stringify(params) ).then(res => res.data); };

export const addTeacher=params => { return instance.post(`${base}/back/addTeacher`, qs.stringify(params) ).then(res => res.data); };

export const getGradeFilter=params => { return instance.post(`${base}/back/gradeFilter`, qs.stringify(params) ).then(res => res.data); };

export const getAddGroupFilter=params => { return instance.get(`${base}/back/addGroupFilter`, { params: params } ).then(res => res.data); };

export const addGroup=params => { return instance.post(`${base}/back/addGroup`, qs.stringify(params) ).then(res => res.data); };
// department
export const getDepartmentList = params => { return instance.post(`${base}/back/collegeInfo`, qs.stringify(params) ).then(res => res.data); };

export const getGroupInfo = params => { return instance.post(`${base}/back/groupInfo`, qs.stringify(params) ).then(res => res.data); };

export const ResetStuPwd = params => { return instance.post(`${base}/back/resetStuPwd`, qs.stringify(params) ).then(res => res.data); };

// class
export const getClassList = params => { return instance.get(`${base}/group/list`, params ).then(res => res.data); };
//选课
export const addTerm = params => { return instance.post(`${base}/back/addTerm`, qs.stringify(params) ).then(res => res.data); };

export const getAddTermCourseFilter = params => { return instance.get(`${base}/back/addTermCourse/filter`, { params: params } ).then(res => res.data); };

export const addTermCourse = params => { return instance.post(`${base}/back/addTermCourse`, qs.stringify(params) ).then(res => res.data); };

export const addCourseGroup = params => { return instance.post(`${base}/back/addCourseGroup`, qs.stringify(params) ).then(res => res.data); };
// role
//export const getRoleList = params => { return instance.get(`${base}/role/list`, params ).then(res => res.data); };
export const getRoleList = params => { return instance.get(`${base}/back/role/list`,  {params:params} ).then(res => res.data); };

export const editRole = params => { return instance.post(`${base}/back/role/edit`,  qs.stringify(params) ).then(res => res.data); };


// class
export const getClassObject = params => { return instance.get(`${base}/class/detail`, params ).then(res => res.data); };

// competence
export const getCompetenceList = params => { return instance.post(`${base}/back/menu`, qs.stringify(params) ).then(res => res.data); };

export const getMenuTree = params => { return instance.post(`${base}/back/menu/tree`, qs.stringify(params) ).then(res => res.data); };
// 选课
export const getSelectCourseList = params => { return instance.post(`${base}/back/selectCourse/list`,  qs.stringify(params) ).then(res => res.data); };
//考试班级列表
export const getCourseClassList = params => { return instance.post(`${base}/back/course/grouplist`, qs.stringify(params) ).then(res => res.data); };
//获取学习该课程但未参加考试的班级
export const getUnCourseClassList = params => { return instance.post(`${base}/back/course/ungrouplist`, qs.stringify(params) ).then(res => res.data); };
//添加考试班级
export const addCourseClass = params => { return instance.post(`${base}/back/course/addclass`, qs.stringify(params) ).then(res => res.data); };
//获取班级学生
export const getCourseStudentsByClassId = params => { return instance.post(`${base}/back/course/group/student`, qs.stringify(params) ).then(res => res.data); };
//保存班级考生
export const saveStudents = params => { return instance.post(`${base}/back/course/savestudents`, qs.stringify(params) ).then(res => res.data); };
//删除考试班级
export const delCourseClass = params => { return instance.post(`${base}/back/course/removeclass`, qs.stringify(params) ).then(res => res.data); };


export const getBackCourseFilter=params => { return instance.post(`${base}/back/courseFilter`, qs.stringify(params) ).then(res => res.data); };
// 选课页面弹出框所需下拉框数据
export const getBackstageSCouAddInfo=params => { return instance.post(`${base}/back/courseFilter`, qs.stringify(params) ).then(res => res.data); };



/*
* 统计 start
* */
// 院系考试统计列表
export const getStuStaFilter = params => { return instance.post(`${base}/stat/studentStatFilter`, qs.stringify(params) ).then(res => res.data); };

export const getStuByGroup = params => { return instance.get(`${base}/stat/group/students`, {params:params} ).then(res => res.data); };
export const getDepExamStaList = params => { return instance.get(`${base}/department/exam/statistics/list`, params ).then(res => res.data); };

// 院系成绩统计列表
export const getDepScoreStaList = params => { return instance.get(`${base}/department/score/statistics/list`, params ).then(res => res.data); };


// 学生统计

export const getStatisticsStudentInfo = params => { return instance.post(`${base}/stat/student/info`, qs.stringify(params) ).then(res => res.data); };

export const getStatisticsStudentFilter = params => { return instance.get(`${base}/stat/student/filter`, {params:params} ).then(res => res.data); };

export const getStatisticsStudentList = params => { return instance.get(`${base}/stat/student/list`,{params:params} ).then(res => res.data); };

export const getStatStuClassFilter = params => { return instance.get(`${base}/stat/student/class/filter`, {params:params} ).then(res => res.data); };

export const getStatStuStudentNoFilter = params => { return instance.get(`${base}/stat/student/class/filter`, {params:params} ).then(res => res.data); };


export const getStatisticsGroupInfo = params => { return instance.post(`${base}/stat/group/info`, qs.stringify(params) ).then(res => res.data); };

export const getStatisticsGroupFilter = params => { return instance.get(`${base}/stat/group/filter`, {params:params} ).then(res => res.data); };




//测验试卷
export const saveTestPaper = params => { return instance.post(`${base}/quiz/save`, qs.stringify(params)  ).then(res => res.data);};
export const getTestFilter = params => { return instance.get(`${base}/quiz/filter`, params ).then(res => res.data);};
export const getTestList = params => { return instance.post(`${base}/quiz/list`, qs.stringify(params)  ).then(res => res.data);};
//export const saveTest = params => { return instance.post(`${base}/quiz/save`, qs.stringify(params)  ).then(res => res.data);};
//测验详情
export const getTestDetail = params => { return instance.post(`${base}/quiz/detail`, qs.stringify(params)  ).then(res => res.data); };
//获取测验题目详情
export const getTestProblem = params => { return instance.post(`${base}/quiz/problem`, qs.stringify(params)  ).then(res => res.data); };

//获取测验题目列表
export const getTestProblemList = params => { return instance.post(`${base}/quiz/problem/list`, qs.stringify(params) ).then(res => res.data); };
//删除测验题目
export const removeTestProblem = params => { return instance.post(`${base}/quiz/problem/remove`, qs.stringify(params) ).then(res => res.data); };
//更新测验试卷状态
export const updateTestStatus = params => { return instance.post(`${base}/quiz/enablePaper`, qs.stringify(params) ).then(res => res.data); };

//获取测验题目过滤器
export const getTestProblemFilter = params => { return instance.post(`${base}/quiz/problem/filter`, qs.stringify(params) ).then(res => res.data); };
//获取测验试题列表
export const getQuizProblemList = params => { return instance.post(`${base}/quiz/problem/question`, qs.stringify(params) ).then(res => res.data); };
//测验添加试题
export const addTestProblem = params => { return instance.post(`${base}/quiz/problem/add`, qs.stringify(params) ).then(res => res.data); };

//添加测验
export const testSubmit = params => { return instance.post(`${base}/quiz/submit`, qs.stringify(params) ).then(res => res.data); };

//编辑测验
export const eidtTest = params => { return instance.post(`${base}/quiz/edit`, qs.stringify(params) ).then(res => res.data); };
//删除测验
export const removeTest = params => { return instance.post(`${base}/quiz/remove`, qs.stringify(params) ).then(res => res.data); };

export const copyTest = params => { return instance.post(`${base}/quiz/copy`, qs.stringify(params) ).then(res => res.data); };

//练习题 train
export const saveTrainPaper = params => { return instance.post(`${base}/train/save`, qs.stringify(params)  ).then(res => res.data);};

export const getTrainFilter = params => { return instance.get(`${base}/train/filter`, params ).then(res => res.data);};
export const getTrainList = params => { return instance.post(`${base}/train/list`, qs.stringify(params)  ).then(res => res.data);};

//编辑练习题
export const eidtTrain = params => { return instance.post(`${base}/train/edit`, qs.stringify(params) ).then(res => res.data); };
//删除练习题
export const removeTrain = params => { return instance.post(`${base}/train/remove`, qs.stringify(params) ).then(res => res.data); };

export const copyTrain = params => { return instance.post(`${base}/train/copy`, qs.stringify(params) ).then(res => res.data); };

//获取练习题题目列表
export const getTrainProblemList = params => { return instance.post(`${base}/train/problem/list`, qs.stringify(params) ).then(res => res.data); };
//删除练习题题目
export const removeTrainProblem = params => { return instance.post(`${base}/train/problem/remove`, qs.stringify(params) ).then(res => res.data); };
//更新练习题试卷状态
export const updateTrainStatus = params => { return instance.post(`${base}/train/enablePaper`, qs.stringify(params) ).then(res => res.data); };

//获取练习题题目过滤器
export const getTrainProblemFilter = params => { return instance.post(`${base}/train/problem/filter`, qs.stringify(params) ).then(res => res.data); };
//获取练习题试题列表
export const getTrainQuestionList = params => { return instance.post(`${base}/train/problem/question`, qs.stringify(params) ).then(res => res.data); };
//练习题添加试题
export const addTrainProblem = params => { return instance.post(`${base}/train/problem/add`, qs.stringify(params) ).then(res => res.data); };


/*
* 试卷 start
* */
export const getPaperFilter = params => { return instance.get(`${base}/paper/filter`, {params:params} ).then(res => res.data);};

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
export const updatePaperStatus = params => { return instance.post(`${base}/paper/enablePaper`, qs.stringify(params) ).then(res => res.data); };

//获取试卷题目过滤器
export const getProblemFilter = params => { return instance.post(`${base}/paper/problem/filter`, qs.stringify(params) ).then(res => res.data); };
//获取试卷试题列表
export const getProblemList = params => { return instance.post(`${base}/paper/problem/question`, qs.stringify(params) ).then(res => res.data); };
//试卷添加试题
export const addPaperProblem = params => { return instance.post(`${base}/paper/problem/add`, qs.stringify(params) ).then(res => res.data); };

//添加试卷
export const paperSubmit = params => { return instance.post(`${base}/paper/submit`, qs.stringify(params) ).then(res => res.data); };

//编辑试卷
export const eidtPaper = params => { return instance.post(`${base}/paper/edit`, qs.stringify(params) ).then(res => res.data); };
//删除试卷
export const removePaper = params => { return instance.post(`${base}/paper/remove`, qs.stringify(params) ).then(res => res.data); };
//复制试卷
export const copyPaper = params => { return instance.post(`${base}/paper/copy`, qs.stringify(params) ).then(res => res.data); };


/* 
*	监考 start
*/
// 监考过滤数据
export const getListenFilter = params => { return instance.post(`${base}/listen/filter`, qs.stringify(params) ).then(res => res.data);};
//监考列表
export const getListenList = params => { return instance.post(`${base}/listen/list`,  qs.stringify(params)).then(res => res.data);};
//被监考的考试人员filter
export const getListenDetailFilter = params => { return instance.post(`${base}/listen/detail/filter`, qs.stringify(params) ).then(res => res.data);};
//被监考的考试统计信息
export const getListentStatistics = params => { return instance.post(`${base}/listen/stat`,  qs.stringify(params) ).then(res => res.data);};
//被监考的考试人员列表
export const getListenDetailList = params => { return instance.post(`${base}/listen/detail/list`,  qs.stringify(params) ).then(res => res.data);};
//监考异常列表
export const getAbnormalList = params => { return instance.post(`${base}/listen/abnormal/list`,  qs.stringify(params) ).then(res => res.data);};
//更新异常列表
export const updateAbnormal = params => { return instance.post(`${base}/listen/abnormal/update`,  qs.stringify(params) ).then(res => res.data);};

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


//随堂测验 发布
export const getLessonQuizFilter = params => { return instance.post(`${base}/lesson/quiz/filter`, qs.stringify(params) ).then(res => res.data);};

export const getLessonQuizList = params => { return instance.post(`${base}/lesson/quiz/list`, qs.stringify(params) ).then(res => res.data);};

export const addLessonQuiz = params => { return instance.post(`${base}/lesson/quiz/add`, qs.stringify(params) ).then(res => res.data); };

export const updateLessonQuiz = params => { return instance.post(`${base}/lesson/quiz/update`, qs.stringify(params) ).then(res => res.data); };

//章节信息数组
export const getSections=params => { return instance.post(`${base}/chapter/sections`, qs.stringify(params) ).then(res => res.data); };


//练习题 发布
export const getLessonTrainFilter = params => { return instance.post(`${base}/lesson/train/filter`, qs.stringify(params) ).then(res => res.data);};

export const getLessonTrainList = params => { return instance.post(`${base}/lesson/train/list`, qs.stringify(params) ).then(res => res.data);};

export const addLessonTrain = params => { return instance.post(`${base}/lesson/train/add`, qs.stringify(params) ).then(res => res.data); };

export const updateLessonTrain = params => { return instance.post(`${base}/lesson/train/update`, qs.stringify(params) ).then(res => res.data); };

//预习资料
export const getAddDocFilter = params => { return instance.post(`${base}/lesson/train/addDocFilter`, qs.stringify(params) ).then(res => res.data); };

export const addDoc = params => { return instance.post(`${base}/lesson/train/addDoc`, qs.stringify(params) ).then(res => res.data); };

export const getDocFilter = params => { return instance.get(`${base}/lesson/train/docfilter`, {params:params} ).then(res => res.data);};

export const getDocList = params => { return instance.post(`${base}/lesson/train/doclist`, qs.stringify(params) ).then(res => res.data);};