import useFileReader from '../../hooks/useFileReader'
import OfferDetails from './OfferDetails'

const OfferContent = ({ offer, preview }) => {

  let thumb
  preview ? thumb = useFileReader(offer.company_logo) : thumb = offer.company_logo

  return (
    <div className="fullpage-wrapper content-wrapper">
      <div className="white-box white-box--content content">
        <div className="logo">
          <a href={offer.company_website} target="_blank">
          <img src={thumb} alt={offer.company_name}/>
          </a>
        </div>
        <div dangerouslySetInnerHTML={{__html: offer.content}}></div>
      </div>
      <OfferDetails thumb={thumb} offer={offer} />
      <style jsx>{`
        .content-wrapper {
          margin-top: 20px;
          display: flex;
          align-items: start;
        }
        .logo {
          height: 80px;
          text-align: center;
          margin: 50px 0;
        }
        img {
          height: 100%;
        }
        .content {
          flex: 1 1 100%;
          padding-bottom: 40px;
        }
        `}</style>
    </div>
  )
}

export default OfferContent