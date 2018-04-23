import React from 'react';
import MapView from 'react-native-maps';


import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export default class mainPage extends React.Component {
    static navigationOptions = {
        drawerLabel: null,
        title: 'Mapa'
    };

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            markers: [
                {
                    latlng: {
                        latitude: 50.068064,
                        longitude: 19.952468,
                    },
                    title: 'UEK',
                    description: 'wykolejenie zajęć',
                    image: require('./../assets/img/icon/accident.png')
                },
                {
                    latlng: {
                        latitude: 50.056659,
                        longitude: 19.945301,
                    },
                    title: "Wypadek",
                    description: "kolizja osobowki i przegubowca z 501. Autobus w połowie blokuje pas w kierunku Armii Krajowej.",
                    image: require('./../assets/img/icon/accident.png')
                }

            ],
        };
        this.getLocation();
    }

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

        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.iconPosition} onPress={() => navigate('DrawerOpen')}>
                    <Image style={styles.icon} source={require('./../assets/img/menu/hamburger.png')}/>
                </TouchableOpacity>

                <MapView style={styles.map}
                         initialRegion={{
                             latitude: 50.0697015,
                             longitude: 19.9521732,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                         showsUserLocation={true}
                         loadingEnabled={true}
                         showsTraffic={true}
                         customMapStyle={require('./../assets/config/style/mapStyle.json')}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        >
                            <Image
                                source={marker.image}
                                style={{width: 50, height: 50}}
                            />
                        </MapView.Marker>
                    ))}
                    <MapView.Marker
                        coordinate={{
                            latitude: 50.1684783,
                            longitude: 19.9549616
                        }}
                        title="Wypadek"
                        description="kolizja osobowki i przegubowca z 501. Autobus w połowie blokuje pas w kierunku Armii Krajowej."
                    >
                        <MapView.Callout>
                            <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
                                <Text>Klik</Text>
                            </TouchableOpacity>
                        </MapView.Callout>
                    </MapView.Marker>


                </MapView>


            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#68ed89'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height / 1.5,
        width: Dimensions.get('window').width,
    },
    button: {
        backgroundColor: 'blue',

    },
    icon: {
        width: 30,
        height: 30,
    },

    iconPosition: {
        position: 'absolute',
        top: 30,
        left: 30,
        zIndex: 2
    }
});


