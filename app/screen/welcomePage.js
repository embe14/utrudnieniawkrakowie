import React from 'react';
import {AsyncStorage, Image, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase';

export default class welcomePage extends React.Component {
    static navigationOptions = {
        header: null,
        drawerLockMode: 'locked-closed',
        drawerLabel: () => null,

    };

    constructor(props) {
        super(props);
        this.state = {
            nav: null,
            user: {
                name: "",

            }
        }
    }

    async checkStorage() {
        try {
            const value = await AsyncStorage.getItem('@User:userName');
            if (value !== null) {
                //  this.setState({user.name : value});
                this.setState({nav: "Maps"});
            } else {
                this.setState({nav: "loginForm"});
            }
        } catch (error) {
            this.setState({nav: "loginForm"});
        }
    }

    checkFirebase() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                // this.setState({user.name :user._user.displayName});
                this.setState({nav: "Maps"});
            } else {
                this.setState({nav: "loginForm"});
            }
        });

    }

    async componentDidMount() {
        const {navigate} = this.props.navigation;
        await this.checkStorage();
        this.checkFirebase();
        this.timeoutHandle = setTimeout(() => {
            navigate(this.state.nav);
        }, 1500);
    }


    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }


    render() {
        return (
            <View style={welcomeStyle.container}>
                <Text style={welcomeStyle.small}>
                    Witaj {this.state.user.name} w aplikacji
                </Text>

                <Text style={welcomeStyle.appTitle}>TraffiKrK</Text>
                <Text style={welcomeStyle.small}>Aplikacja przygotowuje się do jazdy </Text>
                <Image source={require('./../assets/img/loader/car.gif')} style={welcomeStyle.image}/>


            </View>
        );

    }


}


welcomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1bb584',
    },
    appTitle: {
        fontSize: 40,
        textAlign: 'center',
        margin: 40,
        color: '#ffffff'
    },
    small: {
        textAlign: 'center',
        color: '#333333',
        marginTop: 5,
        fontSize: 20
    },

    image: {
        width: 200,
        height: 200,
        marginTop: 40,
        borderRadius: 50,
    }
});