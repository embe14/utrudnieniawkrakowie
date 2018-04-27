import React from 'react';
import {Alert, Button, Text, View,} from 'react-native';
import firebase from 'react-native-firebase';

export default class profilePage extends React.Component {
    static navigationOptions = {
        title: 'Profil',
    };

    logout = () => {
        const {navigate} = this.props.navigation;
        firebase.auth().signOut().then(function () {
            console.log("logout");
            navigate("WelcomePage");

        }, function (error) {
            console.log("error")
        });
    }

    showAlert = () => {
        Alert.alert(
            'Wylogowac?',
            'Czy jestes pewny ?',
            [
                {text: 'Nie', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Tak', onPress: () => this.logout()},
            ],
            {cancelable: false}
        );
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    Witaj w profilu
                </Text>
                <Button title="Wyloguj" onPress={this.showAlert}/>
            </View>
        );
    }

}