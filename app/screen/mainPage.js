import React, {Component} from 'react';
import MapView from 'react-native-maps';

import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default class mainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
        this.getLocation();
    }

    static navigationOptions = {
        title: 'mainPage',
    };

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }


    render() {
        const {navigate} = this.props.navigation;
        const {region} = this.props;
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         initialRegion={{
                             latitude: 50.0697015,
                             longitude: 19.9521732,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                         showsUserLocation={true}
                         loadingEnabled={true}
                />
                <Text>
                    Witaj w glownym oknie z mapa.
                </Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <Button title={"Logowanie"} style={styles.button} onPress={() => navigate('loginForm')}/>
                <Button title={"Profil"} style={styles.button} onPress={() => navigate('profilePage')}/>
                <Button title={"Mapa"} style={styles.button} onPress={() => navigate('mainPage')}/>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 550,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
    },
    button: {
        backgroundColor: 'blue',

    }
});