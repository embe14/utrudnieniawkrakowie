/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import {BackAndroid, StyleSheet} from 'react-native';


import Drawer from './app/screen/drawerNavigator';


type Props = {};
export default class App extends Component<Props> {

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            return true
        });
    }


    render() {
        return (
            <Drawer/>
        );
    }


}

styles = StyleSheet.create({
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
});
