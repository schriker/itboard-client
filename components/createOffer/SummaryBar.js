const SummaryBar = ({ editOffer, submitOffer, isSending }) => {
  return (
    <div className="bar">
      <p className="hide-tablet">This is preview of your offer. You can save it or edit.</p>
      <div>
        {!isSending && <button onClick={() => editOffer()} className="btn btn--blue">Edit</button>}
        <button disabled={isSending} onClick={() => submitOffer()} className="btn btn--yellow">{isSending ? "Wait" : "Save"}</button>
      </div>
      <style jsx>{`
        .bar {
          left: 0;
          bottom: 0;
          color: #fff;
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #1f1f1f;
          padding: 0 50px;
          position: fixed;
          z-index: 4;
          width: 100%;
        }
        p {
          color: #fff;
          font-size: 16px;
          margin: 0;
        }
        button:last-of-type {
          margin-left: 20px;
        }
        button:disabled {
          color: #fff;
          border: 2px solid #fff;
        }
        @media (max-width: 900px) {
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

export default SummaryBar