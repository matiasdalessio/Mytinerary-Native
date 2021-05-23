import React from "react"
import loginActions from "../redux/actions/loginActions";
import { connect } from "react-redux"
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, View} from "react-native"
import { FontAwesome, FontAwesome5, Fontisto  } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import {Picker} from '@react-native-picker/picker';


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

    readInput = ((e) => {
        // const field = e.target.name
        // const value = e.target.value
        this.setState({
            ...this.state,
            userInfo:{...this.state.userInfo,
            [field]: value}
        })
    })



    send = async (e = null, googleUser = null) => {
       e && e.preventDefault()
       let userInfo= e ? this.state.userInfo : googleUser
        if (userInfo.repeatpassword === userInfo.password) {
            const respuesta = await this.props.newUser(userInfo)
                if (!respuesta) {
                    return this.props.navigation.navigate('Home') 
                }else if (respuesta.message) {
                    Alert.alert(respuesta.message)                
                } else {
                    switch(respuesta){
                        case 'The E-mail is already in use':
                            Alert.alert("The E-mail is already in use")
                            break
                        case 'There was an error in the register.':
                            Alert.alert("There was an error in the register.")
                            break
                        default:
                            return Alert.alert("Signed Up!")
                    }
                }                     
        } else {Alert.alert("Passwords doesn't match!")}
    }  

    
    // validate = (e) => {
    //     const field = e.name
    //     var message = null
    //     var expression;
    //     var invalid = "is-invalid"
    //     var valid = " is-valid"
    //     if (e.value.length !== 0) {
    //         switch(field){
    //             case 'firstName' :
    //                 expression= /^[a-z ']{2,14}$/i
    //                 message= !e.value.match(expression) 
    //                 break
    //             case 'lastName':
    //                 expression= /^[a-z ']{2,14}$/i
    //                 message= !e.value.match(expression) 
    //                 break
    //             case 'email':
    //                 expression= (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/)
    //                 message= !e.value.match(expression)   
    //                 break
    //             case 'password':
    //                 expression= /(?=.*\d)(?=.*[A-z])/
    //                 message = e.value.length < 6 || !e.value.match(expression)
    //                 break
    //             case 'repeatpassword':
    //                 expression= /(?=.*\d)(?=.*[A-z])/
    //                 message = e.value.length < 6 || !e.value.match(expression) || e.value !== this.state.userInfo.password
    //                 break  
    //             case 'img':
    //                 message= e.value.length === 0 || e.value.length <=3
    //                 break  
    //             default:
    //                 return null
    //         }
    //     }        
    //     this.setState({
    //         ...this.state,
    //         validator:{...this.state.validator,
    //             [field]:  message === null ? "" : !message ? valid : invalid}
    //     })
    // }
    
 
    responseGoogle = (response) => {
        const {givenName, email, googleId, imageUrl, familyName} = response.profileObj
        this.send(null, {firstName: givenName, lastName: familyName, email: email, password: "matias"+googleId, repeatpassword: "matias"+googleId, img: imageUrl, country: "null"})
    }


    
    render() {
        return(
            <View >
                    <ImageBackground style={{width:'100%', height:'100%'}} source={require( '../assets/img/backgroundSign.jpg')}>
                        <Image style={styles.logo}  source={require('../assets/img/LOGO.png')}></Image> 
                        <View style={{width:'95%', height:'auto', alignItems:"center", justifyContent:"center", backgroundColor:'#e2ceb5', top:160, left:10, borderRadius:50}}>
                            <View  style={{marginBottom:'2%'}}> 
                                <Text style={styles.tittle}>Join to our World of Adventures!</Text>
                                <Text style={styles.tittle}>Already have an account?
                                    {/* <Text onPress={this.props.navigation.navigate('Log In')}> Log in!</Text> */}
                                </Text>
                            </View >
                            <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome  style={styles.icon} name="user" size={30} color="black" />
                                    <View style={styles.inputDiv} >
                                        <TextInput style={styles.input} className={`form-control ${this.state.validator.firstName}`} onBlur={(e) => this.validate(e)} type="text" placeholder="First Name" name="firstName" value={this.state.userInfo.firstName} onChangeText={(text,name='firstName') => this.readInput(text,name)}  ></TextInput>
                                    </View>
                                </View>                                
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome  style={styles.icon} name="user" size={30} color="black" />
                                    <View style={styles.inputDiv} >
                                        <TextInput style={styles.input} className={`form-control ${this.state.validator.lastName}`} onBlur={(e) => this.validate(e)} type="text" placeholder="Last Name" name="lastName" value={this.state.userInfo.lastName} onChangeText={(text,name='lastName') => this.readInput(text,name)} ></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome style={styles.icon} name="envelope" size={30} color="black" />
                                    <View style={styles.inputDiv} >
                                        <TextInput style={styles.input} className={`form-control ${this.state.validator.email}`} onBlur={(e) => this.validate(e)} type="text" placeholder="E-Mail" name="email" value={this.state.userInfo.email} onChangeText={(text,name='email') => this.readInput(text,name)}></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome5 style={styles.icon} name="key" size={30} color="black" />
                                    <View style={styles.inputDiv} >
                                        <TextInput style={styles.input} id="password" autoComplete="off" className={`form-control ${this.state.validator.password}`} onBlur={(e) => this.validate(e)} type="password" placeholder="Password" name="password" value={this.state.userInfo.password} onChangeText={(text,name='password') => this.readInput(text,name)}></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome5 style={styles.icon} name="key" size={30} color="black" />
                                    <View style={styles.inputDiv} >
                                        <TextInput style={styles.input} autoComplete="off" className={`form-control ${this.state.validator.repeatpassword}`} onBlur={(e) => this.validate(e)} type="password" placeholder="Repeat Password" name="repeatpassword" value={this.state.userInfo.repeatpassword} onChangeText={(text,name='password') => this.readInput(text,name)}></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <FontAwesome style={styles.icon} name="picture-o" size={30} color="black" />
                                    <View style={styles.inputDiv} >
                                        <TextInput style={styles.input} className={`form-control ${this.state.validator.img}`} onBlur={(e) => this.validate(e)} type="text" placeholder="Profile Pic URL link" name="img" value={this.state.userInfo.img} onChangeText={(text,name='img') => this.readInput(text,name)}></TextInput> 
                                    </View>
                                </View> 
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Fontisto style={styles.icon} name="world" size={30} color="black"/>
                                    <View style={styles.inputDiv} >
                                        <Picker>
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
                                <TouchableOpacity onPress={this.send}>             
                                            <Text style={styles.sendButton}>Create Account</Text>
                                </TouchableOpacity>                               
                                    {/* <GoogleLogin/> */}
                                </View>                      
                            </View>                          
                        </View>                        
                    </ImageBackground>
                </View>     
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
    icon:{
        marginRight:10
    },
    inputDiv:{
        width:'80%',
        height:37, 
        backgroundColor:'#ffffff',
        borderRadius:50, 
        alignItems:'center', 
        justifyContent:'center',
        marginVertical:10
    },
    input: {
        fontFamily:'sans-serif-medium',
        width: '100%',
        height: 60,
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
        fontSize:30,
    },
    logo:{
        position:'absolute',
        width:155,
        height:126,
        top:'1%',
        left:'60%',
        zIndex:1000
    },
})
