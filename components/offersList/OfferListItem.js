import useFileReader from '../../hooks/useFileReader'
import findColor from '../../helpers/findColor'
import Link from 'next/link'

const OfferListItem = ({ offer, preview }) => {

  let thumb = null
  
  const color = findColor(offer.technology)
  const isNew = preview ? true : false // Calc if is older than 24h 
  const thumbURL = process.env.NODE_ENV === 'development' ? `http://localhost:8080/images/companies_logos/thumb/${offer.company_logo_thumb}` : `http://itboardapi.janusmarcin.pl/images/companies_logos/thumb/${offer.company_logo_thumb}`
  const offerURl = preview ? '#' : `/offer?id=${offer._id}`
  
  preview ? thumb = useFileReader(offer.company_logo) : thumb = thumbURL

  return (
    <div className="item-wrapper">
      <Link href={offerURl}><a></a></Link> 
      <div className="item-logo">
        <img src={thumb} alt={offer.company_name}/>
      </div>
      <div className="item-company">
        <h3>{offer.position_name}{offer.remote && <span>Remote</span>}</h3>
        <div className="company-location">
          <i className="far fa-building"></i>{offer.company_name}
          <i className="fas fa-map-marker-alt"></i>{offer.location}
        </div>
      </div>
      <div>
      <div className="item-info">
        <div className="item-salary">
          {offer.salary_from} - {offer.salary_to} {offer.salary_currency}
        </div>
        <div className="item-details">
        <i className="fas fa-chart-line"></i>{offer.experience_level}
        <span>{ isNew ? 'New' : 'Day' }</span>
        </div>
      </div>
      </div>
      <style jsx>{`
        .item-wrapper {
          position: relative;
          align-items:center;
          display: flex;
          height: 110px;
          padding: 5px;
          background-color: #f0f1f7;
          border-bottom: 1px solid #cccfdd;
          transition: all .1s ease-in-out;
        }
        .item-wrapper:hover {
          box-shadow: 0px 0px 5px 0px rgba(104,111,151,0.2);
        }
        .item-wrapper a {
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          display: block;
        }
        .item-wrapper i {
          color: #0766ee;
          margin-right: 8px;
        }
        .item-logo {
          height: 100%;
          flex: 0 1 220px;
          display: flex;
          padding: 10px 25px;
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
          font-size: 18px;
          color: #1f1f1f;
          margin-bottom: 12px;
        }
        .company-location i {
          margin-left: 25px;
        }
        .company-location i:first-of-type {
          margin-left: 0;
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
          font-weight: 500;
          padding: 4px 22px;
          border: 2px solid ${isNew ? '#ffe600' : '#959595'};
          background-color: ${isNew ? '#ffe600' : null};
          border-radius: 18px;
          margin-left: 20px;
        }
      `}</style>
    </div>
  )
}

export default OfferListItem