import React, {Component} from 'react';
import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default class welcomePage extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style = {{fontSize: 40}}>
                    Witaj w aplikacji
                </Text>
                <Button title={"Logowanie"} style={styles.button} onPress={() => navigate('loginForm')}/>
                <Button title={"Rejestracja"} style={styles.button} onPress={() => navigate('signup')}/>
                <Button title={"Profil"} style={styles.button} onPress={() => navigate('profilePage')}/>
                <Button title={"Mapa"} style={styles.button} onPress={() => navigate('mainPage')}/>
            </View>
        );
    }


}