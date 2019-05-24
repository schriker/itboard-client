import Meta from './Meta'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = (props) => {
  return (
    <div className='wrapper'>
      <Meta { ...props.meta } />
      <Header />
      { props.withSidebar ? <Sidebar /> : null }
      <main>
        {props.children}
      </main>
      <style  jsx>{`
        .wrapper {
          display: grid;
          min-height: 100vh;
          grid-template-areas: "header header"
          "sidebar main";
          grid-template-columns: 280px 1fr;
          grid-template-rows: 70px auto;
        }  
        main {
          width: 100%;
          grid-area: main;
        }
      `}</style>
    </div>
  )
}

export default Layout