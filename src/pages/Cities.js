import axios from "axios"
import React from "react"
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import Loader from "../components/Loader"
import citiesActions from "../redux/actions/citiesActions"
import itinerariesActions from "../redux/actions/itinerariesActions"


class Cities extends React.Component{

    state={
        filteredCities:[]
    }



    componentDidMount =async() =>{  
        const respuesta = await axios.get(`https://mytinerary-dalessio.herokuapp.com/api/cities`)
        console.log(respuesta)
        respuesta && this.setState({filteredCities : respuesta})
        // this.toTop()
        // this.props.fetchCities(this.props.history)   
        // this.props.cleanItineraries() 
        // this.setState({filteredCities: this.props.filteredCities})
    }
    
    // componentDidUpdate(prevProps){
    //     if (prevProps.filteredCities.length === 0 && this.props.filteredCities.length !==0) {
    //         this.setState({filteredCities: this.props.filteredCities})
    //     } 
    // }

    render() {
        

        if (this.state.filteredCities.length === 0) {
            return(
                <Loader />
            )
        } else{
            let image = require('../assets/carousel/Baku.jpg')
        }
        
        return(
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
                        {/* <TextInput placeholder="Search a City" className="finder" type='text'  onChange={(e) => this.props.findCity(e.target.value)}/> */}
                        <TextInput 
                            placeholder="Search a City"
                            placeholderTextColor = 'black'
                            keyboardType = 'numeric'
                            color = 'white'
                            style = {styles.input}
                            onChangeText={(e) => leerInput(e, 'edad')}
                        />
                    </View>
                    <View >
                        {this.state.filteredCities.length >0 
                            ? this.state.filteredCities.map(city =>{
                            return <View key={city._id} to={`/city/${city._id}`}> 
                                        {/* <ImageBackground style={styles.image} source={image}>  */}
                                            <Text >{city.name} - {city.country}</Text> 
                                        {/* </ImageBackground> */}
                                    </View>
                            }) : 
                            <ImageBackground style={styles.notFounded} source={require('../assets/img/mapa.jpg')}> 
                                <Text style={styles.notFoundedTittle}>Oh no! Looks like that city doesn't exist here yet... </Text>
                                    <Text style={styles.notFoundedSubTittle}>Try another one!</Text>                                 
                            </ImageBackground>
                            }
                        <Text style={styles.button}>Back to Home</Text>
                    </View>
                </View>
            </ScrollView>        
        )
    }
}
// const mapStateToProps = state => {
//     return {
//         filteredCities: state.cityReducer.filteredCities
//     }
// }

// const mapDispatchToProps = {
//     fetchCities: citiesActions.fetchCities,
//     findCity: citiesActions.findCity,
//     cleanItineraries: itinerariesActions.cleanItineraries
// }


export default Cities

const styles = StyleSheet.create({
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
        color:'#e2ceb5',
        backgroundColor:'black',
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

