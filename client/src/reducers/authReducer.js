import * as types from '../constants/actionTypes';
import _ from 'lodash'; //npm i lodash --save

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                // isAuthenticated: Object.keys(action.payload).length > 0 ? true : false // or use lodash to validate empty object
                isAuthenticated: !_.isEmpty(action.payload)
            }
        default:
            return state;
    }

} 