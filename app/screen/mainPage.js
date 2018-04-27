import React from 'react';
import MapView from 'react-native-maps';


import {Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const imageURL = require('./../assets/img/icon/50x50/accident.png');

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

                },
                {
                    latlng: {
                        latitude: 50.056659,
                        longitude: 19.945301,
                    },
                    title: "Wypadek",
                    description: "kolizja osobowki i przegubowca z 501. Autobus w połowie blokuje pas w kierunku Armii Krajowej.",
                    image: imageURL
                }

            ],
        };
        this.getLocation();
    }


    getLocation() {

        setInterval(() => {
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
        }, 500);

    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconPosition} onPress={() => navigate('DrawerOpen')}>
                    <Image style={styles.icon} source={require('./../assets/img/menu/hamburger.png')}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eventButtonPosition} onPress={() => navigate('event')}>
                    <Button title='Dodaj' color="#047024" onPress={() => navigate('event')}/>
                </TouchableOpacity>
                <Text>{this.state.longitude},{this.state.latitude}</Text>
                <MapView style={styles.map}
                         initialRegion={{
                             latitude: 50.0697015,
                             longitude: 19.9521732,
                             latitudeDelta: 0.03,
                             longitudeDelta: 0.0421,
                         }}
                         zoomEnabled
                         showsUserLocation={true}
                         followsUserLocation
                         loadingEnabled
                         showsTraffic={true}
                         customMapStyle={require('./../assets/config/style/mapStyle.json')}
                         showsMyLocationButton={true}
                         zoomControlEnabled
                         cacheEnabled={this.state.cache}
                         loadingIndicatorColor="#666666"
                         loadingBackgroundColor="#eeeeee"
                >
                    <View style={{height: 500, width: 500}}>
                        {this.state.markers.map(marker => (
                            <MapView.Marker
                                coordinate={marker.latlng}
                                title={marker.title}
                                description={marker.description}
                                image={marker.image}
                            >
                            </MapView.Marker>))
                        }
                    </View>
                    <MapView.Marker
                        coordinate={{
                            latitude: 50.1684783,
                            longitude: 19.9549616
                        }}
                        title="Wypadek"
                        description="kolizja osobowki i przegubowca z 501. Autobus w połowie blokuje pas w kierunku Armii Krajowej."
                    >

                    </MapView.Marker>

                </MapView>
                <FlatList style={styles.list}
                          data={[
                              {key: 'Wypadek1'},
                              {key: 'Wypadek2'},
                              {key: 'Wypadek3'},
                              {key: 'Wypadek4'},
                              {key: 'Wypadek5'},
                              {key: 'Wypadek6'},
                              {key: 'Wypadek7'},
                              {key: 'Wypadek8'},
                          ]}
                          renderItem={({item}) => {
                              return (
                                  <View style={styles.item}>
                                      <View>
                                          <Text style={styles.text}>{item.key}</Text>
                                          <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                              laboris nisi ut aliquip ex ea commodo consequat.</Text>
                                      </View>
                                  </View>
                              )
                          }
                          }
                />

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#4f4e4a'
    },
    map: {

        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width,
    },
    button: {
        backgroundColor: 'blue',

    },
    icon: {
        width: 30,
        height: 30,
        paddingTop: 10
    },

    iconPosition: {
        position: 'absolute',
        top: 30,
        left: 30,
        zIndex: 2
    },
    list: {
        marginTop: -30,
        shadowOpacity: 0.5,
        shadowRadius: 15,
    },
    item: {

        height: 44,
        backgroundColor: '#71f793',
        height: 100,
        width: Dimensions.get('window').width - 10,
        marginBottom: 20,


        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 10,
    },
    text: {
        fontSize: 18,
        color: '#235'
    },
    description: {
        fontSize: 12,

    }
    ,
    eventButtonPosition: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
    },
})


