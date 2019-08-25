import React from 'react'
import Layout from '../components/layout/Layout'
import OfferContent from '../components/offer/OfferContent'
import { withRouter } from 'next/router'
import api from '../helpers/axios'
import NoResult from '../components/ui/NoResult'

class Offer extends React.Component {

  static async getInitialProps ({ query }) {
    try {
      const response = await api.get(`offer/details?_id=${query.id}`)
      console.log('Test1')
      return {
        offer: response.data.offer[0]
      }
    } catch (error) {
      console.log('Test')
      return {
        error: error.response.data
      }
    }
  }

  render() {
    const layoutSetings = {
      meta: {
        pageTitle: 'Offer Page'
      },
      withSidebar: true
    }

    return(
      <Layout { ...layoutSetings }>
      <div className="fullpage-wrapper">
        {this.props.offer ? <OfferContent offer={this.props.offer} /> : <NoResult />}
        <style jsx>{`
          div {
            padding: 0 20px;
          }
          h2 {
            margin: 15px 0;
          }
          `}</style>
      </div>
      </Layout>
    )
  }
}

export default withRouter(Offer)