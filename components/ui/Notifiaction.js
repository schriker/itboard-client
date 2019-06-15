const Notification = ({ close, type, children }) => {

  return (
    <div className={`wrapper white-box notification ${type}`}>
      <i onClick={close} className="fas fa-times-circle"></i>
      {children}
      <style jsx>{`
        .wrapper {
          position: relative;
          padding: 30px 60px;
          position fixed;
          left: 30px;
          bottom: 30px;
          transition: all .2s ease-in-out;
        }
        i {
          position: absolute;
          top: 15px;
          right: 15px;
        }
        i:hover {
          cursor: pointer;
        }
        .success {
          color: #10b63b;
          background-color: #f3fff6;
          border-left: #10b63b 4px solid;
        }
        .info {
          border-left: #0069ff 4px solid;
        }
        .error {
          color: #dd0505;
          background-color: #fff8f8;
          border-left: #dd0505 4px solid;
        }
        `}</style>
    </div>
  )
}

export default Notification