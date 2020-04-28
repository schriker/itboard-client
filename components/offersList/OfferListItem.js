import useFileReader from '../../hooks/useFileReader'
import findColor from '../../helpers/findColor'
import Link from 'next/link'
import ReactTooltip from 'react-tooltip'
import TipModal from '../tipModal/TipModal'
import Cookies from 'js-cookie'

const OfferListItem = ({ offer, preview, findOnMap, index, firstVisit }) => {

  let thumb = null
  const todaysDate = new Date()
  const createdAt = new Date(offer.created_at)
  const publishedTime = Math.floor((todaysDate - createdAt) / (1000*60*60*24))
  const color = findColor(offer.technology)
  const isNew = preview || publishedTime < 1 ? true : false 
  const offerURl = preview ? '#' : `/offer/${offer.slug}`
  
  preview ? thumb = useFileReader(offer.company_logo) : thumb = offer.company_logo

  const tipModalClose = () => {
    Cookies.set('visited_before', true, {path: '/'})
  }

  return (
    <div className="item-wrapper">
      <Link href="/offer/[id]" as={offerURl}><a></a></Link>
      <div className="item-logo">
        <img src={thumb} alt={offer.company_name}/>
      </div>
      <div className="item-company">
        <h3>{offer.position_name}{offer.remote && <span>Remote</span>}</h3>
        <div className="company-location">
          <i className="far fa-building hide-tablet"></i><span className="hide-tablet">{offer.company_name}</span>
          {!preview && <a onClick={() => findOnMap({lat: offer.lat, lng: offer.lng})} data-tip="Show on map">
            <i className="fas fa-map-marker-alt"></i>
            <span className="offer-location">{offer.city}</span>
            <ReactTooltip />
          </a>}
          {index === 0 ? <TipModal firstVisit={firstVisit} clickHandler={tipModalClose}>Click on address to show it on map!</TipModal> : null}
        </div>
      </div>
      <div>
        <div className="item-info">
          <div className="item-salary">
            {offer.salary_from} - {offer.salary_to} {offer.salary_currency}
          </div>
          <div className="item-details">
          <i className="fas fa-chart-line"></i>{offer.experience_level}
          <span>{ isNew ? 'New' : `${publishedTime} Day${publishedTime > 1 ? 's' : ''}` }</span>
          </div>
        </div>
      </div>
      <div className="mobile-details">
        <div><i className="fas fa-chart-line"></i>{offer.experience_level}</div>
        <div>{offer.salary_from} - {offer.salary_to} {offer.salary_currency}</div>
      </div>
      <style jsx>{`
        .item-wrapper {
          position: relative;
          align-items:center;
          display: flex;
          height: 100px;
          padding: 5px;
          background-color: #fff;
          border-bottom: 1px solid #cccfdd;
          transition: all .1s ease-in-out;
        }
        .item-wrapper:hover {
          box-shadow: 0px 0px 5px 0px rgba(104,111,151,0.2);
          z-index: 1;
        }
        .item-wrapper > a {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          display: block;
          z-index: 1;
        }
        .item-wrapper i {
          color: #0766ee;
          margin-right: 8px;
        }
        .item-logo {
          height: 100%;
          flex: 0 1 180px;
          display: flex;
          padding: 20px 25px;
          align-items: center;
          justify-content: center;
          border-left: 4px solid ${color};
        }
        .item-logo img {
          max-height: 100%;
          width: auto;
          height: auto;
          max-width: 100%;
        }
        .item-company {
          flex: 1 1 auto;
        }
        .item-company h3 {
          font-weight: 400;
          font-size: 20px;
          color: #1f1f1f;
          margin-bottom: 12px;
        }
        .company-location {
          position: relative;
          float: left;
          display: flex;
        }
        .offer-location-mobile {
          display: none;
        }
        .company-location > a {
          margin-left: 20px;
          position: relative;
          cursor: pointer;
          z-index: 2;
        }
        .company-location > a:hover {
          cursor: pointer;
        }
        .item-info {
          margin-right: 20px;
        }
        .item-salary {
          color: #1f1f1f;
          font-size: 18px;
          margin-bottom: 12px;
          text-align: right;
        }
        h3 span {
          display: inline-block;
          color: #949494;
          font-size: 14px;
          font-weight: 400;
          padding: 4px 18px;
          border: 1px solid #949494;
          border-radius: 18px;
          margin-left: 20px;
        }
        .item-details {
          text-align: right;
        }
        .item-details span {
          display: inline-block;
          color: #1f1f1f;
          font-size: 16px;
          font-weight: 400;
          padding: 4px 22px;
          border: 1px solid ${isNew ? '#ffe600' : '#959595'};
          background-color: ${isNew ? '#ffe600' : null};
          border-radius: 18px;
          margin-left: 20px;
        }
        .mobile-details {
          display: none;
        }
        @media (max-width: 900px) {
          .company-location a {
            margin-left: 0;
          }
        }
        @media (max-width: 810px) {
          .item-details span {
            padding: 4px 10px;
          }
        }
        @media (max-width: 720px) {
          .item-wrapper {
            flex-wrap: wrap;
            height: auto;
          }
          .mobile-details {
            display: initial;
            flex: 1 0 100%;
            display: flex;
            padding: 5px 10px;
            margin: 10px 0 0 0;
            color: #949494;
            border-top: 1px solid #cccedd;
            justify-content: space-between;
          }
          .offer-location-mobile {
            display: initial;
          }
          .item-logo {
            height: 100px;
          }
          .item-info {
            display: none;
          }
          .item-company {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .item-company h3 span {
            display: none;
          }
        }
        @media (max-width: 550px) {
          .item-logo {
            flex: 0 1 100px;
            padding: 8px;
          }
        }
      `}</style>
    </div>
  )
}

export default OfferListItem