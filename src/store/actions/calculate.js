import { SET_LOCATION_TYPE, SET_INSURANNCE_PROVIDER, SET_INSURANNCE_PLAN, SET_PROCEDURE, SET_ZIPCODE, SET_STEP, SET_RADIUS, SET_LAT_LON } from '../types';

export const setInsuranceProvider = data => {
    return {
        type: SET_INSURANNCE_PROVIDER,
        payload: data
    }
}

export const setInsurancePlan = data => {
    return {
        type: SET_INSURANNCE_PLAN,
        payload: data
    }
}

export const setProcedure = data => {
    return {
        type: SET_PROCEDURE,
        payload: data
    }
}

export const setZipCode = data => {
    return {
        type: SET_ZIPCODE,
        payload: data
    }
}

export const setRadius = data => {
    return {
        type: SET_RADIUS,
        payload: data
    }
}

export const setLatLon = data => {
    return {
        type: SET_LAT_LON,
        payload: data
    }
}

export const setLocationType = data => {
    return {
        type: SET_LOCATION_TYPE,
        payload: data
    }
}

export const setStep = data => {
    return {
        type: SET_STEP,
        payload: data
    }
}