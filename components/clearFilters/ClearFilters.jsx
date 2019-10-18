import posed, { PoseGroup } from 'react-pose'

const ClearBox = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 150
    },
    applyAtStart: { 
      position: 'fixed',
      left: 'calc(50% - 80px)'
    }
  },
  exit: {
    y: 60,
    opacity: 0,
    transition: {
      duration: 150
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
            box-shadow: 0px 0px 5px 0px rgba(104,111,151,0.5);
            border-radius: 25px;
            padding: 5px;
            z-index: 3;
            color: #eeeff6;
            position: fixed;
            background-color: #095beb;
            width: 160px;
            bottom: 60px;
            transition: all ease .2s;
          }
          .clearfilter i {
            color: #eeeff6;
            font-size: 10px;
            margin-right: 5px;
          }
          .clearfilter:hover {
            cursor: pointer;
            box-shadow: 0px 0px 15px 0px rgba(104,111,151,.5);
          }
          .clearfilter > div {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px 10px;
            transition: all ease-in-out .1s;
          }
          .clearfilter span {
            margin-left: 5px;
            color: #eeeff6;
            font-weight: 500;
          }
        `}</style>
    </ClearBox> : null}
    </PoseGroup>
  )
}

export default ClearFilters