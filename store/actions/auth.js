import * as actionTypes from './actionTypes'
import api from '../../helpers/axios'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'

const authStart = () => ({
  type: actionTypes.AUTH_START
})

const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: authData
})

export const authFailed = (errMsg) => ({
  type: actionTypes.AUTH_FAILED,
  payload: errMsg
})

export const authReset = () => ({
  type: actionTypes.AUTH_RESET
})

export const userLogin = ({ email, password }) => {
  return dispatch => {
    dispatch(authStart())
    api.post('user/login', {
      email: email,
      password: password
    })
    .then(response => {

      const userCookie = Cookies.get('payload_cookie')
      const userPayload = jwt.decode(userCookie)

      if (userPayload && response.data.statusCode === 200) {
        dispatch(authSuccess(userPayload))
      } else {
        const errMsg = `You couldn't be loged in, please try again.`
        dispatch(authFailed(errMsg))
      }
    })
    .catch(err => {
      const statusCode = err.response.status
      let errMsg = ''
      switch (statusCode) {
        case 404:
          errMsg = `User with that email doesn't exist.`
          break
        case 422:
          errMsg = `Wrong email or password.`
          break
        default: 
          errMsg = `You couldn't be loged in, please try again.`    
      }
      dispatch(authFailed(errMsg))
    })
  }
}

export const userLogOut = () => {
  Cookies.remove('payload_cookie', {domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.janusmarcin.pl'})
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const onAuthStateChange = (cookie) => {
  return async dispatch => {
    await api({
      method: 'post',
      url: 'user/auth',
      headers: {
        'cookie': cookie
      }
    })
    .then(user => dispatch(authSuccess(user.data)))
    .catch(err => console.log(err))
  }
}