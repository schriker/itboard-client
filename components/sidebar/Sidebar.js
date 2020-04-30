import React from 'react'
import UserButtons from '../header/UserButtons'

const Sidebar = ({ children, hide, show }) => {

  let xDown = null                                                   
  let yDown = null

  const handleTouchStart = (evt) => {
    const firstTouch = evt.touches[0]                                 
    xDown = firstTouch.clientX                                 
    yDown = firstTouch.clientY                                    
  }                                               

  const handleTouchMove = (evt) => {
      if ( ! xDown || ! yDown ) {
          return
      }

      let xUp = evt.touches[0].clientX                                 
      let yUp = evt.touches[0].clientY

      let xDiff = xDown - xUp
      let yDiff = yDown - yUp

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
          if ( xDiff > 0 ) {
            hide()
          }                      
      } 
      xDown = null
      yDown = null                                           
  }

  return (
      <aside onTouchMove={handleTouchMove} onTouchStart={handleTouchStart}>
        <div className="hide-large">
          <UserButtons />
        </div>
        {children}
        <style jsx>{`
          aside {
            min-height: calc(100vh - 70px); 
            position: relative;
            background-color: #08294f;
            width: 250px;
            color: #fff;
            grid-area: sidebar;
            padding-top: 30px;
            overflow-y: hidden;
            transition: all .2s ease;
          }
          @media (max-width: 1180px) {
            aside {
              overflow-y: auto;
              overflow-x: hidden;
              transform: translateX(${show ? '0px' : '-300px'});
            }
          }
          `}</style>
      </aside>
  )
}

export default Sidebar
