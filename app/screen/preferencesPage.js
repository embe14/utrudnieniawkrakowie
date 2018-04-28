import React from 'react';
import {Button, Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default class preferencesPage extends React.Component {
    static navigationOptions = {
        title: 'Ustawienia',
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.iconPosition} onPress={() => navigate('DrawerOpen')}>
                    <Image style={styles.icon} source={require('./../assets/img/menu/hamburger.png')}/>
                </TouchableOpacity>

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
const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#4f4e4a'
    },

    button: {
        backgroundColor: 'blue',

    },
    icon: {
        width: 30,
        height: 30,
        paddingTop: 10
    },

    iconPosition: {
        position: 'absolute',
        top: 30,
        left: 30,
        zIndex: 2
    },

    text: {
        fontSize: 18,
        color: '#235'
    },
})
