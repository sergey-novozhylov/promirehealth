import { SET_LOCATION_TYPE, SET_INSURANNCE_PROVIDER, SET_INSURANNCE_PLAN, SET_PROCEDURE, SET_ZIPCODE, SET_STEP, SET_RADIUS, SET_LAT_LON } from '../types';

const INSURANCE_PROVIDER = localStorage.getItem('insuranceProvider');
const INSURANCE_PLAN = localStorage.getItem('insurancePlan');
const PROCEDURE = localStorage.getItem('procedure');
const STEP = localStorage.getItem('step');
const LOCATION = localStorage.getItem('location');

const initialState = {
    insuranceProvider: INSURANCE_PROVIDER ? JSON.parse(INSURANCE_PROVIDER) : {},
    insurancePlan: INSURANCE_PLAN ? JSON.parse(INSURANCE_PLAN) : {},
    procedure: PROCEDURE ? JSON.parse(PROCEDURE) : {},
    step: STEP ? JSON.parse(STEP) : 'STEP',
    location: LOCATION ? JSON.parse(LOCATION) : { zipCode: null, radius: 50, lon: null, lat: null, locationType: null},
}

const updateValue = ({key,value,state}) => {
    localStorage.setItem(key,JSON.stringify(value));
    return {
        ...state,
        [`${key}`]: value
    }
}

export const calculateReducer =  ( state=initialState, action) => {
    switch (action.type) {
        case SET_INSURANNCE_PROVIDER:
            return updateValue( { key: 'insuranceProvider', value: action.payload, state } )
        case SET_INSURANNCE_PLAN:
            return updateValue( { key: 'insurancePlan', value: action.payload, state } )
        case SET_PROCEDURE:
            return updateValue( { key: 'procedure', value: action.payload, state } )
        case SET_ZIPCODE: {            
            return updateValue( { key: 'location', value: {...state.location, zipCode: action.payload}, state } )
        }
        case SET_RADIUS: {            
            return updateValue( { key: 'location', value: {...state.location, radius: action.payload}, state } )
        }        
        case SET_LAT_LON: {
            return updateValue( { key: 'location', value: {...state.location, lat: action.payload.lat, lon: action.payload.lon }, state } )
        }
        case SET_STEP: {
            return updateValue( { key: 'step', value: action.payload, state } )
        }
        case SET_LOCATION_TYPE: {
            return updateValue( { key: 'location', value: {...state.location, locationType: action.payload }, state } )
        }
        default:
            return state            
    }
}