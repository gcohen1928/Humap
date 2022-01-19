import React, { useContext } from 'react'
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import { MapScreen } from '../../features/map/screens/map.screen'
import { colors } from '../theme/colors'
import { AsyncDataContext } from '../../services/async-info/asyncdata.context'
import { AppIntroScreen } from '../../features/intro/screens/intro.screen'


const MapStack = createStackNavigator()

export const MapNavigator = ({ route, navigation }) => {
    const { pendingReview } = useContext(AsyncDataContext)
    return (

        <MapStack.Navigator
        screenOptions={{
            headerShown: false
          }}
        >
            <MapStack.Screen name = "Intro" component ={MapScreen} />
            <MapStack.Screen  name="MapStart" component={MapScreen} />
        </MapStack.Navigator>



    )
}