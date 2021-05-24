import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Itineraries from "./Itineraries";
import Loader from "./Loader";


class CityItineraries extends React.Component{

    
    state={
        city: [],
        loading: true,
    }


    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.props.loadItineraries(this.props.route.params.cityId)
        })
        this.props.loadItineraries(this.props.route.params.cityId)
        if (this.props.filteredCities.length !== 0) {        
            this.setState({
                city: this.props.filteredCities.find(city => city._id === this.props.route.params.cityId),
                loading : false
            })             
        } else if (this.props.filteredCities.length === 0) {
            this.props.fetchSingleCity(this.props.route.params.cityId)         
        }               
    }

    componentDidUpdate(){
        if(this.props.city.length !==0 && this.state.city.length ===0 ) {
            this.setState({
                city: this.props.city, loading: false
            })
        }else if (this.props.filteredCities.length === 0 && !this.props.success) {
            this.props.navigation.navigate("Home")  
        }
    }  
    
    render(){    

        if (this.state.loading) {
            return(
                <Loader />
            )
        }

        return (   
        <SafeAreaView style={styles.safeArea}>
            <ScrollView >
                <Image style={styles.logo} source={require('../assets/img/LOGO.png')}></Image> 
                <Image style={styles.hero} source={{uri: this.state.city.img}}/>
                <View >
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:'100%', height:'auto'}}>
                        <Image  style={styles.avionPNG} source={require("../assets/img/avionH1CitiesL.png")}/>
                        <Text style={{
                            color:'#212529',
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
                            :   <View >
                                    <View source={require('../assets/img/itineraryBackground.jpg')}> 
                                        <Text >We don't have any itineraries here right now</Text>
                                        <Text >Try another city!</Text> 
                                    </View>
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

                                                 
//                             <div className="d-flex justify-content-center ">
//                                 <NavLink className="nav-link btnHomeEnCities " exact to="/">Back to Home</NavLink>
//                                 <NavLink className="nav-link btnHomeEnCities " exact to="/cities">Back to Cities</NavLink>
//                             </div>

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
    loadItineraries: itinerariesActions.loadItineraries
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
    logo:{
        position:'absolute',
        width:100,
        height:80,
        top:0,
        left:'2%',
        zIndex:1000
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
        fontWeight:'bold'
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
        justifyContent:'center',   
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,    
    },


})