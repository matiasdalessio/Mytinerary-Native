import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Cities from '../screens/Cities'
import CityItineraries from '../screens/CityItineraries'
import Home from '../screens/Home'
import LogIn from '../screens/LogIn'
import SignUp from '../screens/SignUp'
import { MaterialIcons } from '@expo/vector-icons';


const stack = createStackNavigator()

export const HomeStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Home" component={Home} options={{
                headerRight: () => <MaterialIcons style={styles.burgerMenu} onPress={() => props.navigation.openDrawer()} name="menu" size={50} color="black" />,
                title:'',
                headerTransparent:true
            }}
            />
            
        </stack.Navigator>
    )
}

export const CitiesStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Cities" component={Cities} options={{
                 headerRight: () => <MaterialIcons style={styles.burgerMenu} onPress={() => props.navigation.openDrawer()} name="menu" size={50} color="black" />,
                title:'',
                headerTransparent:true
            }}/>
            <stack.Screen name="CityItineraries" component={CityItineraries} options={{
                 headerRight: () => <MaterialIcons style={styles.burgerMenu} onPress={() => props.navigation.openDrawer()} name="menu" size={50} color="black" />,
                title:'',
                headerTransparent:true
            }}/>            
        </stack.Navigator>
    )
}
export const LogInStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Log In" component={LogIn} options={{
                 headerRight: () => <MaterialIcons style={styles.burgerMenu} onPress={() => props.navigation.openDrawer()} name="menu" size={50} color="black" />,
                title:'',
                headerTransparent:true
            }}/>           
        </stack.Navigator>
    )
}
export const SignUpStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Sign Up" component={SignUp} options={{
                 headerRight: () => <MaterialIcons style={styles.burgerMenu} onPress={() => props.navigation.openDrawer()} name="menu" size={50} color="black" />,
                title:'',
                headerTransparent:true
            }}/>           
        </stack.Navigator>
    )    
}

const styles = StyleSheet.create({
    burgerMenu:{
        top:'20%',
        right:'20%',
        backgroundColor:'#e2ceb5',
        borderRadius:100
    }

})
