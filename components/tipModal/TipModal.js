import {useState} from 'react'
import posed, { PoseGroup } from 'react-pose'

const TipBox = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 200,
      delay: 3000
    },
    applyAtStart: {
      display: 'block'
    }
  },
  exit: {
    x: 50,
    opacity: 0,    
    transition: {
      duration: 200
    }
  }
})

const TipModal = ({ children, clickHandler }) => {

  const [open, setOpen] = useState(true)

  const onClickHandler = () => {
    clickHandler()
    setOpen(false)
  }

  return (
    <PoseGroup animateOnMount={true}>
      {open &&      
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
            top: calc(-45px + 50%);
            font-size: 14px;
            color: #7f818b;
          }
          .tipmodal > div:first-of-type {
            display: flex;
            padding: 15px;
            flex-direction: column;
            background-color: #f0f1f6;
            white-space: nowrap;
          }
          .tipmodal div a {
            font-size: 18px;
            margin: 10px 0 0 0;
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
      </TipBox>}
    </PoseGroup>
  )
}

export default TipModal