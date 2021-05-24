import React from "react"
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View,TouchableOpacity } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from "react-redux"
import itinerariesActions from '../redux/actions/itinerariesActions';
import citiesActions from '../redux/actions/citiesActions'
import Loader from "./Loader"



class Cities extends React.Component{

    state={
        filteredCities:[],
    }
   

    componentDidMount() {  
        this.props.fetchCities()   
        this.props.cleanItineraries() 
        this.setState({filteredCities: this.props.filteredCities})
    }
    componentDidUpdate(prevProps){
        if (prevProps.filteredCities.length === 0 && this.props.filteredCities.length !==0) {
            this.setState({filteredCities: this.props.filteredCities})
        } 
    }


    render() {

            if (this.state.filteredCities.length === 0) {
            return(
                <Loader />
            )
        } 


        
        return(
            <SafeAreaView style={styles.safeArea}>
                <ScrollView >
                    <Image style={styles.logo}  source={require('../assets/img/LOGO.png')}></Image> 
                    <Image style={styles.hero} source={require("../assets/img/heroimg2.jpg")}/>
                    <View >
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Image  style={styles.avionPNG} source={require("../assets/img/avionH1CitiesL.png")}/>
                            <Text style={{
                                color:'#212529',
                                marginTop:10,
                                fontFamily:'sans-serif-medium',
                                textAlign:'center',
                                fontSize:30,
                                }}>Available cities</Text>
                            <Image  style={styles.avionPNG} source={require("../assets/img/avionH1CitiesR.png")} />
                        </View>
                        <View >
                            <TextInput 
                                placeholder="Search a City"
                                placeholderTextColor = '#202510'
                                // keyboardType = 'text'
                                color = 'black'
                                style = {styles.input}
                                onChangeText={(e) => this.props.findCity(e)}
                            />
                        </View>
                        <View style={{backgroundColor:'black'}}>
                            {this.props.filteredCities.length >0 
                                ?   this.props.filteredCities.map(city =>{
                                    return <TouchableOpacity key={city._id} onPress={() => this.props.navigation.navigate("CityItineraries",{cityId:city._id})} style={styles.divBanners}>
                                        <ImageBackground style={styles.image} source={{uri:city.img}}>
                                            <Text style={styles.cityName}>{city.name}-{city.country}</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                })
                                :   <ImageBackground style={styles.notFounded} source={require('../assets/img/mapa.jpg')}> 
                                        <Text style={styles.notFoundedTittle}>Oh no! Looks like that city doesn't exist here yet... </Text>
                                        <Text style={styles.notFoundedSubTittle}>Try another one!</Text>                                 
                                    </ImageBackground> 
                            }
                            <Text style={styles.button}>Back to Home</Text>
                        </View>
                    </View>
                </ScrollView> 
            </SafeAreaView>       
        )
    }
}
const mapStateToProps = state => {
    return {
            filteredCities: state.cityReducer.filteredCities,
        }
    }
    
const mapDispatchToProps = {
    fetchCities: citiesActions.fetchCities,
    findCity: citiesActions.findCity,
    cleanItineraries: itinerariesActions.cleanItineraries,
}
        
        
export default connect(mapStateToProps,mapDispatchToProps) (Cities)
        
const styles = StyleSheet.create({
    image: {
        alignItems:'center',
        opacity:1,
        width:"100%",
        height:150,
        marginBottom:20,
        marginTop:20, 
    },
    safeArea:{
        flex: 1,
        backgroundColor: '#e2ceb5',
        height:'100%'
    },  
    cityName:{
        top:"40%",
        fontSize: 30,
        zIndex:20,
        textAlign:'center',
        width:'100%',
        top:50, 
        backgroundColor:'rgba(0, 0, 0, 0.550)', 
        color:'#e2ceb5',
        shadowColor: "white",
    },
    divBanners:{
        width:'98%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 180,
        overflow:'hidden',
        marginLeft:5,        
    },
    input: {
        fontFamily:'sans-serif-medium',
        width: '90%',
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'center',
        alignSelf:'center',
        fontSize: 20,
        marginTop: 10,
        marginBottom:10,
        borderBottomColor:'black',
        borderBottomWidth:2,
        textDecorationLine: 'none'
    },
    notFounded:{
        width:"100%",
        height:200,
    },
    notFoundedTittle:{
        marginTop:50,
        textAlign: 'center',
        alignSelf:'center',
        justifyContent:'center',
        fontSize: 20,
        fontFamily:'sans-serif-medium',
    },
    notFoundedSubTittle:{
        textAlign: 'center',
        alignSelf:'center',
        justifyContent:'center',
        fontSize: 20,
        fontFamily:'sans-serif-medium',
    },
    hero:{
        width:"100%",
        height:200, 
    },
    logo:{
        position:'absolute',
        width:100,
        height:80,
        top:0,
        left:'2%',
        zIndex:1000
    },
    avionPNG:{
        width:"20%",
        height:40,
    },
    button:{
        fontFamily:'sans-serif-medium',
        color:'black',
        backgroundColor:'#e2ceb5',
        zIndex:2,
        alignSelf:'center',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        width:170,
        height:40,  
        marginTop:6,
        marginBottom:10,
        justifyContent:'center',   
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,    
    },
})

