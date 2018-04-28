import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text, View,} from 'react-native';

export default class incdentsListPage extends React.Component {
    static navigationOptions = {
        title: 'Lista zdarzeń',
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconPosition} onPress={() => navigate('DrawerOpen')}>
                    <Image style={styles.icon} source={require('./../assets/img/menu/hamburger.png')}/>
                </TouchableOpacity>

                <Text>
                    Witaj w aplikacji
                </Text>
                <Text onPress={() => navigate('loginForm')}>Przejdz dalej do logowania</Text>
                <Text onPress={() => navigate('profilePage')}>Przejdz dalej do profilu</Text>
                <Text onPress={() => navigate('mainPage')}>Przejdz dalej do glownego widoku</Text>
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
