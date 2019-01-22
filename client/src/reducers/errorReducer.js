import * as types from '../constants/actionTypes';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action){
    switch (action.type) {
        case types.GET_ERRORS:
            return action.payload;
    
        default:
            break;
    }
    return state
}