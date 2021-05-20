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
            localStorage.setItem("userLogged", JSON.stringify({firstName: action.payload.firstName, img: action.payload.img}))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                userLogged: action.payload         
            }
        case 'LOG_OUT':
            localStorage.clear()
            return {
                ...state,
                userLogged: null        
            }              
        default:
            return state
    }
}

export default citiesReducer