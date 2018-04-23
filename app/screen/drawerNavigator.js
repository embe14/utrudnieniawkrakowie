import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import profilePage from "./profilePage";
import preferencesPage from "./preferencesPage";
import incdentsListPage from "./incdentsListPage";
import mainPage from './mainPage';
import loginForm from "./loginForm";
import signup from "./signup";
import welcomePage from "./welcomePage";


const Navigation = StackNavigator({
        WelcomePage: {screen: welcomePage},
        loginForm: {screen: loginForm},
        preferences: {screen: preferencesPage},
        mainPage: {screen: mainPage},
        incidentsListPage: {screen: incdentsListPage},
        profilePage: {screen: profilePage},
        signup: {screen: signup},


    },
    {
        navigationOptions: {
            header: null,
        }
    }
    )
;


export default DrawerNavigator({
        Profile: {screen: profilePage},
        Preferences: {screen: preferencesPage},
        List: {screen: incdentsListPage},
        Maps: {screen: mainPage},
        Navigation: {screen: Navigation}

    },
    {
        drawerPosition: 'left',
        initialRouteName: 'Navigation',
        drawerBackgroundColor: '#1bb584',
        drawerWidth: 300
    })


