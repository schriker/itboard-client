import Layout from '../components/layout/Layout'
import Logo from '../components/header/Logo'
import LoginForm from '../components/loginForm/LoginForm'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

const Login = ({ auth }) => {

  const prevUrl = Cookies.get('previous_url')

  const [captchaToken, setCaptchaToken] = useState()
  useEffect(() => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6LeRQb4UAAAAAPNbFLigCEAEA0dcz8Lj1JReAKVb', {action: 'login'})
      .then(token => {
        setCaptchaToken(token)
      })
    })
  }, [])

  useEffect(() => {
    if (auth.user) {
      if (prevUrl.includes('verify') || prevUrl.includes('reset-password')) {
        Router.push('/')
      } else if (prevUrl && prevUrl !== `${window.location.origin}/login`) {
        Router.push(prevUrl.replace(/(^\w+:|^)\/\//, '//'))
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
      <LoginForm captchaToken={captchaToken} loginMode={loginMode} setLoginMode={setLoginMode} />
    </Layout>


  if (auth.user) {
    loginForm =     
    <Layout {...layoutSettings}>
      <Logo black />
        <div className="white-box wrapper">
          You are already loged in.
        </div>
        <style jsx>{`
          .wrapper {
            text-align: center;
            flex: 0 1 750px;
            padding: 60px 80px;
          }
          @media (max-width: 550px) {
            .wrapper {
              padding: 40px;
            }
          }
        `}</style>
    </Layout>
  }

  return (
    loginForm
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Login)