import Layout from '../components/layout/Layout'
import Logo from '../components/header/Logo'
import LoginForm from '../components/loginForm/LoginForm'
import Index from '../pages/index'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

const Login = ({ auth }) => {

  const prevUrl = Cookies.get('previous_url')

  useEffect(() => {
    if (auth.user) {
      if (prevUrl.includes('verify')) {
        Router.push('/')
      } else if (prevUrl && prevUrl !== `${window.location.origin}/login`) {
        Router.push(prevUrl)
      } else {
        Router.push('/')
      }
    }
  }, [auth.user])

  const [loginMode, setLoginMode] = useState(true)

  const layoutSettings = {
    meta: {
    },
    withSidebar: false
  }

  let loginForm = 
    <Layout {...layoutSettings}>
      <Logo black />
      <LoginForm loginMode={loginMode} setLoginMode={setLoginMode} />
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