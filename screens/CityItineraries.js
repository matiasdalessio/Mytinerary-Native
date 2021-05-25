import React from "react";
import { Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Itineraries from "./Itineraries";
import Loader from "./Loader";
import { MaterialIcons } from '@expo/vector-icons';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

class CityItineraries extends React.Component{
    
    
        onRefresh = () => {
          this.setState({refreshing: true});
          wait(2000).then(() =>  
            this.setState({...this.state, refreshing: false}),
            this.setState({...this.state, itineraries: null}),
            this.props.cleanItineraries(),
            this.props.loadItineraries(this.props.route.params.cityId)
          )
        };

    
    state={
        city: [],
        loading: true,
        refreshing:false,
        itineraries: null
    }


    componentDidMount()  {
        this.props.navigation.addListener('focus', () => {
            this.props.loadItineraries(this.props.route.params.cityId)
        })
        this.props.loadItineraries(this.props.route.params.cityId)
        if (this.props.filteredCities.length !== 0) {        
            this.setState({
                ...this.state, 
                city: this.props.filteredCities.find(city => city._id === this.props.route.params.cityId),
                loading : false, itineraries: this.props.itineraries
            })             
        } else if (this.props.filteredCities.length === 0) {
            this.props.fetchSingleCity(this.props.route.params.cityId)         
        }               
    }

    componentDidUpdate(){
        if(this.props.city.length !==0 && this.state.city.length ===0 ) {
            this.setState({
                ...this.state,
                city: this.props.city, loading: false, 
            })
        }else if (this.props.filteredCities.length === 0 && !this.props.success) {
            this.props.navigation.navigate("Home")  
        } else if (this.state.itineraries === null && this.props.itineraries){
            this.setState({...this.state, itineraries: this.props.itineraries})
        }
    }  
    
    render(){    

        if (this.state.loading || !this.state.itineraries) {
            return <Loader />
        }

        return (   
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}>
                        <ImageBackground style={styles.hero} source={{uri: this.state.city.img}}>
                                    <TouchableOpacity style={styles.backIcon}  onPress={() => this.props.navigation.navigate('Cities')}>
                                        <MaterialIcons name="arrow-back" size={40} color="black" />
                                    </TouchableOpacity>
                        </ImageBackground>
                        <View >
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:'100%', height:'auto'}}>
                                <Image  style={styles.avionPNG} source={require("../assets/img/avionH1CitiesL.png")}/>
                                <Text style={{
                                    color:'black',
                                    fontWeight:'bold',
                                    marginTop:10,
                                    width:'50%',
                                    fontFamily:'sans-serif-medium',
                                    textAlign:'center',
                                    fontSize:30,
                                    }}>{this.state.city.name}</Text>
                                <Image  style={styles.avionPNG} source={require("../assets/img/avionH1CitiesR.png")} />
                            </View>
                            <Text style={styles.subtitle}>¡Here is some of our Itineraries!</Text>
                            <View style={{backgroundColor:'black'}}>
                                    { this.props.itineraries !== null &&  this.props.itineraries.length !== 0
                                    ? this.props.itineraries.map((itinerary, index) =>{
                                        return <Itineraries  key= {index} itinerary ={itinerary} props= {this.props.navigation}/>                                
                                        })
                                    :   <View style={styles.divNotFounded}>
                                            <ImageBackground style={styles.noItinerariesFounded} source={require('../assets/img/itineraryBackground.jpg')}> 
                                                <Text style={styles.notFoundedTittle}>We don't have any itineraries here right now</Text>
                                                <Text style={styles.notFoundedSubTittle}>Try another city!</Text> 
                                            </ImageBackground>
                                        </View>
                                    }  
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'black', width:'100%'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} >
                                    <Text  style={styles.button}>Back to Home</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Cities")} >
                                    <Text  style={styles.button}>Back to Cities</Text>
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
        city: state.cityReducer.city,
        itineraries: state.itineraryReducer.itineraries,
        success: state.cityReducer.success
    }
}

const mapDispatchToProps = {
    fetchCities: citiesActions.fetchCities,
    fetchSingleCity: citiesActions.fetchSingleCity,
    loadItineraries: itinerariesActions.loadItineraries,
    cleanItineraries: itinerariesActions.cleanItineraries,
}

export default connect(mapStateToProps, mapDispatchToProps)(CityItineraries)


const styles = StyleSheet.create({
    image:{
        width:20
    },
    hero:{
        width:"100%",
        height:200, 
    },
    avionPNG:{
        width:"20%",
        height:40,
    },
    safeArea:{
        flex: 1,
        backgroundColor: '#e2ceb5',
        height:'100%'
    },  
    subtitle:{
        marginBottom:30,
        textAlign:'center',
        marginTop:20,
        fontSize:25,
        fontWeight:'bold',
        color:'#212529'
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
        marginTop:30,
        marginBottom:10,
        marginHorizontal:10,
        justifyContent:'center',   
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,    
    },
    noItinerariesFounded:{
        width:'100%',
        height:'100%',
        marginLeft:0,
        alignSelf:'center',
        justifyContent:'center',
    },
    notFoundedTittle:{
        fontWeight:'bold',
        top:"0%",
        fontSize: 18,
        zIndex:20,
        textAlign:'center',
        width:'100%', 
        backgroundColor:'rgba(0, 0, 0, 0.650)', 
        color:'#e2ceb5',
        shadowColor: "white",
        paddingVertical:10
    },
    notFoundedSubTittle:{
        top:"0%",
        fontSize: 16,
        zIndex:20,
        textAlign:'center',
        width:'100%', 
        backgroundColor:'rgba(0, 0, 0, 0.650)', 
        color:'#e2ceb5',
        shadowColor: "white",
        paddingBottom:10
    },
    divNotFounded:{
        width:'95%',
        height:150,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 500,
        overflow:'hidden',
        marginLeft:10, 
        marginTop:60,
        marginBottom:'50%'
    },
    backIcon:{
        width: 45,
        height:45,
        top:'8%',
        left:'3%',
        zIndex:3,
        borderWidth:3, 
        borderRadius:30, 
        overflow:'hidden', 
        alignItems:'center', 
        justifyContent:'center',
        backgroundColor:'#e2ceb5',
    }


})