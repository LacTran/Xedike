import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as types from '../constants/actionTypes';
import setAuthToken from '../util/setAuthToken';

// register
export const registerUser = (newUser, history) => {
    return (dispatch) => { //return ve 1 callback function voi dispatch la parameter
        axios
            .post('http://localhost:5000/api/users/register', newUser)
            .then(() => history.push('/'))
            .catch(err => { //can 1 state de quan ly error
                // console.log(err.response.data)
                dispatch({
                    type: types.GET_ERRORS,
                    payload: err.response.data
                })
            })
    }
}


// login
export const login = (user) => {
    return (dispatch) => {
        // goi service
        axios
            .post('http://localhost:5000/api/users/login', user)
            .then((res) => {
                // lay token
                const { token } = res.data; //res.data = object voi 2 thuoc tinh = {success:true , token: 'Bearer ' + token} - check login api
                // jwt => localStorage
                localStorage.setItem('token', token);
                // decode jwt(token)
                const decoded = jwtDecode(token);
                // set header jwt => cho nhung lan call API sau: check utils/setAuthToken
                setAuthToken(token);
                // state(user) can thay doi thong tin
                dispatch(setCurrentUser(decoded)) //action that dispatches to reducer
            })
            .catch(err => {
                dispatch({
                    type: types.GET_ERRORS,
                    payload: err.response.data
                })
            })
    }
}

// set current user
export const setCurrentUser = (decoded) => {
    return {
        type: types.SET_CURRENT_USER,
        payload: decoded
    }
}

// logout

export const logout = () => {
    return (dispatch) => {
        // 1. xoa localStorage
        localStorage.removeItem('token')
        // 2. remove token
        setAuthToken(false)
        // 3. set current user = {}
        dispatch(setCurrentUser({}))
    }
}

