import * as actionTypes from './actionTypes'
import api from '../../helpers/axios'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import Router from 'next/router'

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

const authRegisterSuccess = (email) => {
  Router.push('/verify')
  return {
    email: email,
  type: actionTypes.AUTH_REGISTER_SUCCESS
}}

const authUserNotVerified = (email) => {
  Router.push('/verify')
  return { 
  email: email,
  type: actionTypes.AUTH_USER_NOT_VERIFIED
}}

export const authVerifiedReset = () => ({
  type: actionTypes.AUTH_VERIFIED_RESET
})

export const userRegister = ({ email, password, confirmPassword, captchaToken }) => {
  return dispatch => {
    dispatch(authStart())
    api.post('user/create', {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      captchaToken: captchaToken
    })
    .then(() => {
      dispatch(authRegisterSuccess(email))
    })
    .catch(err => {
      if (err.response.data.detials.msg) {
        dispatch(authFailed(err.response.data.detials.msg))
      } else if (err.response.data.message) {
        dispatch(authFailed(err.response.data.message))
      } else {
        dispatch(authFailed(`You couldn't be loged in, please try again.`))
      }
    })
  }
}

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
      if (statusCode === 401) {
        dispatch(authUserNotVerified(email))
      } else {
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
      }
    })
  }
}

export const userLogOut = () => {
  Cookies.remove('payload_cookie', {domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.jarchiwum.pl'})
  Router.push('/page/[page]', '/page/1')
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