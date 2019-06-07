import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as types from '../constants/actionTypes';
import setAuthToken from '../util/setAuthToken';

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

//login
export const login = (user) => {
    return (dispatch) => {
        //goi service
        axios
            .post('http://localhost:5000/api/users/login', user)
            .then(res => {
                //lay token
                const { token } = res.data
                // console.log(token)
                //jwt => localStorage
                localStorage.setItem('token', token);

                // decode token
                const decoded = jwtDecode(token);

                //set header jwt => cho nhung lan call api
                setAuthToken(token)
                // console.log(token)
                // state(user) can thay doi thong tin

                dispatch(setCurrentUser(decoded))
            })
            .catch(err => {
                // console.log(err)
                dispatch({
                    type: types.GET_ERRORS,
                    payload: err.response.data
                })
            })

    }
}

export const setCurrentUser = (decoded) => {
    return {
        type: types.SET_CURRENT_USER,
        payload: decoded
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        setAuthToken(false);
        dispatch(setAuthToken({}));
    }
}