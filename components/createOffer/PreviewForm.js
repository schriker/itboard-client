import { connect } from 'react-redux'
import OfferListItem from '../../components/offersList/OfferListItem'

const PreviewForm = ({ offer }) => {
  return (
    <div className="white-box wrapper white-box--content">
      <OfferListItem offer={offer} preview />
      <style jsx>{`
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