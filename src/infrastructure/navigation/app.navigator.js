import React , {useState, useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from "../theme/colors";
import { LocationSearchContextProvider } from "../../services/location-search/location-search.context";
import { ReportNavigator } from "./report.navigator";
import { AsyncDataContext} from "../../services/async-info/asyncdata.context";
import { MapNavigator } from "./map.navigator";
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tab = createBottomTabNavigator()

const TAB_ICON = {
    Map: 'map-outline',
    Report: 'hand-left-outline'
}

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name]
    return {
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: colors.brand.secondary,
        headerShown: false,
    }
}


export const AppNavigator = () => {
    const {newUser, setNewUser} =  useContext(AsyncDataContext)
    _renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image style = {styles.image} source={item.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }

    _onDone = async () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        setNewUser(false)
    }

    if (!newUser) {
        return (
                <LocationSearchContextProvider>
                    <NavigationContainer>
                        <Tab.Navigator screenOptions={createScreenOptions} >
                            <Tab.Screen name="Map" component={MapNavigator} />
                            <Tab.Screen name="Report" component={ReportNavigator} />
                        </Tab.Navigator>
                    </NavigationContainer>
                </LocationSearchContextProvider> )
        
    } else {
        return <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone} />;
    }


    return (
        <AsyncDataContextProvider>
            <LocationSearchContextProvider>
                <NavigationContainer>
                    <Tab.Navigator screenOptions={createScreenOptions} >
                        <Tab.Screen name="Map" component={MapNavigator} />
                        <Tab.Screen name="Report" component={ReportNavigator} />
                    </Tab.Navigator>
                </NavigationContainer>
            </LocationSearchContextProvider>
        </AsyncDataContextProvider>

    )
}


const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ff8e50',
    },
    image: {
      width: 260,
      height: 260,
      marginVertical: 32,
    },
    text: {
        fontSize: 18,
        padding: 20,
        marginTop: 40,
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
        marginBottom: 40, 
      color: 'white',
      textAlign: 'center',
    },
  });
  
  
  
  
  const slides = [
    {
      key: 'one',
      title: 'Welcome to Map\'d!',
      image: require('../../../assets/intro/AppHands.png'),
      text: '25 million people are trafficked worldwide, yet only 16,658 have been identified\n\nBut what even is human trafficking?\n\nHuman trafficking is defined as the use of force, fraud, or coercion to compel a person into commercial sex acts or labor against their will.',
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'What we built!',
      image: require('../../../assets/intro/AppRocket.png'),
      text: 'We built an app that displays the hotspots for human trafficking around the globe\n\n\nWe hope this app can show citizens where to avoid and law enforcement where to target',
      backgroundColor: '#59b2ab',
    },
    {
      key: 'three',
      title: 'Explore',
      image: require('../../../assets/intro/AppLocation.png'),
      text: 'Take a look at the map where you\'ll see where we\'re getting reports of human trafficking\n\nYou can search for a location or roam freely around the map\n\nTo find out more details about a report, press \"Show Markers\" near the search bar and click on the marker',
      backgroundColor: '#59b2ab',
    },
    {
      key: 'four',
      title: 'Report',
      image: require('../../../assets/intro/AppCar.png'),
      text: 'If you witness or are a victim of human trafficking, report it in the second tab\n\nAnswer as many or as few questions as you want\n\nHowever, you must report a location, but it can be as general or specific as you\'d like',
      backgroundColor: '#59b2ab',
    },
    {
      key: 'five',
      title: 'Privacy',
      image: require('../../../assets/intro/AppSecurity.png'),
      text: 'Map\'d does not collect any data, other than the data that you provide us whehn you file a report.\n\nReports are always anonymous and secure and we only report them to the National Hotline if you want us to',
      backgroundColor: '#59b2ab',
    }
  ];
  