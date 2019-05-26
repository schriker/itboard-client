import Layout from '../components/layout/Layout'
import Logo from '../components/header/Logo'
import LoginForm from '../components/loginForm/LoginForm'

const Login = () => {

  const layoutSettings = {
    meta: {
    },
    withSidebar: false
  }

  return (
    <Layout {...layoutSettings}>
      <Logo black />
      <LoginForm />
    </Layout>
  )
}

export default Login