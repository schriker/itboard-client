import * as actionTypes from './actionTypes'
import api from '../../helpers/axios'
import { authFailed } from './index'
import Router from 'next/router'

export const setLanguages = (payload) => {
  Router.push('/page/[page]', '/page/1')
  return {
  type: actionTypes.SET_LANGUAGES,
  payload
  }
}

export const setFilters = (payload) => {
  Router.push('/page/[page]', '/page/1')
  return {
    type: actionTypes.SET_FILTERS,
    payload
  }
}

export const clearFilters = () => {
  Router.push('/page/[page]', '/page/1')
  return {
    type: actionTypes.CLEAR_FILTERS
  }
}

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
          console.log('Server error: ', err)
          dispatch(saveOfferFailed('Server error. Pleas try again later.'))
        }
      })
  }
}

const fethcOffersSuccess = (offers) => ({
  type: actionTypes.FETCH_OFFERS_SUCCESS,
  offers
})

const fetchOffersFailed = (err) => ({
  type: actionTypes.FETCH_OFFERS_FAILED,
  err
}) 

export const fetchOffers = () => {
  return async dispatch => {
    await api.get('/offer/get')
            .then(response => dispatch(fethcOffersSuccess(response.data.offers)))
            .catch(err => dispatch(fetchOffersFailed(err)))
  }
}