const DashboardBox = ({ title, text }) => {
  return (
    <div className="item-wrapper">
      <div className="title">{title}</div>
      <div className="text">{text}</div>
      <style jsx>{`
        .item-wrapper {
          display: flex;
          flex-direction: column;
          background-color: #fff;
          border-bottom: 1px solid #cccfdd;
          border-right: 1px solid #cccfdd;
          margin-bottom: 10px;
          height: 200px;
        }
        .title {
          position: absolute;
          padding: 10px 15px;
          color: #6c6c6c;
        }
        .text {
          flex: 1 1 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          font-weight: 700;
          text-align: center;
          font-size: 38px;
        }
        `}</style>
    </div>
  )
}

export default DashboardBox
