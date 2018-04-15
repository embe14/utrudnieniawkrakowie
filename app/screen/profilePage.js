import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default class profilePage extends React.Component {
    static navigationOptions = {
        title: 'profilePage',
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    Witaj w profilu
                </Text>
                <Text onPress={() => navigate('loginForm')}>Przejdz dalej do logowania</Text>
                <Text onPress={() => navigate('profilePage')}>Przejdz dalej do profilu</Text>
                <Text onPress={() => navigate('mainPage')}>Przejdz dalej do glownego widoku</Text>
            </View>
        );
    }

}