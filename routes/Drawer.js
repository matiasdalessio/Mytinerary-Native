import {createDrawerNavigator} from '@react-navigation/drawer'
import React from 'react'
import {HomeStack, CitiesStack, LogInStack, SignUpStack} from './Stacker'
import { connect } from 'react-redux';
import loginActions from '../redux/actions/loginActions';
import DrawerContent from './DrawerContent'
import AsyncStorage from '@react-native-async-storage/async-storage';


const drawer = createDrawerNavigator()

class Drawer extends React.Component{

    componentDidMount() {
        if (!this.props.userLogged ) { 
            const getData = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('userLogged')
                    const userData = JSON.parse(jsonValue) 
                    let userLS= {
                    token: await AsyncStorage.getItem('token'),
                    ...userData
                    }
                    this.props.forcedLoginByLS(userLS)
                } catch(e) {
                  console.log(e)
                }
            }
            getData()            
        }
    } 

    
    render (){
        return (
            <>
            <drawer.Navigator drawerContent={props =><DrawerContent {...props}/>}>
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
