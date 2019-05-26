import * as actionTypes from './actionTypes'
import api from '../../helpers/axios'

export const userLogin = ({ email, password }) => {
  return dispatch => {
    api.post('user/login', {
      email: email,
      password: password
    })
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }
}