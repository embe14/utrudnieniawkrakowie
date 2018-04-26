import React from 'react';
import {Button, StyleSheet, Text, View,} from 'react-native';
import firebase from 'react-native-firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    email: t.String,
    password: t.String,
});

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
            color: 'orange',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        // the style applied when a validation error occours
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    },
};


const options = {
    fields: {
        email: {
            error: 'Email address jest wymagany.',
            keyboardType: 'email-address',
        },
        password: {
            label: 'Hasło',
            error: 'Hasło jest wymagane.',
            secureTextEntry: true,
        },
    },
    stylesheet: formStyles,
};

export default class loginForm extends React.Component{
    static navigationOptions = {
        title: 'Logowanie',
        drawerLockMode: 'locked-closed',
        drawerLabel: () => null
    };

    handleLoginGoogle =
        async () => {
            try {
                // Add any configuration settings here:
                await GoogleSignin.configure();

                const data = await GoogleSignin.signIn();

                // create a new firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
                // login with credential
                const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

                console.info(JSON.stringify(currentUser.user.toJSON()));
            } catch (e) {
                return null;
            }
        };


    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };

    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
        };
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Form ref={c => this._form = c} type={User} options={options}/>
                <View>
                    <GoogleSigninButton
                        style={{width: 48, height: 48}}
                        size={GoogleSigninButton.Size.Icon}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.handleLoginGoogle}/>
                </View>
                <Button
                    title="Zaloguj!"
                    onPress={this.handleSubmit}
                />
                <Button title="Załóż konto" onPress={() => navigate('signup')}/>
                <Button title="Przejdz dalej do glownego widoku" onPress={() => navigate('Maps')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});