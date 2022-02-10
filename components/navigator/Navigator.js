import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

function MyTabBar( { state, descriptors, navigation } ) {

    return (
        <View style={{ backgroundColor: '#000' }}>
            <View style={styles.tabConatiner}>
                {state.routes.map( ( route, index ) => {
                    const { options } = descriptors[route.key];
                    // console.log( options )
                    const { tabBarIcon } = options
                    console.log( tabBarIcon )
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit( {
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        } );

                        if ( !isFocused && !event.defaultPrevented ) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate( { name: route.name, merge: true } );
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit( {
                            type: 'tabLongPress',
                            target: route.key,
                        } );
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Ionicons name={isFocused ? 'home' : 'home-outline'} size={25} color={isFocused ? '#D8D107' : '#fff'} />
                            <Text style={{ color: isFocused ? '#D8D107' : '#fff' }}>
                                Home
                            </Text>
                        </TouchableOpacity>
                    );
                } )}
            </View>
        </View>
    );
}

const Navigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                style={{ backgroundColor: '#000' }}
                tabBar={props => <MyTabBar {...props} />}
                screenOptions={{
                    headerShown: false
                }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Home1" component={Home} />
                <Tab.Screen name="Home2" component={Home} />
                <Tab.Screen name="Home3" component={Home} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default Navigator;

const styles = StyleSheet.create( {
    tabConatiner: {
        flexDirection: 'row',
        height: 85,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        elevation: 5,
        backgroundColor: '#313134'
    }
} )