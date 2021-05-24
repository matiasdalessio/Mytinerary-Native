import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Title, Drawer, } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {HomeStack, CitiesStack, LogInStack, SignUpStack} from './Stacker'
import { connect } from 'react-redux';
import loginActions from '../redux/actions/loginActions';



function DrawerContent(props) {

  

  return (
    <View style={{ flex: 1, backgroundColor:'black'}}>
      <View style={{backgroundColor:'black', marginTop:40}}>
        <View style={{  flexDirection: 'column' }}>
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginLeft:12, marginBottom:20}}>
              {props.userLogged && <Image style={{width:60, height:60, borderRadius: 100}} source={{uri: props.userLogged.img}}/>}
            <Title style={styles.title}>{!props.userLogged ? 'Welcome!' : 'Welcome ' + props.userLogged.firstName + '!'}</Title>
            </View>
          </View>
      </View>
        
    
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            
          <DrawerItem style={{backgroundColor:'#e2ceb5'}}
              label="HOME"
              labelStyle={{color:'black', fontWeight:'bold'}}
              onPress={() => { props.navigation.navigate('Home') }}
              />
            <DrawerItem style={{backgroundColor:'#e2ceb5'}}
              label="CITIES"
              labelStyle={{color:'black', fontWeight:'bold'}}
              onPress={() => { props.navigation.navigate('Cities') }}
              />

           
           
            {!props.userLogged &&
              <>             
                <DrawerItem style={{backgroundColor:'#e2ceb5'}}
                 labelStyle={{color:'black', fontWeight:'bold'}}
                 label="SIGN UP"
                 onPress={() => { props.navigation.navigate('Sign Up') }}
                 />
                <DrawerItem style={{backgroundColor:'#e2ceb5'}}
                  labelStyle={{color:'black', fontWeight:'bold'}}
                  label="LOGIN"
                  onPress={() => { props.navigation.navigate('Log In') }}
                  />
              </>
            }
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {props.userLogged &&
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem style={{backgroundColor:'#e2ceb5'}}
                 labelStyle={{color:'black', fontWeight:'bold'}}
            label="LOG OUT"
            onPress={() => props.removeUserInfo()}
          />
           
        </Drawer.Section>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
   
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontFamily:'sans-serif-medium',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginLeft: 10,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
});

const mapStateToProps = (state) => {
  return {
    userLogged: state.loginReducer.userLogged
  }
}

const mapDispatchToProps = {
  removeUserInfo: loginActions.removeUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)