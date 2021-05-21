const initialState = {
    filteredCities: [],
    cityiesSpreaded: [],
    city: [],
    success: true
}

const citiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CITIES':
            return {
                ...state,
                filteredCities: action.payload.respuesta,   
                citiesSpreaded: action.payload.respuesta            
            }
        case 'FIND_CITY':
            return {
                ...state,
                filteredCities: state.citiesSpreaded.filter(city => city.name.toLowerCase().indexOf(action.payload.trim().toLowerCase())=== 0 )           
            }
        case 'FETCH_SINGLE_CITY':
            return {
                ...state,
                city: action.payload.respuesta,
                success: action.payload.success            
            }    
        default:
            return state
    }
}

export default citiesReducer