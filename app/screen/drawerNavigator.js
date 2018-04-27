import React from 'react';
import {DrawerItems, DrawerNavigator} from 'react-navigation';
import profilePage from "./profilePage";
import preferencesPage from "./preferencesPage";
import incdentsListPage from "./incdentsListPage";
import mainPage from './mainPage';
import loginForm from "./loginForm";
import signup from "./signup";
import welcomePage from "./welcomePage";
import eventPage from "./eventPage";
import {Alert, ScrollView, Text} from "react-native";


const customContentComponent = (props) => (
    <ScrollView>
        <DrawerItems {...props}/>
    </ScrollView>
);



export default DrawerNavigator({
        Maps: {screen: mainPage},
        List: {screen: incdentsListPage},
        Profile: {screen: profilePage},
        Preferences: {screen: preferencesPage},
        WelcomePage: {screen: welcomePage},
        loginForm: {screen: loginForm},
        signup: {screen: signup},
        event: {screen: eventPage}


    },
    {
        contentComponent: customContentComponent,
        drawerPosition: 'left',
        initialRouteName: 'WelcomePage',
        drawerBackgroundColor: '#1bb584',
        drawerWidth: 200,

    })


