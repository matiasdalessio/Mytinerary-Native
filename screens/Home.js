import React from "react"
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux"



const Home = (props) =>{

         
        return(
                <View style={{width:'100%', height:'100%', overflow:'hidden', backgroundColor:'#e2ceb5'}}> 
                    <Image style={styles.logo}  source={require('../assets/img/LOGO.png')}></Image> 
                    <View style={{
                        backgroundColor:'black',
                        borderBottomLeftRadius: 60,
                        borderBottomRightRadius:60,
                        height: '80%',
                        width: '100%',
                        overflow:'hidden',
                        }}>            
                    <ImageBackground
                        style={styles.image}
                        source={require('../assets/img/heroimg.jpg')}
                        >
                            <Text style={styles.tittle}>Find your perfect trip, designed by insiders who know and love their cities!</Text>
                    </ImageBackground>
                    </View>
                    <View>
                            <Text style={styles.callToAction}>What are you waiting for?</Text>
                            <TouchableOpacity>
                                <Text onPress={() => props.navigation.navigate("Cities")} style={styles.button}>Go There!</Text> 
                            </TouchableOpacity>
                    </View>
                </View>      
        )
    
}


const mapStateToProps = state => {
  return {
      userLogged: state.loginReducer.userLogged
  }
}


export default connect(mapStateToProps) (Home)

const styles = StyleSheet.create({
    image: {
        backgroundColor:'black',
        width:"100%",
        height:'100%', 
    },
    tittle:{
        fontFamily:'sans-serif-medium',
        marginTop:'40%',
        textAlign:'center',
        fontSize:25,
        width:'90%',
        alignSelf: 'center',
        color:'#e2ceb5',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 3, height: 3},
        textShadowRadius: 10,
    },
    logo:{
        position:'absolute',
        width:185,
        height:150,
        top:'1%',
        left:'30%',
        zIndex:1000,
    },
    callToAction:{
        color:'#212529',
        marginTop:10,
        fontFamily:'sans-serif-medium',
        textAlign:'center',
        fontSize:20,
    },
    button:{
        fontFamily:'sans-serif-medium',
        color:'#e2ceb5',
        backgroundColor:'black',
        zIndex:2,
        alignSelf:'center',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        width:150,
        height:60,  
        marginTop:10,
        marginBottom:5,
        justifyContent:'center',   
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,    
    },
  });