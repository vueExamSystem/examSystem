import axios from 'axios';

let base = '';
const question = 'question';

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
export const getQueList = params => { return axios.get(`${base}/${question}/list`, { params: params }); };

// 试题类型列表
export const getQueTypeList = params => { return axios.get(`${base}/${question}/type/list`, params ); };

// 试题用途列表
export const getQueUsageList = params => { return axios.get(`${base}/${question}/usage/list`, params ); };

// 科目列表
export const getQueSubjectList = params => { return axios.get(`${base}/${question}/subject/list`, params ); };

// 章节列表
export const getQueChapterList = params => { return axios.get(`${base}/${question}/chapter/list`, params ); };

// 题组
export const getQueDepartmentList = params => { return axios.get(`${base}/${question}/department/list`, params ); };