import { connect } from 'react-redux'
import OfferListItem from '../offersList/OfferListItem'
import OfferContent from '../offer/OfferContent'

const PreviewForm = ({ offer }) => {
  return (
    <div className="fullpage-wrapper">
      <OfferListItem offer={offer} preview />
      <OfferContent offer={offer} preview />
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
  offer: state.offers.newOffer
})

export default connect(mapStateToProps)(PreviewForm)