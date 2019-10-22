const NoResult = () => {
  return (
    <div className="noresults">
      No offers matches your critieria :(
        <style jsx>{`
              .noresults {
              color: #a6a9b5;
              text-align: center;
              font-size: 28px;
              padding: 60px 0;
              font-weight: 400;
              margin-top: 20px;
              background-color: #fff;
              border-bottom: 1px solid #cccfdd;
              transition: all .1s ease-in-out;
            }
          `}</style>
    </div>
  )
}

export default NoResult