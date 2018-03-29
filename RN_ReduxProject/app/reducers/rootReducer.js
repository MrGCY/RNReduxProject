/**
 * 作者：Mr.GCY on 2018/3/28 下午2:29
 * 邮箱：mail@gaochenyang.cc
 */
'use strict';
//用来存放所有的reducer
import {combineReducers} from 'redux';
import homeListReducer from './HomeListReducer';
import homeDetailReducer from './HomeDetailReducer';
//整合所有的reducer
const rootReducer = combineReducers({
    homeListReducer,
    homeDetailReducer
});
export default rootReducer;
