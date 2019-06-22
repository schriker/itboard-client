import OfferListItem from '../../components/offersList/OfferListItem'

const PreviewForm = ({ editOffer }) => {
  return (
    <div className="white-box wrapper white-box--content">
      <OfferListItem />
      <style jsx>{`
        h2 {
          margin: 15px 0;
        }
        `}</style>
    </div>
  )
}

export default PreviewForm