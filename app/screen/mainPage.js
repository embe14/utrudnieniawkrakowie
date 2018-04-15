import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default class mainPage extends React.Component {
    static navigationOptions = {
        title: 'mainPage',
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    Witaj w glownym oknie z mapa
                </Text>
                <Text onPress={() => navigate('loginForm')}>Przejdz dalej do logowania</Text>
                <Text onPress={() => navigate('profilePage')}>Przejdz dalej do profilu</Text>
                <Text onPress={() => navigate('mainPage')}>Przejdz dalej do glownego widoku</Text>
            </View>
        );
    }

}