import React from "react"
import { connect } from "react-redux"
import loginActions from "../redux/actions/loginActions"
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { FontAwesome, FontAwesome5  } from '@expo/vector-icons';

import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";


class LogIn extends React.Component{
    state={
        userInfo:{
            password:"",
            email: "",
        }
        
    }

    componentDidMount(){
        this.props.navigation.addListener('blur', () => {
            this.setState({userInfo:{
                password:"",
                email: "",
            }})
        }) 
    }


    readInput = ((text, name) => {
        let field=name
        let value = text
        this.setState({
            ...this.state,
            userInfo:{...this.state.userInfo,
            [field]: value}
        })
    })


    send = async (e = null, googleUser = null) => {
        let userInfo= e ? this.state.userInfo : googleUser
        const respuesta = await this.props.logUser(userInfo)
        if (!respuesta) {
            return this.props.navigation.navigate('Home')            
        } else if (respuesta.error) {
            Toast.show({
                type: 'error',
                text2: respuesta.error,
                visibilityTime: 2000,
              }
            )
        } else {
            Toast.show({
                text1: 'Logged correctly!',
                text2: 'Welcome ' + this.props.userLogged.firstName,
                visibilityTime: 2000,
                onHide: () => this.props.navigation.navigate('Home'),
              }
            )
              
        }   
    }
    
        
    responseGoogle = (response) => {
        const {email, googleId} = response.profileObj
        this.send(null,{email: email, password: "matias"+googleId, country: "null"})        
    }
    


    render() {
        return(
                <ScrollView  keyboardShouldPersistTaps={'handled'}>
                    <ImageBackground style={{width:'100%', height:900}} source={require( '../assets/img/backgroundSign.jpg')}>
                        <Image style={styles.logo}  source={require('../assets/img/LOGO.png')}></Image> 
                        <View style={{width:'95%', height:'auto', alignItems:"center", justifyContent:"center", backgroundColor:'#e2ceb5', top:'30%', left:10, borderRadius:50}}>
                            <View  style={{marginBottom:'10%'}}> 
                                <Text style={styles.tittle}>Log In with your account!</Text>
                                <Text style={styles.tittle}>Don't have an account?
                                    <Text style={{color:'#0056B3', textDecorationLine:'underline'}}  onPress={() => this.props.navigation.navigate('Sign Up')}> Sign up!</Text>
                                </Text>
                            </View >
                            <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome style={{marginRight:10}} name="envelope" size={30} color="black" />
                                    <View style={styles.inputDiv} >
                                        <TextInput keyboardType='visible-password' style={styles.input}  type="text" placeholder="E-Mail" name="email" value={this.state.userInfo.email} onChangeText={(text,name='email') => this.readInput(text,name)} ></TextInput>
                                    </View>
                                </View>                                
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome5 style={{marginRight:10}} name="key" size={30} color="black" />
                                    <View style={styles.inputDiv} >
                                        <TextInput keyboardType='twitter' secureTextEntry={true} style={styles.input} autoComplete="off" type="password" placeholder="Password" name="password" value={this.state.userInfo.password} onChangeText={(text,name='password') => this.readInput(text,name)}></TextInput> 
                                    </View>
                                </View> 
                                <View > 
                                <TouchableOpacity onPress={(e=true) => this.send(e=true)}>             
                                            <Text style={styles.sendButton}>Log In</Text>
                                </TouchableOpacity>                               
                                    {/* <GoogleLogin/>  */}
                                </View>                      
                            </View>                          
                        </View>                        
                    </ImageBackground>
                </ScrollView>     
        )
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.loginReducer.userLogged
    }
}
const mapDispatchToProps = {
    logUser: loginActions.logUser
}


export default connect(mapStateToProps, mapDispatchToProps)(LogIn)

const styles = StyleSheet.create({
    sendButton:{
        fontFamily:'sans-serif-medium',
        color:'#e2ceb5',
        backgroundColor:'black',
        zIndex:2,
        alignSelf:'center',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        width:150,
        height:40,  
        marginTop:20,
        marginBottom:40,
        justifyContent:'center',   
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50, 
    },
    inputDiv:{
        width:'80%',
        height:30, 
        backgroundColor:'#ffffff',
        borderRadius:50, 
        alignItems:'center', 
        justifyContent:'center',
        marginVertical:10,
    },
    input: {
            fontFamily:'sans-serif-medium',
            width: '100%',
            height: '100%',
            marginLeft:15,
            alignSelf:'center',
            textAlign:'center',
            fontSize: 20,
            marginTop: 10,
            marginBottom:10,
        },
    tittle:{
        color:'#212529',
        marginTop:10,
        fontFamily:'sans-serif-medium',
        textAlign:'center',
        fontSize:20,
    },
    logo:{
        position:'absolute',
        width:155,
        height:126,
        top:'1%',
        left:'35%',
        zIndex:1000
    },
})