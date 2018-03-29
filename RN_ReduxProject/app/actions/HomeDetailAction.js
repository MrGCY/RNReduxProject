/**
 * 作者：Mr.GCY on 2018/3/29 下午2:27
 * 邮箱：mail@gaochenyang.cc
 */
'use strict';
import * as types from '../actions/actionType';

var count = 0;
var timer = undefined;
//开始
export const startTime = ()=> {
    return dispatch => {
        timer = setInterval(()=>{
            dispatch({
                type : types.TIMER_START,
                second : count++
            })
        },1000);
    };
}
//暂停
export const stopTime = ()=> {
    return dispatch => {
        timer && clearInterval(timer);
        dispatch({
            type : types.TIMER_STOP,
            second : count
        })
    };
}
//清空
export const clearTime = ()=> {
    count = 0;
    return {
        type : types.TIMER_CLEAR,
        second : 0
    };
}
