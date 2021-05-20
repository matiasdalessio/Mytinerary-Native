import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer"
import Itineraries from "../components/Itineraries"
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import citiesActions from "../redux/actions/citiesActions";
import Loader from "../components/Loader";


class CityItineraries extends React.Component{
    
    state={
        city: [],
        loading: true,
    }

    toTop= () => {window.scroll({
        top:0, 
        left:0,
    })}

    componentDidMount() {
        this.toTop()
        this.props.loadItineraries(this.props.match.params.id, this.props.history)
        if (this.props.filteredCities.length !== 0) {        
            this.setState({
                city: this.props.filteredCities.find(city => city._id === this.props.match.params.id),
                loading : false
            })             
        } else if (this.props.filteredCities.length === 0) {
            this.props.fetchSingleCity(this.props.match.params.id, this.props.history)         
        }               
    }

    componentDidUpdate(){
        if(this.props.city.length !==0 && this.state.city.length ===0 ) {
            this.setState({
                city: this.props.city, loading: false
            })
        }else if (this.props.filteredCities.length === 0 && !this.props.success) {
            this.props.history.push('/')  
        }
    }  
    
    render(){    

        if (this.state.loading) {
            return(
                <Loader />
            )
        }
        const imgcityItinerary= require(`../assets/${this.state.city.img}`)

        return (   
            <div>     
                <Header/>
                <main className="main">
                    <div className="granContenedor">
                        <div id="heroAvion" className= "hero" style={{backgroundImage: `url('${imgcityItinerary.default}')`}}>
                        </div>
                        <div className="tituloCities">
                            <img className="avionH1Cities" src="/img/avionH1CitiesL.png" alt="avion izquierda"/>
                            <div>
                                <h1>{this.state.city.name}</h1>                              
                            </div>
                            <img className="avionH1Cities" src="/img/avionH1CitiesR.png" alt="avion derecha"/>
                        </div>
                        <h2 className="itinerariesSubtitle">¡Here is some of our Itineraries!</h2>
                        <div className="cityBanners">
                            { this.props.itineraries !== null &&  this.props.itineraries.length !== 0
                            ? this.props.itineraries.map((itinerary, index) =>{
                                return <Itineraries  key= {index} itinerary ={itinerary} props= {this.props}/>                                
                                })
                            :   <div className= "cityBanners divErrorBanner notFoundItineraries">
                                    <div className="animate__animated animate__fadeIn  errorBanner" style={{backgroundImage: `url('/img/itineraryBackground.jpg')`}}> 
                                        <h2 className="cityName">We don't have any itineraries here right now</h2>
                                        <h3 className="cityName">Try another city!</h3> 
                                    </div>
                                </div>
                            }                                                   
                            <div className="d-flex justify-content-center ">
                                <NavLink className="nav-link btnHomeEnCities " exact to="/">Back to Home</NavLink>
                                <NavLink className="nav-link btnHomeEnCities " exact to="/cities">Back to Cities</NavLink>
                            </div>
                        </div>
                    </div>                              
                </main>
                <Footer className="footer"/>
            </div>
        )  
    ;}
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