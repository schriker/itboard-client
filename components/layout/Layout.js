import { useState, useEffect } from 'react'
import Meta from './Meta'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = (props) => {

  const [viewSidebar, setViewSidebar] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const resizeHandler = () => {
      const width = window.innerWidth
      if (width <= 1180) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    window.addEventListener('resize', resizeHandler)
    resizeHandler()
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return (
    <div className='main-wrapper'>
      <Meta { ...props.meta } />
      <Header toggleSidebar={() => setViewSidebar(!viewSidebar)} open={viewSidebar} />
      { props.withSidebar || isMobile ? <Sidebar show={viewSidebar} hide={() => setViewSidebar(false)}  /> : null }
      <main>
        {props.children}
      </main>
      <style  jsx>{`
        .main-wrapper {
          display: grid;
          grid-template-areas: "header header"
          "sidebar main";
          grid-template-columns: min-content 1fr;
          grid-template-rows: 70px auto;
        }  
        main {
          width: 100%;
          flex-wrap: wrap;
          grid-area: main;
          display: flex;
          justify-content: ${props.withSidebar ? 'start' : 'center'};
          align-items: start;
          padding-bottom: 100px;
        }
        @media (max-width: 550px) {
          main {
            padding: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Layout