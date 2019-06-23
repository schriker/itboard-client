import useFileReader from '../../hooks/useFileReader'
import { languagesArr } from '../../helpers/languages'

const OfferListItem = ({ offer, preview }) => {

  let thumb
  
  const color = languagesArr.filter(language => language.name.toLowerCase() === offer.technology.toLowerCase())[0].color
  const isNew = preview ? true : false // Calc if is older than 24h 
  
  preview ? thumb = useFileReader(offer.company_logo) : thumb = offer.company_logo

  return (
    <div className="item-wrapper">
      <a href="#"></a>
      <div className="item-logo">
        <img src={thumb} alt={offer.company_name}/>
      </div>
      <div className="item-company">
        <h3>{offer.position_name}</h3>
        <div className="company-location">
          <i className="far fa-building"></i>{offer.company_name}
          <i className="fas fa-map-marker-alt"></i>Kolejowa 5/7, Warszawa 
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
          padding: 0 25px;
          align-items: center;
          border-left: 4px solid ${color};
        }
        .item-logo img {
          width: 100%;
          height: auto;
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