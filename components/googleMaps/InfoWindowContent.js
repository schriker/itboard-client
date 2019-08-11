import Router from 'next/router'

const InfoWindowContent = ({ offer }) => {
  const thumbURL = process.env.NODE_ENV === 'development' ? `http://localhost:8080/images/companies_logos/thumb/${offer.company_logo_thumb}` : `http://itboardapi.janusmarcin.pl/images/companies_logos/thumb/${offer.company_logo_thumb}`

  return (
    <div onClick={() => Router.push(`/offer?id=${offer._id}`)} id="infowindow" className="map-info-window">
      <div className="map-info-window__logo">
        <img src={thumbURL} alt={offer.company_name} />
      </div>
      <div className="map-info-window__content">
        <h4>{offer.position_name}</h4>
        <span>{offer.salary_from} - {offer.salary_to} {offer.salary_currency}</span>
        {offer.company_name}
      </div>
      <style jsx>{`
        .map-info-window {
          display: flex;
          padding: 0 10px;
          height: 80px;
          border-bottom: 1px solid #d9d9d9;
        }
        .map-info-window:hover {
          cursor: pointer;
          background-color: #f3f4f8;
        }
        .map-info-window__logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          padding: 15px 0; 
          height: 100%;
       
        }
        .map-info-window__logo img {
          max-height: 100%;
          width: auto;
          height: auto;
          max-width: 100%;
        }
        .map-info-window__content {
          margin-left: 15px;
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          justify-content: center;
        }
        .map-info-window__content span {
          color: #2669e6;
          margin: 3px 0;
          font-weight: 500;
        }
        `}</style>
    </div>
  )
}

export default InfoWindowContent