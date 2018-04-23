import React from 'react';
import {Button, StyleSheet, Text, View,} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    email: t.String,
    nick: t.String,
    name: t.String,
    surname: t.String,
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
            error: 'Email address jest wymagany.'
        },
        nick: {
            error: 'Nick jest wymagany.'
        },
        name: {
            error: 'Imię jest wymagane.',
            label: 'Imię',
        },
        surname: {
            error: 'Nazwisko jest wymagane.',
            label: 'Nazwisko',
        },
        password: {
            label: 'Hasło',
            error: 'Hasło jest wymagane.'
        },
    },
    stylesheet: formStyles,
};

export default class signup extends React.Component {
    static navigationOptions = {
        title: 'Stwórz konto',
        drawerLockMode: 'locked-closed',
        drawerLabel: () => null
    };

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Form ref={c => this._form = c} type={User} options={options}/>
                <Text>
                    Stworz konto - nick email haslo imie nazwisko
                </Text>
                <Button
                    title="Rejestracja"
                    onPress={this.handleSubmit}
                />
                <Text onPress={() => navigate('loginForm')}>Przejdz do logowania</Text>
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
    buttonGoogleLogin: {
        marginTop: 50,
        padding: 20,
        justifyContent: 'center',
        color: 'white',
        backgroundColor: 'black'
    },
});