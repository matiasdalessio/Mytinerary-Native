const initialState = {
    itineraries:[],
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
                itineraries: action.payload           
            }          
        default:
            return state
    }
}

export default citiesReducer