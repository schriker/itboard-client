import useFileReader from '../../hooks/useFileReader'
import { languagesArr } from '../../helpers/languages'

const OfferContent = ({ offer, preview }) => {

  let thumb
  preview ? thumb = useFileReader(offer.company_logo) : thumb = offer.company_logo
  const color = languagesArr.filter(language => language.name.toLowerCase() === offer.technology.toLowerCase())[0].color

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
      <div className="white-box details">
        <div className="details-header">
          <div className="item-logo">
          <a href={offer.company_website} target="_blank">
            <img src={thumb} alt={offer.company_name}/>
          </a>
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
          <a className="btn btn--yellow btn--yellow-white" href="#">Apply</a>
        </div>
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
          min-height: 110px;
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
        }
        .item-logo {
          min-height: inherit;
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
          text-align: center;
        }
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
          padding-bottom: 40px;
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