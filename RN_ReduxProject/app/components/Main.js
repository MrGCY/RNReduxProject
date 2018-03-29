/**
 * 作者：Mr.GCY on 2018/3/28 下午2:42
 * 邮箱：mail@gaochenyang.cc
 */

'use strict';
import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {
    NavigatorIOS
} from 'react-native';
//入口组件
import Home from "./Home";

import configureStore from '../store/configureStore';
//配置store
const store = configureStore();

export default class Main extends Component {
    render() {
        return (
            <Provider store = {store}>
                <NavigatorIOS
                    style={{flex: 1}}
                    initialRoute={{title: '首页', component: Home}}
                />
            </Provider>
        );
    }
}
