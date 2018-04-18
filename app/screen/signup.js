import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default class signup extends React.Component {
    static navigationOptions = {
        title: 'Stwórz konto',
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    Stworz konto - nick email haslo imie nazwisko
                </Text>
                <Text onPress={() => navigate('loginForm')}>Przejdz do logowania</Text>
            </View>
        );
    }

}