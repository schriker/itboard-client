import TextEditor from '../textEditor/TextEditor'
import { newOfferContent } from '../../store/actions/index'
import { connect } from 'react-redux' 

const ContentForm = ({ submitOffer, newOfferContent }) => {

  const onSubmit = (content) => {
    newOfferContent(content)
    submitOffer()
  }

  return (
    <TextEditor onSubmit={onSubmit} />
  )
}

const mapDispatchToProps = (dispatch) => ({
  newOfferContent: (content) => dispatch(newOfferContent(content)) 
})

export default connect(null, mapDispatchToProps)(ContentForm)