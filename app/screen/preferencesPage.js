import React from 'react';
import {Button, Text, View,} from 'react-native';

export default class preferencesPage extends React.Component {
    static navigationOptions = {
        title: 'Ustawienia',
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    Witaj w preferencjach
                </Text>
                <Button title={"Logowanie"} style={styles.button} onPress={() => navigate('loginForm')}/>
                <Button title={"Profil"} style={styles.button} onPress={() => navigate('profilePage')}/>
                <Button title={"Mapa"} style={styles.button} onPress={() => navigate('mainPage')}/>
            </View>
        );
    }

}