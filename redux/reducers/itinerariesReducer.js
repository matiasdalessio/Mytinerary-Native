const initialState = {
    itineraries:null,
}


const citiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_ITINERARIES':
            return {
                ...state,
                itineraries: action.payload.respuesta     
            } 
        case 'CLEAN_ITINERARIES':
            return {
                ...state,
                itineraries: null       
            }          
        default:
            return state
    }
}

export default citiesReducer