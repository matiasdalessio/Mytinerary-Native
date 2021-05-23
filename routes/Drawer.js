import {createDrawerNavigator} from '@react-navigation/drawer'
import React from 'react'
import {HomeStack, CitiesStack, LogInStack, SignUpStack} from './Stacker'
import { connect } from 'react-redux';
import loginActions from '../redux/actions/loginActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';


const drawer = createDrawerNavigator()

class Drawer extends React.Component{

    componentDidMount() {
        if (!this.props.userLogged ) { 
            const setStringValue = async () => {
            try {
                let userData = await JSON.parse( AsyncStorage.getItem('userLogged'))
                let userLS= {
                token: await AsyncStorage.getItem('token'),
                ...userData
                }
                console.log('mando info')
                this.props.forcedLoginByLS(userLS)
              } catch(e) {
                // save error
              }         
              
              
            }
            setStringValue()
        }else{
            console.log('hay usuario logueado')
        }
    } 

    
    render (){

        return (
            <>
            <drawer.Navigator>
                <drawer.Screen name="Home" component={HomeStack} options={{
                    title: 'Home'
                }} />
                <drawer.Screen name="Cities" component={CitiesStack} options={{
                    title: 'Cities',
                }}/>
                {!this.props.userLogged &&<drawer.Screen name="Log In" component={LogInStack} options={{
                    title: 'Log In'
                }} />}
                {!this.props.userLogged &&<drawer.Screen name="Sign Up" component={SignUpStack} options={{
                    title: 'Sign Up'
                }} />}
            </drawer.Navigator>            
            </>
        )
    }
}

const mapStateToProps = state => {
  return {
      userLogged: state.loginReducer.userLogged
  }
}
const mapDispatchToProps = {
  forcedLoginByLS :  loginActions.forcedLoginByLS,
  removeUserInfo: loginActions.removeUserInfo
}

export default connect(mapStateToProps,mapDispatchToProps) (Drawer)
