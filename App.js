import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import {NavigationContainer} from '@react-navigation/native'
import Drawer from './routes/Drawer';
import mainReducer from './redux/reducers/mainReducer'
import thunk from 'redux-thunk';
import GoogleLogin from './screens/GoogleLogin'
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

const reduxStore = createStore(mainReducer, applyMiddleware(thunk))


class App extends React.Component{

  render(){
    
      return (
            <Provider store={reduxStore} >
              <NavigationContainer>      
                <StatusBar
                  animated={true}
                  backgroundColor="#61dafb"
                  barStyle={"dark-content"}
                  hidden={true} />
                <Drawer />
                <Toast ref={(ref) => Toast.setRef(ref)} />
                {/* <GoogleLogin/> */}
              </NavigationContainer>
            </Provider>
        );
  }
}

export default (App)


