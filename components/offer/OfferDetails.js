import findColor from '../../helpers/findColor'

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
        }
        .details-header {
          display: flex;
          padding: 5px;
          height: 110px;
          align-items: center;
          border-bottom: 1px solid #dadce7;
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
        `}</style>
    </div>
  )
}

export default OfferDetails
