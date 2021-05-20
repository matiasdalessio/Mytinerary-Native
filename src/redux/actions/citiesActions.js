import axios from "axios"

const citiesActions = {

    fetchCities: (props) => {
        return (dispatch, getState) => {
            axios.get(`https://mytinerary-dalessio.herokuapp.com/api/cities`)
            .then(response => response.data.success
                ? dispatch({type: 'FETCH_CITIES', payload: response.data})
                : dispatch({type: 'FETCH_CITIES', payload: props.history.push('/error')}))
            .catch(error => props.push('/serverdown')) 
        }
    },
    fetchSingleCity: (id, props) => {
        return (dispatch, getState) => {
            axios.get(`https://mytinerary-dalessio.herokuapp.com/api/city/${id}`)
            .then(response => dispatch({type: 'FETCH_SINGLE_CITY', payload: response.data}))
            .catch(error => props.push('/serverdown')) 
        }
    },
    findCity: (e) => {
        return (dispatch, getState) => {
            dispatch ({type: 'FIND_CITY', payload: e})
        }
    },
}

export default citiesActions