import * as types from '../constants/actionTypes';
import _ from 'lodash';

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
                isAuthenticated: !_.isEmpty(action.payload)
            }

        default:
            return state
    }
}

