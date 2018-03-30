/**
 * 作者：Mr.GCY on 2018/3/29 上午11:55
 * 邮箱：mail@gaochenyang.cc
 */
'use strict';
import React, {Component} from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
/**
 * 用于将UI和Reducer绑定
 */
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
//获取所有的方法集合对象
import * as actionCreaters from '../actions/HomeDetailAction';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
class HomeDetail extends Component {
    constructor(props){
        super(props);
    }
    componentWillUnmount() {
        //停止定时器 并清空
        const {actions} = this.props;
        actions.stopTime();
        actions.clearTime();
    }
    render() {
        //获取reducer
        const {homeDetailReducer} = this.props.state;
        return (
            <View style={{flex:1,marginTop:64}}>
                <View style={styles.topViewStyle}>
                    <Text style={{fontSize : 20,marginRight:5}}>计时器：</Text>
                    <Text style={{color:'red', fontSize : 20}}>{homeDetailReducer.timer}</Text>
                </View>
                <Image
                    style={{width : width , height : height - 200}}
                    source={{uri : this.props.route.params.rowData.url}}
                />
                <View style={styles.bottomViewStyle}>
                    {this.renderBottomBtn()}
                </View>
            </View>
        );
    }
    renderBottomBtn = ()=>{
        var titles = ['开始','暂停','清空'];
        var btns = [];
        for (var i = 0; i < titles.length ; i++ ){
            btns.push(
                <TouchableOpacity
                    ref = 'touchable'
                    key = {i}
                    style={styles.touchStyle}
                    onPress={this.clickBottomBtnEvent.bind(this,i)}
                >
                    <Text style={styles.btnTitleStyle}>
                        {titles[i]}
                    </Text>
                </TouchableOpacity>
            );
        }
        return btns;
    }
    //点击事件处理
    clickBottomBtnEvent = (i)=> {
        const {actions} = this.props;
        switch (i){
            case 0 : {
                //开始
                actions.startTime();
            }
            break;
            case 1 : {
                //暂停
                actions.stopTime();
            }
                break;
            case 2 : {
                //清空
                actions.clearTime();
            }
                break;
        }
    }
}
const styles = StyleSheet.create({
    topViewStyle : {
        flexDirection : 'row',
        justifyContent:'center',
        height : 50,
        alignItems: 'center',
    },
    bottomViewStyle : {
        marginTop : 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    btnTitleStyle : {
        padding : 10,
        fontSize:25,
        color:'white'
    },
    touchStyle : {
        borderRadius : 10,
        backgroundColor:'green'
    }
});


//这个方法是将state作为props可以在所传递的组件中通过this.props的到homeListReducer
function mapStateToProps(state) {
    return {
        state : state
    }
}
//绑定所有的action到this.props中，可以使用this.props.actions获取所有的action
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        actions : bindActionCreators(actionCreaters, dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeDetail);