import Layout from '../components/layout/Layout'
import Logo from '../components/header/Logo'
import LoginForm from '../components/loginForm/LoginForm'
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

  let loginForm = <LoginForm />

  if (auth.user) {
    loginForm = "You are logged in. Redirecting..."
  }

  return (
    <Layout {...layoutSettings}>
      <Logo black />
      {loginForm}
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Login)