/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';


import incidentsListPage from './app/screen/incdentsListPage';
import loginForm from './app/screen/loginForm';
import mainPage from './app/screen/mainPage';
import preferencesPage from './app/screen/preferencesPage';
import profilePage from './app/screen/profilePage';
import welcomePage from './app/screen/welcomePage';
import signup from './app/screen/signup';
import event from './app/screen/eventPage';


import {StackNavigator} from 'react-navigation'

const Navigation = StackNavigator({
        WelcomePage: {screen: welcomePage},
        loginForm: {screen: loginForm},
        preferences: {screen: preferencesPage},
        mainPage: {screen: mainPage},
        incidentsListPage: {screen: incidentsListPage},
        profilePage: {screen: profilePage},
        signup:{screen: signup},
        event:{screen: event},

    },
    {
        navigationOptions: {
            headerMode: 'screen'
        }
    }
    )
;

type Props = {};
export default class App extends Component<Props> {
    render() {
        return <Navigation/>;
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
