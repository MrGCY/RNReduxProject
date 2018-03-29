/**
 * 作者：Mr.GCY on 2018/3/28 下午2:25
 * 邮箱：mail@gaochenyang.cc
 */
'use strict';
import {createStore, applyMiddleware} from 'redux';

import thunkMiddleware from 'redux-thunk';
//导入所有Reducer集
import rootReducer from '../reducers/rootReducer';

//异步 Middleware其实是对action抽象出来的，是对action的进一步封装，用来完成异步API调用等其他重要的事情
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
    //将Store和reducer绑定
    //是因为store中保存所有的state，但是不能对state进行修改，reducer可以返回最新的state，所以需要将Store和reducer进行绑定
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}
