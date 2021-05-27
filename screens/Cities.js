import React from "react"
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View,TouchableOpacity, ToastAndroid } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from "react-redux"
import itinerariesActions from '../redux/actions/itinerariesActions';
import citiesActions from '../redux/actions/citiesActions'
import Loader from "./Loader"
import Toast from "react-native-toast-message";



class Cities extends React.Component{

    state={
        filteredCities:[],
    }
   

    componentDidMount() { 
        this.props.navigation.addListener('focus', () => {
            this.props.fetchCities()
            this.props.cleanItineraries() 
        }) 
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
                    <View style={{width:'100%', overflow:'hidden', borderBottomLeftRadius:30, borderBottomRightRadius:30}}>
                        <Image style={styles.hero} source={require("../assets/img/heroimg2.jpg")}/>
                    </View>
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
                                color = 'black'
                                style = {styles.input}
                                onChangeText={(e) => this.props.findCity(e)}
                            />
                        </View>
                        <View style={{backgroundColor:'black', paddingVertical:30, borderTopLeftRadius:20, borderTopRightRadius:20}}>
                            {this.props.filteredCities.length >0 
                                ?   this.props.filteredCities.map(city =>{
                                    return  <TouchableOpacity onLongPress={() => console.log('hola')} key={city._id} onPress={() => this.props.navigation.navigate("CityItineraries",{cityId:city._id})} style={styles.divBanners}>
                                                <ImageBackground style={styles.image} source={{uri:city.img}}>
                                                    <Text style={styles.cityName}>{city.name}-{city.country}</Text>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                })
                                :   <View style={styles.divNotFounded}>
                                        <ImageBackground style={styles.notFoundedImage} source={require('../assets/img/mapa.jpg')}> 
                                            <Text style={styles.notFoundedTittle}>Oh no! Looks like that city doesn't exist here yet... </Text>
                                            <Text style={styles.notFoundedSubTittle}>Try another one!</Text>                                 
                                        </ImageBackground> 
                                    </View>
                            }
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate("Home")}>
                                <Text  style={styles.button}>Back to Home</Text> 
                            </TouchableOpacity>
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
        width:"100%",
        height:150,
    },
    safeArea:{
        flex: 1,
        backgroundColor: '#e2ceb5',
        height:'100%'
    },  
    cityName:{
        top:"10%",
        fontSize: 24,
        zIndex:20,
        textAlign:'center',
        width:'100%', 
        backgroundColor:'rgba(0, 0, 0, 0.550)', 
        color:'#e2ceb5',
        shadowColor: "white",
    },
    divBanners:{
        width:'98%',
        height:150,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 100,
        overflow:'hidden',
        marginLeft:5, 
        marginVertical:10,
        borderWidth:2,
        borderColor: '#e2ceb5',     
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
    divNotFounded:{
        width:'98%',
        height:150,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 500,
        overflow:'hidden',
        marginLeft:5, 
        marginTop:60,
        marginBottom:'60%'
    },
    notFoundedImage:{
        alignItems:'center',
        width:"100%",
        height:150,
    },
    notFoundedTittle:{
        fontWeight:'bold',
        top:"35%",
        fontSize: 15,
        zIndex:20,
        textAlign:'center',
        width:'100%', 
        backgroundColor:'rgba(0, 0, 0, 0.650)', 
        color:'#e2ceb5',
        shadowColor: "white",
    },
    notFoundedSubTittle:{
        top:"35%",
        fontSize: 14,
        zIndex:20,
        textAlign:'center',
        width:'100%', 
        backgroundColor:'rgba(0, 0, 0, 0.650)', 
        color:'#e2ceb5',
        shadowColor: "white",
    },
    hero:{
        width:"100%",
        height:200, 
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
        marginBottom:50,
        justifyContent:'center',   
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,    
    },
})

