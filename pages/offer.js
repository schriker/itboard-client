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
      return {
        offer: response.data.offer[0]
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
        pageTitle: `${this.props.offer.position_name} - ${this.props.offer.company_name}`,
        og_image: this.props.offer.company_header,
        og_description: `${this.props.offer.salary_from} - ${this.props.offer.salary_to} ${this.props.offer.salary_currency} ${this.props.offer.location}`,

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