/**
 * 作者：Mr.GCY on 2018/3/29 下午2:28
 * 邮箱：mail@gaochenyang.cc
 */
'use strict';
import * as types from '../actions/actionType';

export default function homeDetailReducer(state, action) {
    state = state || {
        type : 'INIT_STATE',
        second : 0,
        timer : '00:00:00'
    }
    switch (action.type) {
        case types.TIMER_START:{
            var timer = countTime(action.second);
            return Object.assign({}, state, {
                ...action,
                timer
            });
        }
            break;
        case types.TIMER_STOP:{
            var timer = countTime(action.second);
            return Object.assign({}, state, {
                ...action,
                timer
            });
        }
            break;
        case types.TIMER_CLEAR:{
            var timer = countTime(action.second);
            return Object.assign({}, state, {
                ...action,
                timer
            });
        }
            break;
        default:
            return state;
    }
}
const countTime = (count) => {
    var hour = Math.floor(count / 3600);
    var minute = Math.floor(count % 3600 / 60);
    var second = Math.floor(count % 3600 % 60);
    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;
    return '' + hour + ':' + minute + ':' + second;
}