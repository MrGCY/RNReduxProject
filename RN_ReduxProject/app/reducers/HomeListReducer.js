/**
 * 作者：Mr.GCY on 2018/3/28 下午2:58
 * 邮箱：mail@gaochenyang.cc
 */

'use strict';
//这两种方式都可以获取action类型
//1.
 import * as types from '../actions/actionType';
//2.
// import {HOME_LIST} from "../actions/actionType";

const initialState = {
    loading: false,
    dataSource: [],
    error : null,
    isRefreshing : false
};
export default function homeListReducer(state = initialState, action) {

    switch (action.type) {
        case types.HOME_LIST_SUCCESS:
            //数据加载成功
            return Object.assign({}, state, {
                ...action
            });
            break;
        case types.HOME_LIST_DATA_LOADING:
            //数据加载中
            return Object.assign({}, state, {
                loading: action.loading,
                dataSource: action.dataSource,
                error : action.error,
                isRefreshing : action.isRefreshing
            });
            break;
        case types.HOME_LIST_ERROR:
            //数据加载错误
            return Object.assign({}, state, {
                ...action
            });
            break;
        default:
            return state;
    }
}
