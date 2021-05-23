import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    userLogged:null,
    countries: []
}

const citiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_COUNTRIES':
            return {
                ...state,
                countries: action.payload          
            }
        case 'LOG_USER':
            const saveInStorage= async () => {
               await AsyncStorage.setItem("userLogged", JSON.stringify({firstName: action.payload.firstName, img: action.payload.img}))
               await AsyncStorage.setItem('token', action.payload.token)
            }
            saveInStorage()
            
            return {
                ...state,
                userLogged: action.payload         
            }
        case 'LOG_OUT':
            AsyncStorage.clear()
            return {
                ...state,
                userLogged: null        
            }              
        default:
            return state
    }
}

export default citiesReducer