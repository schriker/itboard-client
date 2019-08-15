import posed, { PoseGroup } from 'react-pose'

const ClearBox = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 100
    },
    applyAtStart: { 
      position: 'fixed',
      left: 'calc(50% - 90px)'
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 100
    },
    applyAtEnd: { 
      position: 'fixed'
    }
  }
})

const ClearFilters = ({ filtersNumber, clearFilters }) => {
  return (
    <PoseGroup animateOnMount={true}>
      {!!filtersNumber ? 
      <ClearBox key="clearBox" onClick={clearFilters} className="clearfilter">
        <div>
          <i className="fas fa-times"></i><div>Clear filters:</div><span>{filtersNumber}</span>
        </div>
        <style jsx global>{`
          .clearfilter {
            box-shadow: 0px 0px 5px 0px rgba(104,111,151,0.2);
            border-radius: 25px;
            padding: 5px;
            z-index: 3;
            color: #1f1f1f;
            position: fixed;
            background-color: #f0f1f6;
            width: 180px;
            bottom: 60px;
          }
          .clearfilter i {
            color: #646464;
            font-size: 10px;
            margin-right: 5px;
          }
          .clearfilter:hover {
            cursor: pointer;
            box-shadow: 0px 0px 15px 0px rgba(104,111,151,0.2);
          }
          .clearfilter > div {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #d8d8d8;
            padding:10px 25px;
            border-radius: 25px;
            transition: all ease-in-out .1s;
          }
          .clearfilter:hover > div {
            border: 1px solid #1f1f1f;
          }
          .clearfilter span {
            margin-left: 5px;
            color: #2669e6;
            font-weight: 500;
          }
        `}</style>
    </ClearBox> : null}
    </PoseGroup>
  )
}

export default ClearFilters