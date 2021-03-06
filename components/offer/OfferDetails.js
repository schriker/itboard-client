import findColor from '../../helpers/findColor'
import dynamic from 'next/dynamic'
const IndexMap = dynamic(
  () => import('../googleMaps/IndexMap'),
  {ssr: false}
)

const OfferDetails = ({ offer, thumb, isEmail }) => {

  const color = findColor(offer.technology)

  return (
    <div className="white-box details">
      <div className="details-header">
        <div className="item-logo">
          <img src={thumb} alt={offer.company_name}/>
        </div>
        <div className="item-company">
          <h3>{offer.position_name}</h3>
        </div>
      </div>
      <div className="details-map">
        <IndexMap small height={200} offers={[offer]} />
      </div>
      <div className="details-list">
        <ul>
          <li><i className="far fa-building"></i>{offer.company_name}</li>
          <li><i className="fas fa-map-marker-alt"></i>{offer.location}</li>
          <li><i className="fas fa-chart-line"></i>{offer.experience_level}</li>
          <li><i className="fas fa-file-alt"></i>{offer.contract_type}</li>
          <li><i className="fas fa-users"></i>Company size: {offer.company_size}</li>
          {offer.remote && <li><i className="fas fa-globe-americas"></i>Remote</li>}
        </ul>
      </div>
      <div className="details-salary">
        <div>
          {offer.salary_from} - {offer.salary_to} {offer.salary_currency}
        </div>
        <a target={!isEmail ? "_blank" : "_self"} className="btn btn--yellow btn--yellow-white" href={isEmail ? '#offer-form' : offer.apply_link}>Apply</a>
      </div>
      <style jsx>{`
      .details-salary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 35px;
          font-size: 18px;
          color: #1f1f1f;
        }
        .details-map {
          height: 201px;
          border-bottom: 1px solid #dadce7;
        }
        .details-list ul {
          list-style: none;
          padding: 30px 35px;
          border-bottom: 1px solid #dadce7;
        }
        .details-list ul li {
          margin-bottom: 20px; 
        }
        .details-list ul li:last-of-type {
          margin-bottom: 0; 
        }
        .details-list ul li i {
          font-size: 16px;
          color: #0766ee;
          margin-right: 8px;
          width: 25px;
        }
        .details-header {
          position: relative;
          z-index: 2;
          display: flex;
          padding: 5px;
          height: 100px;
          align-items: center;
          border-bottom: 1px solid #dadce7;
          box-shadow: 0px 4px 5px 0px rgba(104,111,151,0.15);
        }
        .details-header h3 {
          font-size: 18px;
          color: #1f1f1f;
          font-weight: 400;
        }
        .details {
          position: sticky;
          top: 20px;
          flex: 0 0 425px;
          margin-left: 20px;
        }
        .item-logo {
          min-height: inherit;
          height: 100%;
          flex: 0 1 220px;
          display: flex;
          justify-content: center;
          padding: 10px 25px;
          align-items: center;
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
          text-align: center;
        }
        @media (max-width: 1440px) {
          .details {
            position: initial;
            width: 100%;
            margin: 0 0 20px 0;
          }
          @media (max-width: 550px) {
          .details-salary {
            padding: 15px;
          }
          .details-list ul {
            padding: 15px;
          }
          .item-logo {
            flex: 0 1 150px;
          }
        }
        }
        `}</style>
    </div>
  )
}

export default OfferDetails
