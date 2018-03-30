/**
 * 作者：Mr.GCY on 2018/3/28 下午2:46
 * 邮箱：mail@gaochenyang.cc
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
/**
 * 用于将UI和Reducer绑定
 */
import {connect} from 'react-redux';

import {fetchHomeList,readyLoadData} from '../actions/HomeListAction';


import HomeDetail from './HomeDetail';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

// import homeListReducer from '../reducers/HomeListReducer';

class Home extends Component{
    constructor(props){
        super(props);
        // 初始状态
        this.state = {
            dataArr : [],
        };
        this.dataSource = new ListView.DataSource({rowHasChanged : (r1,r2) => r1 !== r2})
        this.pageNum = 1
    }
    componentWillMount() {
        console.log('---------------componentWillMount');
        //发送 action事件
        this.props.dispatch(fetchHomeList(this.pageNum));
    }
    //刷新数据
    refreshData = ()=> {
        //准备刷新数据
        this.props.dispatch(readyLoadData());
        this.pageNum = 1;
        setTimeout(()=> {
            //获取数据
            this.props.dispatch(fetchHomeList(this.pageNum));
        },1500);
    }
    //加载更多数据
    loadData = ()=> {
        this.pageNum += 1;
        console.log('加载更多数据---------------' + this.pageNum);
        //获取数据
        this.props.dispatch(fetchHomeList(this.pageNum));
    }
    render() {
        const {homeListReducer} = this.props;
        if(!homeListReducer.loading){
            var message = '正在加载中...';
            if (homeListReducer.error){
                message = '数据加载错误' + homeListReducer.error;
            }
            //正在加载中
            return (
                <View style={styles.container}>
                    <Text>{message}</Text>
                </View>
            );
        }else{
            //已经加载完了
            return (
                <ListView
                    style={{marginTop:64,backgroundColor : '#e8e8e8'}}
                    dataSource={this.dataSource.cloneWithRows(homeListReducer.dataSource)}
                    renderRow={this.renderRowCell}
                    refreshControl = {
                        //刷新控件
                        <RefreshControl
                            refreshing = {homeListReducer.isRefreshing}
                            onRefresh = {this.refreshData}
                            tintColor= '#ff0000'
                            title= '正在加载...'
                            titleColor= '#00ff00'
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor= '#ffff00'
                        />
                    }
                    onEndReached = {this.loadData}
                    onEndReachedThreshold = {100}
                >
                </ListView>
            );
        }
    }
    clickCellItem = (rowData)=>{
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                component: HomeDetail,
                title : '详情',
                params: {
                    rowData
                }
            })
        }
    }
    //渲染cell
    /*
  createdAt: '2018-03-12T08:40:10.360Z',
  desc: '3-12',
  publishedAt: '2018-03-12T08:44:50.326Z',
  source: 'chrome',
  type: '福利',
  url: 'https://ws1.sinaimg.cn/large/610dc034ly1fp9qm6nv50j20u00miacg.jpg',
  used: true,
  who: 'daimajia' }
  */
    renderRowCell = (rowData) => {
        return(
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>this.clickCellItem(rowData)}
            >
                <View style={styles.contentViewStyle}>
                    <View style={{justifyContent : 'center',height : 40}}>
                        <Text style={styles.titleStyle}>
                            {rowData.who}
                        </Text>
                    </View>
                    <Image
                        source={{uri: rowData.url}}
                        style={styles.imageStyle}
                    />
                    <View style={styles.contentBottomViewStyle}>
                        <Text style={{color:'white',marginLeft:10}}>
                            {rowData.type}
                        </Text>
                        <Text style={{color:'white',marginRight:10}}>
                            {rowData.desc}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    imageStyle:{
        width : width,
        height:height / 3,
    },
    contentViewStyle : {
        alignItems:'center',
        marginBottom:10,
        backgroundColor : 'white'
    },
    titleStyle : {
        fontSize:20,
    },
    contentBottomViewStyle : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor:'rgba(0,0,0,0.5)',
        height : 40,
        width : width,
        position:'absolute',
        bottom:0,
    }
});

// 这个方法是将state作为props可以在所传递的组件中通过this.props的到homeListReducer
function mapStateToProps(state) {
    const {homeListReducer} = state;
    return {
        homeListReducer
    }
    // return {
    //     state : state
    // }
}
//是为了让Home组件通过this.props得到homeListReducer
export default connect(mapStateToProps)(Home);