import React from 'react';
import {Button, StyleSheet, Text, View,} from 'react-native';

import t from 'tcomb-form-native';
import firebase from 'react-native-firebase';

const Form = t.form.Form;

const User = t.struct({
    name: t.maybe(t.String),
    surname: t.maybe(t.String),
    nick: t.String
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
        name: {
            label: 'Imię',
        },
        surname: {
            label: 'Nazwisko',
        },
        nick: {
            error: 'Nick jest wymagany.'
        }
    },
    stylesheet: formStyles,
};

export default class fillUserDataPage extends React.Component {
    static navigationOptions = {
        title: 'Uzupełnij dane',
        drawerLockMode: 'locked-closed',
        drawerLabel: () => null
    };
    handleSubmit = () => {
        const {navigate} = this.props.navigation;
        const value = this._form.getValue();

        db = firebase.firestore();
        var user = this.state.user;
        var newDisplayName = value.name + " " + value.surname;
        if (user.displayName == null) {
            user.updateProfile({
                displayName: newDisplayName,
            }).then(function () {
                console.log("ok")
            }).catch(function (error) {
                console.log(error)
            });
        }
        user = firebase.auth().currentUser;
        db.collection("users").doc(user._user.uid).set({
            user: user._user,
            nick: value.nick,
            points: 0,
        })
            .then(function () {
                console.log("Document successfully written!");
                navigate("Maps");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                navigate("welcomePage");
            });
    };

    constructor() {
        super();
        this.state = {
            user: null,
            values: {
                name: "",
                surname: "",
                nick: ""
            }

        }
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        const userData = params ? params.userData : null;
        if (userData !== null) {
            this.setState({user: userData._user});
            if (userData._user.displayName !== null) {

                var nameArr = userData._user.displayName.split(" ", 2);
                console.log(nameArr);
                this.setState({
                    values: {
                        name: nameArr[0],
                        surname: nameArr[1]
                    }
                });
            }
        }


    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Form ref={c => this._form = c} value={this.state.values} type={User} options={options}/>
                <Button
                    title="Dodaj dane"
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