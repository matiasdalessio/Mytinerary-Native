import axios from "axios"
import SweetAlert from 'react-native-sweet-alert';

const loginActions = {
    fetchCountries: (props) => {
        return (dispatch, getState) => {
            axios.get(`https://restcountries.eu/rest/v2/all`)
            .then(response => dispatch({type: 'FETCH_COUNTRIES', payload: response.data}))
            // .catch(error => props.push('/serverdown')) 
        }
    },
    logUser: (userInfo) => {
        return async (dispatch, getState) => {
           try {
                const respuesta = await axios.post('https://mytinerary-dalessio.herokuapp.com/api/user/login', userInfo)
                if (!respuesta.data.success) {
                    return respuesta.data
                }
                dispatch({
                    type: "LOG_USER",
                    payload: respuesta.data.respuesta
                    
                })
                return `Welcome back, ${respuesta.data.respuesta.firstName}!`
            }catch(error) {
                // return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            } 
        }
    },
    newUser: (userInfo) => {
        return async (dispatch, getState) => {
           try {
                const respuesta = await axios.post('https://mytinerary-dalessio.herokuapp.com/api/user/signup', userInfo)
                if (!respuesta.data.success) {
                    return respuesta.data.error
                }
                dispatch({
                    type: "LOG_USER",
                    payload: respuesta.data.respuesta
                    
                })
                return `Welcome ${respuesta.data.respuesta.firstName}!`               
            }catch(error) {
                // return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            } 
        }
    },
    forcedLoginByLS: (userLS) => {
        return async (dispatch, getState) => {
            try {
                const respuesta = await axios.get('https://mytinerary-dalessio.herokuapp.com/api/user/loginLS', {
                headers: {
                    'Authorization': 'Bearer '+userLS.token
                }
            })
                dispatch({type: 'LOG_USER', payload: {
                    ...respuesta.data.respuesta,
                    token: userLS.token
                }})
            } catch(error) {
                // if (!error.response) {
                //     return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
                // } else if (error.response.status && error.response.status > 399 && error.response.status < 499) {
                //     // swal("Invalid Token", "Please Log in again", "error")
                    dispatch({type: 'LOG_OUT', payload: null})
                // } 
            }           
        }
    },
    removeUserInfo: () => {
        return (dispatch, getState) => {
            dispatch({type: 'LOG_OUT'})
        }
    },
    
}

export default loginActions