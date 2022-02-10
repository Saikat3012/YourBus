import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import avatar from '../../images/1.jpg'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { TextInput } from 'react-native-paper';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';


const Home = () => {
    const data = {
        name: 'Dherraj'
    }
    const [selectedSection, setSelectedSection] = useState( 'out-station' )
    const [trip, setTrip] = useState( 'round-trip' )
    const [form, setform] = useState( '' )
    const [to, setTo] = useState( '' )
    const [returns, setReturns] = useState( '' );

    const [latitudePress, setLatitude] = useState( 15.230810 );
    const [longitudePress, setLongitude] = useState( 88.724541 );
    const [address, setAddress] = useState( 'Krishnagar' )

    const KEY = 'pk.8d009e0ad9814d811d4be2156f1b1eff'

    const getAddress = async ( lat, lon ) => {
        try {
            if ( lon ) {
                console.log( "lat: " + lat + "   lon: " + lon )
                const api = `https://us1.locationiq.com/v1/reverse.php?key=${ KEY }&lat=${ lat }&lon=${ lon }&format=json`
                // console.log("Hi" + api)
                const { data } = await Axios.get( api );
                console.log( data )
                setAddress( data.display_name )
                // console.log("add: " + address)
                // setLatDone(true)
            }
        } catch ( error ) {
            // console.log("eee: " + error)
        }
    }


    const fetchLocation = async () => { // will fetch current location
        await Geolocation.getCurrentPosition( async ( info ) => {
            // console.log(info)
            setLatitude( info.coords.latitude )
            setLongitude( info.coords.longitude )
            getAddress( info.coords.latitude, info.coords.longitude )
        } );

    }
    fetchLocation()
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerConatiner}>
                <TouchableOpacity>
                    <Ionicons name='menu' size={40} color={'#fff'} />
                </TouchableOpacity>
                <Image source={avatar} style={styles.avatar} />
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.row}>
                    <Text style={styles.headingText}>Welcome </Text>
                    <Text style={[styles.headingText, { color: '#D8D107' }]}>{`${ data.name },`}</Text>
                </View>


                <View style={styles.topSelectionContainer}>
                    <TouchableOpacity style={styles.selectionButtonConatiner} onPress={() => setSelectedSection( 'out-station' )}>
                        <MaterialCommunityIcons name='bag-carry-on-check' color={selectedSection === 'out-station' ? '#D8D107' : '#fff'} size={40} />
                        <Text style={{ color: selectedSection === 'out-station' ? '#D8D107' : '#fff' }}>OutStation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectionButtonConatiner} onPress={() => setSelectedSection( 'local-ride' )}>
                        <FontAwesome5 name='map-marked-alt' color={selectedSection === 'local-ride' ? '#D8D107' : '#fff'} size={40} />
                        <Text style={{ color: selectedSection === 'local-ride' ? '#D8D107' : '#fff' }}>Local Ride</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectionButtonConatiner} onPress={() => setSelectedSection( 'airport-ride' )}>
                        <MaterialCommunityIcons name='airport' color={selectedSection === 'airport-ride' ? '#D8D107' : '#fff'} size={40} />
                        <Text style={{ color: selectedSection === 'airport-ride' ? '#D8D107' : '#fff' }}>Airport Ride</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.optionButtonContainer} onPress={() => alert( 'Trip Ideas' )}>
                        <Foundation name='lightbulb' size={25} color="#fff" />
                        <Text style={styles.h2}>Trip Ideas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButtonContainer} onPress={() => alert( 'Trip Ideas' )}>
                        <Entypo name='flow-tree' size={25} color="#fff" />
                        <Text style={styles.h2}>Refer & Earn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButtonContainer} onPress={() => alert( 'Trip Ideas' )}>
                        <AntDesign name='qrcode' size={25} color="#fff" />
                        <Text style={styles.h2}>UPI pay</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.devider} />
                <View style={styles.tripSelectionContainer}>
                    <TouchableOpacity style={[styles.tripButton, { backgroundColor: trip != 'round-trip' ? '#000' : '#fff' }]} onPress={() => setTrip( 'round-trip' )}>
                        <Text style={{ fontSize: 18, color: trip == 'round-trip' ? '#000' : '#fff' }}>Round Trip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tripButton, { backgroundColor: trip == 'round-trip' ? '#000' : '#fff' }]} onPress={() => setTrip( 'one-way-trip' )}>
                        <Text style={{ fontSize: 18, color: trip == 'one-way-trip' ? '#000' : '#fff' }}>One Way Trip</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tripDetailsContainer}>
                    <View style={styles.tripInputContainer}>
                        <Text style={[styles.h2, { fontSize: 15 }]}>From </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="ios-locate" size={10} color="#fff" />
                            <TextInput style={styles.input}
                                value={form}
                                onChangeText={( text ) => setform( text )}
                                placeholder="Start typing city : Ex Kolkata" />
                        </View>
                    </View>
                    <View style={styles.tripInputContainer}>
                        <Text style={[styles.h2, { fontSize: 15 }]}>To    </Text>
                        <View style={styles.inputContainer}>
                            <Entypo name="location" size={10} color="#fff" />
                            <TextInput style={styles.input}
                                value={to}
                                onChangeText={( text ) => setTo( text )}
                                placeholder="Start typing city : Ex Kolkata" />
                        </View>
                    </View>
                    <View style={styles.tripInputContainer}>
                        <Text style={[styles.h2, { fontSize: 15 }, trip == 'round-trip' && { color: '#9595A1' }]}>Return</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="ios-locate" size={10} color="#fff" />
                            <TextInput style={styles.input}
                                disabled={trip == 'round-trip'}
                                value={returns}
                                onChangeText={( text ) => setReturns( text )}
                                placeholder="Start typing city : Ex Kolkata" />
                        </View>
                    </View>
                </View>

                <View style={{ height: 250, width: '100%', alignSelf: 'center', marginTop: 25 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: Number( latitudePress ),
                            longitude: Number( longitudePress ),
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: Number( latitudePress ),
                                longitude: Number( longitudePress )
                            }}
                            title={address}
                            description="You are here"
                        />
                    </MapView>
                </View>


                <View style={styles.tripDetailsContainer}>
                    <View style={styles.tripInputContainer}>
                        <Text style={[styles.h2, { fontSize: 15 }]}>Trip Start </Text>
                        <View style={styles.inputContainer1}>
                            <Ionicons name="calendar" size={10} color="#fff" />
                            <TextInput style={styles.input}
                                value={form}
                                onChangeText={( text ) => setform( text )}
                                placeholder="27-01-2022" />
                        </View>
                    </View>
                    <View style={styles.tripInputContainer}>
                        <Text style={[styles.h2, { fontSize: 15 }, trip == 'round-trip' && { color: '#9595A1' }]}>Return     </Text>
                        <View style={styles.inputContainer1}>
                            <Ionicons name="calendar" size={10} color={trip == 'round-trip' ? "#9595A1" : "#fff"} />
                            <TextInput style={styles.input}
                                disabled={trip == 'round-trip'}
                                value={returns}
                                onChangeText={( text ) => setReturns( text )}
                                placeholder="27-01-2022" />
                        </View>
                    </View>
                    <View style={styles.tripInputContainer}>
                        <Text style={[styles.h2, { fontSize: 15 }]}>Pickup At </Text>
                        <View style={styles.inputContainer1}>
                            <Entypo name="clock" size={10} color="#fff" />
                            <TextInput style={styles.input}
                                value={to}
                                onChangeText={( text ) => setTo( text )}
                                placeholder="09:40 AM" />
                        </View>
                    </View>
                    <View style={styles.tripInputContainer}>
                        <Text style={[styles.h2, { fontSize: 15 }]}>No of Seats</Text>
                        <View style={styles.inputContainer1}>
                            <MaterialCommunityIcons name="bag-personal" size={20} color="#fff" />
                            <TextInput style={[styles.input,{width:'95%'}]}
                                value={to}
                                onChangeText={( text ) => setTo( text )}
                                placeholder="5" />
                        </View>
                    </View>

                    <TouchableOpacity style={{
                        width: '95%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#D8D107',
                        alignSelf: 'center',
                        borderRadius: 6,
                        paddingVertical: 4,
                        marginTop: 5
                    }} onPress={()=>alert('Select Operator')}>
                        <Text style={{
                            color: '#000',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Select Operator</Text>
                    </TouchableOpacity>

                </View>






            </View>

        </ScrollView>
    )
}
export default Home;

