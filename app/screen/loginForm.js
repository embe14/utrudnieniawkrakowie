import React from 'react';
import {
    ActivityIndicator,
    Button,
    Dimensions,
    Image,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import firebase from 'react-native-firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import t from 'tcomb-form-native';


const db = firebase.firestore();

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

export default class loginForm extends React.Component {
    static navigationOptions = {
        title: 'Logowanie',
        drawerLockMode: 'locked-closed',
        drawerLabel: () => null,

    };

    handlefacebookLogin = async () => {
        try {
            this.setState({loading: true});
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw new Error('User cancelled request'); // Handle this however fits the flow of your app
            }

            console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

            // get the access token
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
            }

            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

            // login with credential
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);


            console.info(JSON.stringify(currentUser.user.toJSON()));
            const userData = currentUser.user.toJSON();
            //to do handle inclomplete data like nick etc and move to signup screen
            this.setState({loading: false});
            if (this.checkIfUserInfoExist(userData)) {
                this.props.navigation.navigate("Maps");
            }
            else this.props.navigation.navigate("fillData", {userData: userData})

        } catch (e) {
            console.error(e);
        }
    };

    handleLoginGoogle =
        async () => {
            try {
                // Add any configuration settings here:
                await GoogleSignin.configure();

                const data = await GoogleSignin.signIn();

                // create a new firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                // login with credential
                const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

                console.log(JSON.stringify(currentUser.user.toJSON()));
                //TO DO handle inclomplete data like nick etc and move to signup screen
                const userData = currentUser.user;
                console.log(userData._user.uid);
                if (this.checkIfUserInfoExist(userData)) {
                    this.props.navigation.navigate("Maps");
                }
                else this.props.navigation.navigate("fillData", {userData: userData})
            } catch (e) {
                console.error(e);
            }
        };
    handleSubmit = async () => {
        try {
            const value = this._form.getValue();
            const currentUser = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(value.email, value.password);
            const userData = currentUser.user;
            if (this.checkIfUserInfoExist(userData)) {
                this.props.navigation.navigate("Maps");
            }
            else this.props.navigation.navigate("fillData", {userData: userData})
        }
        catch (error) {
            ToastAndroid.show('Niepoprawne dane logowania. Spróbuj ponownie.', ToastAndroid.LONG);
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        }

    };
    value = {
        email: 'a@a.com',
        password: '123456'
    };


    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            loading: false,
        };
    }

    checkIfUserInfoExist(userData) {


        db.collection('users').doc(userData._user.uid).get().then((doc) => {
                if (!doc.exists) {
                    console.log("user info does not exist");
                    return false
                } else {
                    return true;
                }
            }
        )

            .catch(error => {
                console.log('Transaction failed: ', error);
                throw error;
            });
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Form ref={c => this._form = c} value={this.value} type={User} options={options}/>
                <View style={{flexDirection: 'row', width: Dimensions.get('window').width}}>
                    <GoogleSigninButton
                        style={{width: 48, height: 48}}
                        size={GoogleSigninButton.Size.Icon}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.handleLoginGoogle}/>
                    <TouchableOpacity style={styles.iconPosition} onPress={() => this.handlefacebookLogin()}>
                        <Image style={{width: 48, height: 48}}
                               source={require('./../assets/img/icon/login/fbLogo.png')}/>
                    </TouchableOpacity>
                    <Button
                        title="Zaloguj!"
                        onPress={this.handleSubmit}
                    />
                </View>

                <ActivityIndicator animating={this.state.loading} size="large" color="#0000ff"/>
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