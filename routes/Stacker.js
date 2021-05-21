import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import { Text } from 'react-native'
import Cities from '../screens/Cities'
import CityItineraries from '../screens/CityItineraries'
import Home from '../screens/Home'


const stack = createStackNavigator()

export const HomeStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="Home" component={Home} options={{
                headerRight: () => <Text onPress={() => {}}>MENU</Text>,
            }}/>
        </stack.Navigator>
    )
}

export const CitiesStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="Cities" component={Cities} />
            <stack.Screen name="Itineraries" component={CityItineraries} />            
        </stack.Navigator>
    )
}