const styles = StyleSheet.create( {
    container: {
        backgroundColor: '#000',
        flex: 1
    },
    mainContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 50
    },
    row: {
        flexDirection: 'row'
    },
    headerConatiner: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        paddingBottom: 8
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    headingText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    topSelectionContainer: {
        backgroundColor: '#313134',
        flexDirection: 'row',
        borderRadius: 12,
        marginTop: 25
    },
    selectionButtonConatiner: {
        width: "33%",
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsContainer: {
        flexDirection: 'row',
        backgroundColor: '#313134',
        marginTop: 30
    },
    optionButtonContainer: {
        flexDirection: 'row',
        height: 50,
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRightWidth: 0.25,
        borderColor: '#fff'
    },
    h2: {
        color: '#fff',
        fontSize: 11,
        marginLeft: 5
    },
    tripSelectionContainer: {
        flexDirection: 'row',
        width: '75%',
        borderColor: '#D8D107',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: -110,
        alignSelf: 'center',
        backgroundColor: '#000'
    },
    tripButton: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: '50%'
    },
    devider: {
        width: '93%',
        borderColor: '#D8D107',
        borderWidth: 1,
        height: 60,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 80
    },
    tripDetailsContainer: {
        width: '85%',
        marginTop: 15,
        alignSelf: 'center',
        borderWidth: 0.3,
        borderColor: '#fff',
        backgroundColor: '#1B1B1C',
        borderRadius: 5,
        paddingVertical: 10
    },
    tripInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    input: {
        width: '100%',
        borderBottomColor: '#D8D107',
        borderBottomWidth: 0.8,
        height: 35,
        fontSize: 12,
        backgroundColor: '#1B1B1C'
    },
    inputContainer: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    inputContainer1: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000'
    },
} )