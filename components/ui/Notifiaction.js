import { useEffect } from 'react'
import posed, { PoseGroup } from 'react-pose'
// Other animation library: React Spring

const Box = posed.div({
  enter: {
    x: '0%',
    transition: {
      duration: 300
    },
    applyAtStart: { 
      position: 'fixed'
    }
  },
  exit: {
    x: 'calc(-100% - 30px)', 
    transition: { 
      duration: 300
    }
  }
})

const Notification = ({ open, close, type, children }) => {

  useEffect(() => {
    const hideTimeout = setTimeout(() => close(), 10000)
    return () => clearTimeout(hideTimeout)
  }, [open])

  return (
    <PoseGroup animateOnMount>
      {open ? 
        <Box key="box" className={`box white-box notification ${type}`}>
            <i onClick={close} className="fas fa-times-circle"></i>
            {children}
          <style jsx global>{`
            .box {
              position fixed;
              bottom: 30px;
              left: 30px;
              padding: 30px 60px;
            }
            .box p {
              white-space: nowrap;
            }
            .box i {
              position: absolute;
              top: 15px;
              right: 15px;
            }
            .box i:hover {
              cursor: pointer;
            }
            .success {
              color: #10b63b;
              background-color: #f3fff6;
              border-left: #10b63b 4px solid;
            }
            .success p {
              color: #10b63b;
            }
            .info {
              border-left: #0069ff 4px solid;
            }
            .error {
              color: #dd0505;
              background-color: #fff8f8;
              border-left: #dd0505 4px solid;
            }
            .error p {
              color: #dd0505;
            }
            @media (max-width: 550px) {
              .box {
                left: 0;
                padding: 20px;
              }
            }
            `}</style>
        </Box> : null}
    </PoseGroup>
  )
}

export default Notification