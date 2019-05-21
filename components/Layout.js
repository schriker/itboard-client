import Meta from './Meta'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = (props) => {
  return (
    <div>
      <Meta />
      <Header />
      <Sidebar />
      <main>
        {props.children}
      </main>
    </div>
  )
}

export default Layout