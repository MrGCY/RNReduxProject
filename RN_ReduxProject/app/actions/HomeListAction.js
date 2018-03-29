/**
 * 作者：Mr.GCY on 2018/3/28 下午3:03
 * 邮箱：mail@gaochenyang.cc
 */
'use strict';
import * as types from '../actions/actionType';

//加载数据
export function fetchHomeList( index = 1 ) {
    return dispatch => {
        fetch('http://gank.io/api/data/福利/12/' + index)
            .then(response => response.json()).then(responseData => {
            dispatch(receiverHomeList(responseData));
        }).catch((error) => {
            console.log('error')
            dispatch({
                type : types.HOME_LIST_ERROR,
                error: error,
                loading : false,
                isRefreshing : false
            })
        }).done();
    }
}
//准备加载数据
export function readyLoadData() {
    return {
        type:types.HOME_LIST_DATA_LOADING,
        loading:false,
        dataSource:[],
        isRefreshing : true
    };
}
//成功获取数据
function receiverHomeList(data) {
    return {
        type: types.HOME_LIST_SUCCESS,
        loading: true,
        dataSource: data.results,
        isRefreshing : false
    }
}
