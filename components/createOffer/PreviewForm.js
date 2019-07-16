import { useEffect, useState } from 'react'
import { saveOffer, saveOfferClearError } from '../../store/actions/index'
import { connect } from 'react-redux'
import useScrollToTop from '../../hooks/useScrollToTop'
import OfferListItem from '../offersList/OfferListItem'
import OfferContent from '../offer/OfferContent'
import SummaryBar from './SummaryBar'
import Notification from '../ui/Notifiaction'

const PreviewForm = ({ offer, editOffer, saveOffer, submitOffer, clearError }) => {

  useScrollToTop()

  const [withErrors, setWithErrors] = useState(false)

  useEffect(() => {
    if (offer.err) {
      setWithErrors(true)
    } else if (withErrors) {
      setWithErrors(false)
    }
  }, [offer.err])

  useEffect(() => {
    if (offer.saved) {
      submitOffer()
    }
  }, [offer.saved])

  useEffect(() => {
    return () => clearError()
  }, [])

  const submitOfferAction = () => {
    const formData = new FormData()
    for (let key in offer.newOffer) {
      if (key === 'address_components') {
        formData.append(key, JSON.stringify(offer.newOffer[key]))
      } else {
        formData.append(key, offer.newOffer[key])
      }
    }
    saveOffer(formData)
  }

  return (
    <div className="fullpage-wrapper">
    <Notification open={withErrors} type="error" close={() => setWithErrors(false)}>
        <p>Something went wrong :(</p>
        <ul>
          <li>{offer.err}</li>
        </ul>
      </Notification>
      <OfferListItem offer={offer.newOffer} preview />
      <OfferContent offer={offer.newOffer} preview />
      <SummaryBar isSending={offer.isSending} editOffer={editOffer} submitOffer={submitOfferAction} />
      <style jsx>{`
        div {
          padding: 0 20px;
        }
        h2 {
          margin: 15px 0;
        }
        `}</style>
    </div>
  )
}

const mapStateToProps = (state) => ({
  offer: state.offers
})

const mapDispatchToProps = (dispatch) => ({
  saveOffer: (formData) => dispatch(saveOffer(formData)),
  clearError: () => dispatch(saveOfferClearError())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewForm)