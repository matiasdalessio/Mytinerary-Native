import {combineReducers} from "redux";
import citiesReducer from './citiesReducer'
import itinerariesReducer from './itinerariesReducer'
import loginsReducer from './loginReducer'

const mainReducer = combineReducers({
    cityReducer: citiesReducer,
    itineraryReducer: itinerariesReducer,
    loginReducer: loginsReducer
})

export default mainReducer