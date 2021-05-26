import React from "react"
import loginActions from "../redux/actions/loginActions";
import { connect } from "react-redux"
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View} from "react-native"
import { FontAwesome, FontAwesome5, Fontisto  } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import {Picker} from '@react-native-picker/picker';
import Toast from "react-native-toast-message";


class SignUp extends React.Component{


    state={
        userInfo:{
            repeatpassword: "",
            firstName: "",
            lastName: "",
            country: "",
            password:"",
            img: "",
            email: "",
        },
        validator:{
            repeatpassword: "",
            firstName: "",
            lastName: "",
            country: "",
            password:"",
            img: "",
            email: "",
        },
    }

    componentDidMount(){
        this.props.navigation.addListener('blur', () => {
            this.setState({
            userInfo:{
                repeatpassword: "",
                firstName: "",
                lastName: "",
                country: "",
                password:"",
                img: "",
                email: "",
            },
            validator:{
                repeatpassword: "",
                firstName: "",
                lastName: "",
                country: "",
                password:"",
                img: "",
                email: "",
            }})
        }) 
    }

    readInput = ((text, name) => {
        const field = name
        const value = text
        this.setState({
            ...this.state,
            userInfo:{...this.state.userInfo,
            [field]: value}
        })
    })



    send = async (e = null, googleUser = null) => {
       let userInfo= e ? this.state.userInfo : googleUser
        if (userInfo.repeatpassword === userInfo.password) {
            const respuesta = await this.props.newUser(userInfo)
                if (!respuesta) {
                    return this.props.navigation.navigate('Home') 
                }else if (respuesta.message) {
                    Toast.show({
                        type: 'error',
                        text2: respuesta.message,
                        visibilityTime: 2000,
                      }
                    )               
                } else {
                    switch(respuesta){
                        case 'The E-mail is already in use':
                            Toast.show({
                                type: 'error',
                                text2: 'The E-mail is already in use',
                                visibilityTime: 2000,
                              }
                            )  
                            break
                        case 'There was an error in the register.':
                            Toast.show({
                                type: 'error',
                                text2: 'There was an error in the register.',
                                visibilityTime: 2000,
                              }
                            )  
                            break
                        default:
                            return Toast.show({
                                text1: 'Signed up correctly!',
                                text2: 'Welcome ' + this.props.userLogged.firstName,
                                visibilityTime: 2000,
                                onHide: () => this.props.navigation.navigate('Home'),
                              }
                            )
                    }
                }                     
        } else {
            Toast.show({
                type: 'error',
                text1: "Passwords doesn't match",
                text2: 'Verify and try again!',
                visibilityTime: 1000,
              }
            )
        }
    }  

    
    validate = (text, name) => {
        const field = name
        var message = null
        var expression;
        var valid = styles.correctValue
        var invalid = styles.incorrectValue
        if (text.length !== 0) {
            switch(field){
                case 'firstName' :
                    expression= /^[a-z ']{2,14}$/i
                    message= !text.match(expression) 
                    break
                case 'lastName':
                    expression= /^[a-z ']{2,14}$/i
                    message= !text.match(expression) 
                    break
                case 'email':
                    expression= (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/)
                    message= !text.match(expression)   
                    break
                case 'password':
                    expression= /(?=.*\d)(?=.*[A-z])/
                    message = text.length < 6 || !text.match(expression)
                    break
                case 'repeatpassword':
                    expression= /(?=.*\d)(?=.*[A-z])/
                    message = text.length < 6 || !text.match(expression) || text !== this.state.userInfo.password
                    break  
                case 'img':
                    message= text.length === 0 
                    break  
                default:
                    return null
            }
        }        
        this.setState({
            ...this.state,
            validator:{...this.state.validator,
                [field]:  message === null ? "" : !message ? valid : invalid}
        })
    }
    
 
    responseGoogle = (response) => {
        const {givenName, email, googleId, imageUrl, familyName} = response.profileObj
        this.send(null, {firstName: givenName, lastName: familyName, email: email, password: "matias"+googleId, repeatpassword: "matias"+googleId, img: imageUrl, country: "null"})
    }


    
    render() {
        return(
                <ScrollView  keyboardShouldPersistTaps={'handled'} style={{flex:1, height:'100%'}}>
                    <ImageBackground style={{width:'100%', height:900}} source={require( '../assets/img/backgroundSign.jpg')}>
                        <Image style={styles.logo}  source={require('../assets/img/LOGO.png')}></Image> 
                        <View style={{width:'95%', height:'auto', alignItems:"center", justifyContent:"center", backgroundColor:'#e2ceb5', top:'20%', left:10, borderRadius:50}}>
                            <View  style={{marginBottom:'2%'}}> 
                                <Text style={styles.tittle}>Join to our World of Adventures!</Text>
                                <Text style={styles.tittle}>Already have an account?
                                    <Text style={{color:'#0056B3', textDecorationLine:'underline'}} onPress={() => this.props.navigation.navigate('Log In')}> Log in!</Text>
                                </Text>
                            </View >
                            <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome  style={styles.icon} name="user" size={30} color="black" />
                                    <View style={[styles.inputDiv, this.state.validator.firstName ]} >
                                        <TextInput style={styles.input}  onEndEditing={(e, name='firstName') => this.validate(e.nativeEvent.text, name)}  type="text" placeholder="First Name" name="firstName" value={this.state.userInfo.firstName} onChangeText={(text,name='firstName') => this.readInput(text,name)}  ></TextInput>
                                    </View>
                                </View>                                
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome  style={styles.icon} name="user" size={30} color="black" />
                                    <View style={[styles.inputDiv, this.state.validator.lastName ]} >
                                        <TextInput style={styles.input}  onEndEditing={(e, name='lastName') => this.validate(e.nativeEvent.text, name)}  type="text" placeholder="Last Name" name="lastName" value={this.state.userInfo.lastName} onChangeText={(text,name='lastName') => this.readInput(text,name)} ></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome style={styles.icon} name="envelope" size={30} color="black" />
                                    <View style={[styles.inputDiv, this.state.validator.email ]} >
                                        <TextInput keyboardType='visible-password' style={styles.input}  onEndEditing={(e, name='email') => this.validate(e.nativeEvent.text, name)}  type="text" placeholder="E-Mail" name="email" value={this.state.userInfo.email} onChangeText={(text,name='email') => this.readInput(text,name)}></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome5 style={styles.icon} name="key" size={30} color="black" />
                                    <View style={[styles.inputDiv, this.state.validator.password ]} >
                                        <TextInput keyboardType='twitter' secureTextEntry={true} style={styles.input} id="password" autoComplete="off"  onEndEditing={(e, name='password') => this.validate(e.nativeEvent.text, name)} type="password" placeholder="Password" name="password" value={this.state.userInfo.password} onChangeText={(text,name='password') => this.readInput(text,name)}></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome5 style={styles.icon} name="key" size={30} color="black" />
                                    <View style={[styles.inputDiv, this.state.validator.repeatpassword ]} >
                                        <TextInput keyboardType='twitter' secureTextEntry={true} style={styles.input} autoComplete="off" onEndEditing={(e, name='repeatpassword') => this.validate(e.nativeEvent.text, name)}  type="password" placeholder="Repeat Password" name="repeatpassword" value={this.state.userInfo.repeatpassword} onChangeText={(text,name='repeatpassword') => this.readInput(text,name)}></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome style={styles.icon} name="picture-o" size={30} color="black" />
                                    <View style={[styles.inputDiv, this.state.validator.img ]} >
                                        <TextInput style={styles.input}  onEndEditing={(e, name='img') => this.validate(e.nativeEvent.text, name)}  type="text" placeholder="Profile Pic URL link" name="img" value={this.state.userInfo.img} onChangeText={(text,name='img') => this.readInput(text,name)}></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Fontisto style={styles.icon} name="world" size={30} color="black"/>
                                    <View style={[styles.inputDiv, this.state.validator.country ]} >
                                        <Picker
                                            style={{width:'100%', height:'100%', textAlign:'center'}}
                                            selectedValue={this.state.userInfo.country}
                                            itemT
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({
                                                    ...this.state,
                                                    userInfo:{...this.state.userInfo,
                                                    country: itemValue}
                                                })}>
                                            <Picker.Item label="...................Choose Your Country..................." value="" enabled={true} />
                                            <Picker.Item label="Argentina" value="Argentina" />
                                            <Picker.Item label="Bolivia" value="Bolivia" />
                                            <Picker.Item label="Chile" value="Chile" />
                                            <Picker.Item label="Japan" value="Japan" />
                                            <Picker.Item label="Spain" value="Spain" />
                                            <Picker.Item label="Venezuela" value="Venezuela" />
                                        </Picker> 
                                         
                                    </View>
                                </View> 
                                <View > 
                                <TouchableOpacity onPress={(e=true) => this.send(e=true)}>               
                                            <Text style={styles.sendButton}>Create Account</Text>
                                </TouchableOpacity>                               
                                    {/* <GoogleLogin/> */}
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
    fetchCountries :  loginActions.fetchCountries,
    newUser: loginActions.newUser
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

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
        width:180,
        height:40,  
        marginTop:20,
        marginBottom:10,
        justifyContent:'center',   
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50, 
    },
    safeArea:{
        flex: 1,
        backgroundColor: '#e2ceb5',
        height:'130%'
    },   
    icon:{
        marginRight:10
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
    correctValue:{
        borderWidth:2,
        borderColor:'green'
    },
    incorrectValue:{
        borderWidth:2,
        borderColor:'red'
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
        textDecorationLine: 'none',

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
