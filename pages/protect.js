import React from 'react'
import Login from './user/login'
import { connect } from 'react-redux'

const Protect = (Page) => {
  return connect(mapStateToProps)(class ProtectedPage extends React.Component {
    static async getInitialProps (ctx) {
      const pageProps = Page.getInitialProps && await Page.getInitialProps(ctx)
      return {
        ...pageProps
      }
    }

    render() {
      let pageContent = <Page {...this.props} />
      if (!this.props.auth.user) {
        pageContent = <Login />
      }
      return pageContent
    }
  })
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default Protect