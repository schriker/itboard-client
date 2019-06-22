const OfferListItem = ({ offer }) => {


  const color = '#e61340' // Grab color form languages helper object
  const isNew = true // Calc if is older than 24h

  return (
    <div className="item-wrapper">
      <a href="#"></a>
      <div className="item-logo">
        <img src="http://startuppoland.org/wp-content/uploads/2017/04/PACKHELP_logo.png" alt="Company Name"/>
      </div>
      <div className="item-company">
        <h3>Ruby Developer</h3>
        <div className="company-location">
          <i className="far fa-building"></i>Packhelp
          <i className="fas fa-map-marker-alt"></i>Kolejowa 5/7, Warszawa 
        </div>
      </div>
      <div>
      <div className="item-info">
        <div className="item-salary">
          7000 - 12000
        </div>
        <div className="item-details">
        <i className="fas fa-chart-line"></i>Regular
        <span>1 day</span>
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