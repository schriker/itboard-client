import useFileReader from '../../hooks/useFileReader'

const OfferContent = ({ offer, preview }) => {

  let thumb
  preview ? thumb = useFileReader(offer.company_logo) : thumb = offer.company_logo

  return (
    <div className="fullpage-wrapper content-wrapper">
      <div className="white-box white-box--content content">
        <div className="logo">
          <img src={thumb} alt={offer.company_name}/>
        </div>
        <div dangerouslySetInnerHTML={{__html: offer.content}}></div>
      </div>
      <div className="white-box details">Offer details</div>
      <style jsx>{`
        .content-wrapper {
          margin-top: 20px;
          display: flex;
          align-items: start;
        }
        .logo {
          text-align: center;
          padding: 70px 0;
        }
        img {
          width: 220px;
          height: auto;
        }
        .content {
          flex: 1 1 100%;
        }
        .details {
          flex: 0 0 425px;
          margin-left: 20px;
        }
        `}</style>
    </div>
  )
}

export default OfferContent