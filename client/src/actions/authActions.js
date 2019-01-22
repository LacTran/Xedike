import axios from 'axios';
import jwtDecode from 'jwt-decode';

import * as types from '../constants/actionTypes';

// register
export const registerUser = (newUser, history) => {
    return (dispatch) => {
        axios
            .post('http://localhost:5000/api/users/register', newUser)
            .then(() => history.push('/'))
            .catch(err => {
                dispatch({
                    type: types.GET_ERRORS,
                    payload: err.response.data
                })
            })
    }
}