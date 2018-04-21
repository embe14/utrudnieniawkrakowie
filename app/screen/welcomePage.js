import React from 'react';
import {Image, StyleSheet, Text, View,} from 'react-native';


export default class welcomePage extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {navigate} = this.props.navigation;
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(() => {
            // Add your logic for the transition
            navigate('loginForm')
        }, 1500);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }

    render() {
        return (
            <View style={welcomeStyle.container}>
                <Text style={{fontSize: 25}}>
                    Witaj w aplikacji
                </Text>
                <Text style={welcomeStyle.appTitle}>TraffiKrK</Text>
                <Text style={welcomeStyle.small}>Aplikacja przygotowuje się do jazdy </Text>
                <Image source={require('./../assets/img/loader/car.gif')} style={welcomeStyle.image}/>
                {/*<ActivityIndicator size="large" color="#0000ff" />*/}
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