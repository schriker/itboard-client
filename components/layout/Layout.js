import Meta from './Meta'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = (props) => {
  return (
    <div className='main-wrapper'>
      <Meta { ...props.meta } />
      <Header />
      { props.withSidebar ? <Sidebar /> : null }
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
      `}</style>
    </div>
  )
}

Layout.getInitialProps = async ({ req }) => {
    console.log(req.cookies)
    return {}
}

export default Layout