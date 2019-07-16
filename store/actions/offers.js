import * as actionTypes from './actionTypes'
import api from '../../helpers/axios'
import { authFailed } from './index'

export const setLanguages = (payload) => ({
  type: actionTypes.SET_LANGUAGES,
  payload
})

export const newOfferDetials = (payload) => ({
  type: actionTypes.NEW_OFFER_DETAILS,
  payload
})

export const newOfferContent = (payload, raw) => ({
  type: actionTypes.NEW_OFFER_CONTENT,
  payload,
  raw
})

const saveOfferStart = () => ({
  type: actionTypes.OFFER_SAVE_START
})

const saveOfferFailed = (err) => ({
  type: actionTypes.OFFER_SAVE_FAILED,
  err
})

const saveOfferSuccess = () => ({
  type: actionTypes.OFFER_SAVE_SUCCESS
})

export const saveOfferClearError = () => ({
  type: actionTypes.OFFER_SAVE_CLEAR_ERROR
})

export const saveOfferReset = () => ({
  type: actionTypes.OFFER_SAVE_RESET
})

export const saveOffer = (payload) => {
  return dispatch => {
    dispatch(saveOfferStart())
    api.post('/offer/create', payload)
      .then(() => dispatch(saveOfferSuccess()))
      .catch((err) =>  {
        if (err.response.status === 401) {
          dispatch(authFailed('User session timed out. Please login.'))
        } else {
          console.log('Server error: ', err.response)
          dispatch(saveOfferFailed('Server error. Pleas try again later.'))
        }
      })
  }
}

// const setTitle = (payload) => ({
//   type: actionTypes.SET_TITLE,
//   payload
// })

// export const fetchTitle = () => {
//   return async dispatch => {
//     await axios.get('https://jsonplaceholder.typicode.com/todos/1')
//             .then(res => {
//               console.log(res.data.title)
//               dispatch(setTitle(res.data.title))
//             })
//             .catch(err => console.log(err))
//   }
// }