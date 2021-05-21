import {createDrawerNavigator} from '@react-navigation/drawer'
import React from 'react'
import {HomeStack, CitiesStack} from './Stacker'
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import loginActions from '../redux/actions/loginActions';

const drawer = createDrawerNavigator()

class Drawer extends React.Component{

    // componentDidMount() {
    //     if (!this.props.userLogged && AsyncStorage.getItem('token')) {  
    //     const userData = JSON.parse(AsyncStorage.getItem('userLogged'))
    //     const userLS= {
    //         token: AsyncStorage.getItem('token'),
    //         ...userData
    //     }
    //     this.props.forcedLoginByLS(userLS)
    //     }
    // }

    
    render (){

        return (
            <drawer.Navigator>
                <drawer.Screen name="Home" component={HomeStack} options={{
                    title: 'Home'
                }} />
                <drawer.Screen name="Cities" component={CitiesStack} options={{
                    title: 'Cities',
                }}/>
            </drawer.Navigator>
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

}

export default connect(mapStateToProps,mapDispatchToProps) (Drawer)
