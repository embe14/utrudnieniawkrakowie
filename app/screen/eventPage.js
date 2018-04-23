import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

let eventDurationEnum = t.enums({
    15: '15 m',
    30: '30 m',
    60: '1 h',
    180: '3 h',
    360: '6 h',
    1440: '24 h',
});

let eventTypeEnum = t.enums({
   1: 'Type #1',
   2: 'Type #2',
   3: 'Type #3',
   4: 'Type #4',
   5: 'Type #5',
});

const Event = t.struct({
    title: t.String,
    description: t.String,
    eventType: eventTypeEnum,
    eventDuration: eventDurationEnum
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
        title: {
            error: 'Tytuł jest wymagany.',
            label: 'Tytuł',
        },
        description: {
            error: 'Opis jest wymagany.',
            label: 'Opis',
        },
        eventType: {
            error: 'Typ zdarzenia jest wymagany.',
            label: 'Typ zdarzenia',
        },
        eventDuration: {
            error: 'Czas trwania jest wymagany.',
            label: 'Czas trwania',
        },
    },
    stylesheet: formStyles,
};

export default class signup extends React.Component {
    static navigationOptions = {
        title: 'Dodaj zdarzenia',
    };

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };

    handleImageUpload = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Form ref={c => this._form = c} type={Event} options={options}/>
                <View style={{width: '50%', marginBottom: 50}}>
                    <Button style={styles.buttonGoogleLogin}
                        title="Dodaj zdjęcie"
                        onPress={this.handleSubmit}
                    />
                </View>
                <View>
                <Button
                    title="Dodaj zdarzenie"
                    onPress={this.handleSubmit}
                />
                </View>
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