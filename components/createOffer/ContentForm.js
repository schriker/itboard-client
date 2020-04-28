import TextEditor from '../textEditor/TextEditor'
import { newOfferContent } from '../../store/actions/index'
import { connect } from 'react-redux' 

const ContentForm = ({ submitOffer, newOfferContent, offer }) => {

  const onSubmit = (content, raw) => {
    newOfferContent(content, raw)
    submitOffer()
  }

  return (
    <TextEditor onSubmit={onSubmit} raw={offer.raw} />
  )
}

const mapStateToProps = (state) => ({
  offer: state.offers.newOffer
})

const mapDispatchToProps = (dispatch) => ({
  newOfferContent: (content, raw) => dispatch(newOfferContent(content, raw)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentForm)