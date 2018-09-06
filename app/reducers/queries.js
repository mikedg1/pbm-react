import {
    UPDATE_QUERY,
    SET_LOCATION_ID,
    UPDATE_COORDINATES,
    SET_SELECTED_MACHINE,
    SET_SELECTED_LOCATION_TYPE,
    SET_SELECTED_NUM_MACHINES,
} from '../actions/types'

export const initialState = {
    currQueryString: '',
    locationId: '', 
    locationName: '',
    curLat: null,
    curLon: null,
    latDelta: null,
    lonDelta: null,
    machineId: null,
    locationType: '',
    numMachines: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_QUERY: 
            return {
                ...state,
                currQueryString: action.payload,
            }
        case SET_LOCATION_ID:
            return {
                ...state,
                currQueryString: '', 
                locationId: action.id,
                locationName: action.name,
            }
        case UPDATE_COORDINATES: 
            return {
                ...state,
                curLat: action.lat,
                curLon: action.lon,
                latDelta: action.latDelta,
                lonDelta: action.lonDelta,
            }
        case SET_SELECTED_MACHINE: 
            return {
                ...state, 
                machineId: action.machineId
            }
        case SET_SELECTED_LOCATION_TYPE:
            return {
                ...state,
                locationType: action.locationType,
            }
        case SET_SELECTED_NUM_MACHINES:
            return {
                ...state,
                numMachines: action.num,
            }
        default:
            return state
    }
}