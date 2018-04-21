import React from 'react';
import {Button, StyleSheet, Text, View,} from 'react-native';

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
            error: 'Email address jest wymagany.'
        },
        password: {
            label: 'Hasło',
            error: 'Hasło jest wymagane.'
        },
    },
    stylesheet: formStyles,
};

export default class loginForm extends React.Component{
    static navigationOptions = {
        title: 'Logowanie',
        drawerLockMode: 'locked-closed'
    };

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };

    handleLoginGoogle = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Form ref={c => this._form = c} type={User} options={options}/>
                <Button
                    styles={styles.transparentButton}
                    title="Zaloguj przez Google"
                    onPress={this.handleLoginGoogle}
                    color="#e47365"
                />
                <Button
                    title="Zaloguj!"
                    onPress={this.handleSubmit}
                />
                <Text onPress={() => navigate('profilePage')}>Przejdz dalej do profilu</Text>
                <Text onPress={() => navigate('mainPage')}>Przejdz dalej do glownego widoku</Text>
            </View>
        );
    }
    /*render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    Witaj w formularzu
                </Text>
                <Text onPress={() => navigate('profilePage')}>Przejdz dalej do profilu</Text>
                <Text onPress={() => navigate('mainPage')}>Przejdz dalej do glownego widoku</Text>
            </View>
        );
    }*/
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});