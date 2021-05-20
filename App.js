import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Loader from './src/components/Loader';
import Cities from './src/pages/Cities';
import Home from './src/pages/Home';
import loginActions from './src/redux/actions/loginActions';


class App extends React.Component{

  // componentDidMount() {
  //   if (!this.props.userLogged && localStorage.getItem('token')) {  
  //     const userData = JSON.parse(localStorage.getItem('userLogged'))
  //     const userLS= {
  //       token: localStorage.getItem('token'),
  //       ...userData
  //     }
  //     this.props.forcedLoginByLS(userLS)
  //   }
  // }
  render(){

  return (
          <>
          <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.container}>
            <Home />
            {/* <Loader/> */}
             {/* <Cities/> */}
            {/* <CityItineraries/>
            <LogIn/>
            <SignUp/>  */}
          </View>
          </SafeAreaView>
        </>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//       userLogged: state.loginReducer.userLogged
//   }
// }
// const mapDispatchToProps = {
//   forcedLoginByLS :  loginActions.forcedLoginByLS,

// }

export default (App)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2ceb5',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  safeArea:{
    marginTop:40,
    height:'100%'
  },

  
});
