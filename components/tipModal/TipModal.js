import {useState} from 'react'
import posed, { PoseGroup } from 'react-pose'
import Cookies from 'js-cookie'

const TipBox = posed.div({
  enter: {  
    x: 0,
    y: '-50%',
    opacity: 1,
    transition: {
      duration: 200,
      delay: 2000
    },
    applyAtStart: {
      display: 'block',
      transform: 'translate(0, -50%)'
    }
  },
  exit: {
    y: '-50%',
    x: 50,
    opacity: 0,    
    transition: {
      duration: 200
    }
  }
})

const TipModal = ({ children, clickHandler, firstVisit }) => {

  const [open, setOpen] = useState(true)

  const onClickHandler = () => {
    clickHandler()
    setOpen(false)
  }

  const clientFirstVisit = Cookies.get('visited_before') || firstVisit

  return (
    <PoseGroup animateOnMount={true}>
      {open && !clientFirstVisit ?       
      <TipBox key="tipBox" className="tipmodal">
        <div>
          {children}
          <a onClick={() => onClickHandler()}>Got it!</a>
        </div>
        <div className="arrow">
          <div></div>
        </div>
        <style jsx global>{`
          .tipmodal {
            position: absolute;
            display: none;
            box-shadow: 0px 0px 15px 0px rgba(104,111,151,0.5);
            background-color: #2669e6;
            z-index: 5;
            padding: 5px;
            border-radius: 5px;
            left: calc(100% + 15px);
            font-size: 14px;
            color: #7f818b;
            top: 50%;
          }
          .tipmodal > div:first-of-type {
            display: flex;
            padding: 15px;
            flex-direction: column;
            background-color: #fff;
            white-space: nowrap;
          }
          .tipmodal div a {
            font-size: 18px;
            margin: 10px 0 0 auto;
            cursor: pointer;
            align-self: end;
          }
          .arrow {
            position: absolute;
            width: 15px;
            overflow: hidden;
            top: 50%;
            left: -15px;
            transform: translate(0, -50%);
          }
          .arrow div {
            background-color: #2669e6;
            box-shadow: 0px 0px 5px 0px rgba(104,111,151,0.2);
            width: 17px;
            height: 17px;
            transform: translate(10px, 0) rotate(45deg);
          }
          `}</style>
      </TipBox> : null}
    </PoseGroup>
  )
}

export default TipModal