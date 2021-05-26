import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Title } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import loginActions from '../redux/actions/loginActions';
import { Drawer } from 'react-native-paper';



function DrawerContent(props) {

  

  return (
    <View style={{ flex: 1, backgroundColor:'black'}}>
      <View style={{backgroundColor:'black', marginTop:40}}>
        <View style={{  flexDirection: 'column' }}>
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginLeft:12, marginBottom:20,}}>
              {props.userLogged 
              ? <Image style={{width:60, height:60, borderRadius: 100, }} source={{uri: props.userLogged.img}}/>
              : <Image style={{width:60, height:60, borderRadius: 100, backgroundColor:'#e2ceb5'}} source={require('../assets/img/generic-user-icon.jpg')}/> }
            <Title style={styles.title}>{!props.userLogged ? 'Welcome!' : 'Welcome ' + props.userLogged.firstName + '!'}</Title>
            </View>
          </View>
      </View>
        
    
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
          <Drawer.Item
              style={{ backgroundColor: '#e2ceb5' }}
              icon="home"
              label="HOME"
              onPress={() => { props.navigation.navigate('Home') }}
          />
          <Drawer.Item
              style={{ backgroundColor: '#e2ceb5' }}
              icon="city"
              label="CITIES"
              onPress={() => { props.navigation.navigate('Cities') }}
          />

           
           
            {!props.userLogged &&
              <>             
                <Drawer.Item
                    style={{ backgroundColor: '#e2ceb5' }}
                    icon="account-plus"
                    label="SIGN UP"
                    onPress={() => { props.navigation.navigate('Sign Up') }}
                />
                <Drawer.Item
                    style={{ backgroundColor: '#e2ceb5' }}
                    icon="login"
                    label="LOG IN"
                    onPress={() => { props.navigation.navigate('Log In') }}
                />
              </>
            }
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {props.userLogged &&
        <Drawer.Section style={styles.bottomDrawerSection}>
          <Drawer.Item
                    style={{ backgroundColor: '#e2ceb5' }}
                    icon="logout"
                    label="LOG OUT"
                    onPress={() => Alert.alert("Are you sure you want to log out?", "", [
                      {text: 'Yes', onPress: () => props.removeUserInfo()},
                      {text:'No'}                  
                    ])}
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
    color: '#e2ceb5',
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