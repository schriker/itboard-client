import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import * as actions from '../store/actions/index'
import Cookies from 'js-cookie'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    const { reduxStore, req } = ctx
    const isServer = typeof window === 'undefined'

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (!isServer) {
      Cookies.set('previous_url', window.location.href, {path: '/'})
    }

    if (isServer && req.cookies.session_cookie && req.cookies.payload_cookie) {
      await reduxStore.dispatch(actions.onAuthStateChange(req.headers.cookie))
    }

    return { pageProps }
  }
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps}/>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)