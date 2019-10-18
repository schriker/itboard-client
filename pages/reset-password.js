import React from 'react'
import api from '../helpers/axios'
import Layout from '../components/layout/Layout'
import Logo from '../components/header/Logo'
import Notification from '../components/ui/Notifiaction'

class ResetPassword extends React.Component {
  static async getInitialProps({ query }) {
    console.log(query)
    // return (
    //   api.post('user/verify', {
    //     token: query.token
    //   })
    //   .then(res => {
    //     return {
    //       response: res.data
    //     } 
    //   })
    //   .catch(err => {
    //     return {
    //       response: err.response.data
    //     }
    //   })
    // )
  }

  render() {
    const layoutSetings = {
      meta: {
      },
      withSidebar: false
    }
    return (
      <Layout {...layoutSetings}>
        Test
      </Layout>
    )
  }
}

export default ResetPassword