/**
 * 作者：Mr.GCY on 2018/3/28 下午3:03
 * 邮箱：mail@gaochenyang.cc
 */
'use strict';
import * as types from '../actions/actionType';
//保留上一次的也码数
var lastPageNum = 1;
var dataArr = [];
//加载数据
export function fetchHomeList( index = 1 ) {
    return dispatch => {
        console.log('-------------------------'+index);
        fetch('http://gank.io/api/data/福利/12/' + index)
            .then(response => response.json()).then(responseData => {
            dispatch(receiverHomeList(responseData,index));
        }).catch((error) => {
            console.log('error');
            dispatch({
                type : types.HOME_LIST_ERROR,
                error: error,
                loading : false,
                isRefreshing : false
            });
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
function receiverHomeList(data,currentPageNum) {
    if (currentPageNum <= lastPageNum){
        //是刷新操作
        //移除数组所有元素
        for (var i = 0 ; i < dataArr.length ; i++){
            dataArr.splice();
        }
        dataArr = data.results;
        lastPageNum = 1;
    }else {
        //加载操作
        dataArr = dataArr.concat(data.results);
        lastPageNum = currentPageNum;
    }
    return {
        type: types.HOME_LIST_SUCCESS,
        loading: true,
        dataSource: dataArr,
        isRefreshing : false
    }
}
