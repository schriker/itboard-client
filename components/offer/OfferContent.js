import useFileReader from '../../hooks/useFileReader'
import OfferDetails from './OfferDetails'
import OfferContactForm from './OfferContactForm'
import OfferAgreements from './OfferAgreements'

const OfferContent = ({ offer, preview, isSending, handleApply, apiMessage, type }) => {
  let thumb
  preview ? thumb = useFileReader(offer.company_logo) : thumb = offer.company_logo
  const mailRe = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/)
  const isEmail = mailRe.test(offer.apply_link)

  return (
    <div className="fullpage-wrapper content-wrapper">
      <div className="offer-content">
        <div className="white-box white-box--content content">
          <div className="logo">
            <a href={offer.company_website} target="_blank">
            <img src={thumb} alt={offer.company_name}/>
            </a>
          </div>
          <div dangerouslySetInnerHTML={{__html: offer.content}}></div>
          <OfferAgreements agreements={offer.agreements} />
        </div>
        {isEmail && 
          <div id="offer-form" className="white-box white-box--content content">
            <OfferContactForm apiMessage={apiMessage} type={type} isSending={isSending} handleApply={handleApply} />
          </div>
        }
      </div>
      <OfferDetails isEmail={isEmail} thumb={thumb} offer={offer} />
      <style jsx>{`
        .content-wrapper {
          margin-top: 20px;
          display: flex;
          align-items: start;
        }
        .offer-content {
          flex: 1 1 100%;
          display: flex;
          flex-direction: column;
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
          margin-bottom: 20px;
        }
        `}</style>
    </div>
  )
}

export default OfferContent