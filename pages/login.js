import Layout from '../components/layout/Layout'
import Logo from '../components/header/Logo'
import LoginForm from '../components/loginForm/LoginForm'
import Index from '../pages/index'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const Login = ({ auth }) => {

  useEffect(() => {
    if (auth.user) {
      const prevUrl = Cookies.get('previous_url')
      if (prevUrl && prevUrl !== `${window.location.origin}/login`) {
        Router.push(prevUrl)
      } else {
        Router.push('/')
      }
    }
  }, [auth.user])

  const layoutSettings = {
    meta: {
    },
    withSidebar: false
  }

  let loginForm = 
    <Layout {...layoutSettings}>
      <Logo black />
      <LoginForm />
    </Layout>

  if (auth.user) {
    loginForm = <Index />
  }

  return (
      loginForm
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Login)