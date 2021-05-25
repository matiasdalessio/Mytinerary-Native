import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Cities from '../screens/Cities'
import CityItineraries from '../screens/CityItineraries'
import Home from '../screens/Home'
import LogIn from '../screens/LogIn'
import SignUp from '../screens/SignUp'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'


const stack = createStackNavigator()


export const HomeStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Home" component={Home} options={{
                headerRight: () =>  <TouchableOpacity style={styles.burgerMenu} onPress={() => props.navigation.openDrawer()}>
                                        <MaterialIcons  name="menu" size={40} color="black" />
                                    </TouchableOpacity>,
                title:'',
                headerTransparent:true,
            }}
            />
            
        </stack.Navigator>
    )
}

export const CitiesStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Cities" component={Cities} options={{
                headerRight: () =>  <TouchableOpacity style={styles.burgerMenu} onPress={() => props.navigation.openDrawer()}>
                                        <MaterialIcons  name="menu" size={40} color="black" />
                                    </TouchableOpacity>,
                headerLeft: () =>   <TouchableOpacity style={styles.backIcon}  onPress={() => props.navigation.navigate('Home')}>
                                        <MaterialIcons name="arrow-back" size={40} color="black" />
                                    </TouchableOpacity>,
                title:'',
                headerTransparent:true
            }}/>
            <stack.Screen name="CityItineraries" component={CityItineraries} options={{
                 headerRight: () => <TouchableOpacity style={styles.burgerMenu} onPress={() => props.navigation.openDrawer(props)}>
                                        <MaterialIcons  name="menu" size={40} color="black" />
                                    </TouchableOpacity>,
                headerShown:false,                   
                title:'',
                headerTransparent:true,
            }}/>            
        </stack.Navigator>
    )
}
export const LogInStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Log In" component={LogIn} options={{
                headerRight: () =>  <TouchableOpacity style={styles.burgerMenu} onPress={() => props.navigation.openDrawer()}>
                                        <MaterialIcons  name="menu" size={40} color="black" />
                                    </TouchableOpacity>,
                headerLeft: () =>   <TouchableOpacity style={styles.backIcon} onPress={() => props.navigation.navigate('Home')}>
                                        <MaterialIcons  name="arrow-back" size={40} color="black" />
                                    </TouchableOpacity>,
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
                headerRight: () =>  <TouchableOpacity style={styles.burgerMenu} onPress={() => props.navigation.openDrawer()}>
                                        <MaterialIcons  name="menu" size={40} color="black" />
                                    </TouchableOpacity>,
                headerLeft: () =>   <TouchableOpacity style={styles.backIcon} onPress={() => props.navigation.navigate('Home')}>
                                        <MaterialIcons  name="arrow-back" size={40} color="black" />
                                    </TouchableOpacity>,
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
        borderWidth:3, 
        borderRadius:30, 
        overflow:'hidden', 
        alignItems:'center', 
        justifyContent:'center',
        backgroundColor:'#e2ceb5',
    },
    backIcon:{
        top:'20%',
        left:'20%',
        borderWidth:3, 
        borderRadius:30, 
        overflow:'hidden', 
        alignItems:'center', 
        justifyContent:'center',
        backgroundColor:'#e2ceb5',
    }

})
