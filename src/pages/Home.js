import { StatusBar } from "expo-status-bar"
import React from "react"
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native"
import ContentCarousel from "../components/ContentCarousel"



const Home = () =>{
         
        return(
            <>
            <ScrollView > 
                <Image style={styles.logo}  source={require('../assets/img/LOGO.png')}></Image> 
                <View style={{
                    backgroundColor:'black',
                    borderBottomLeftRadius: 60,
                    borderBottomRightRadius:60,
                    height: 600,
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
                        <Text style={styles.callToAction}>Feel free to check our itineraries and activities!</Text>
                        <Text style={styles.button}>Go There!</Text> 
                </View>
                <ContentCarousel/>
            </ScrollView> 
            </>       
        )
    
}

export default Home

const styles = StyleSheet.create({
    image: {
        backgroundColor:'black',
        opacity:0.8,
        width:"100%",
        height:600, 
    },
    tittle:{
        fontFamily:'sans-serif-medium',
        marginTop:150,
        textAlign:'center',
        fontSize:25,
        width:'90%',
        alignSelf: 'center',
        color:'#e2ceb5',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10,
    },
    logo:{
        position:'absolute',
        width:185,
        height:150,
        top:2,
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
        width:130,
        height:40,  
        marginTop:6,
        marginBottom:10,
        justifyContent:'center',   
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,    
    },
  });