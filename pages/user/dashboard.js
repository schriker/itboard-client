import React from 'react'
import Layout from '../../components/layout/Layout'
import Protect from '../protect'
import api from '../../helpers/axios'

class Dashboard extends React.Component {

  static async getInitialProps({ req }) {
    try {
      const isServer = typeof window === 'undefined'
      let response = null

      if (isServer && req.cookies.session_cookie && req.cookies.payload_cookie) {
        response = await api.get('dashboard/offers', {
          headers: {
            'cookie': req.headers.cookie
          }
        })
      } else {
        response = await api.get('dashboard/offers')
      }
      
      return {
        offers: response.data.offers
      }
    } catch (error) {
      return {
        error: error.response.data
      }
    }
  }

  render() {
    const layoutSetings = {
      meta: {
      },
      withSidebar: true
    }
    return(
      <Layout { ...layoutSetings }>
        Test
      </Layout>
    )
  }
}

export default Protect(Dashboard)