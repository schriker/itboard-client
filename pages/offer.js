import React from 'react'
import Layout from '../components/layout/Layout'
import OfferContent from '../components/offer/OfferContent'
import api from '../helpers/axios'
import NoResult from '../components/ui/NoResult'

class Offer extends React.Component {

  static async getInitialProps ({ query }) {
    try {
      const response = await api.get(`offer/get?_id=${query.id}`)
      return {
        offer: response.data.offers[0]
      }
    } catch (error) {
      return {
        error: error.response.data
      }
    }
  }

  state = {
    submited: false,
    isSending: false,
    type: '',
    errors: [],
  }

  handleApply = (formData) => {
    this.setState({isSending: true})
    api.post(`offer/apply?_id=${this.props.offer._id}`, formData)
    .then(response => {
      this.setState({
        isSending: false,
        submited: true,
        type: 'success',
        errors: ['Your cv was sent! Good luck.']
      })
    })
    .catch(err => {
      console.log(err.response)
      let msg = 'Server error!'
      if (err.response.status === 404) {
        msg = 'User with that email dosen\'t exist!'
      } else if (err.response.status === 429) {
        msg = 'You have to wait 15min. to retry.'
      }
      this.setState({
        isSending: false,
        type: 'error',
        errors: [msg]
      })
    })
  }

  render() {
    const layoutSetings = {
      meta: {
        pageTitle: `${this.props.offer.position_name} - ${this.props.offer.company_name}`,
        og_image: this.props.offer.company_header,
        og_url: `https://it.jarchiwum.pl/offer?id=${this.props.offer._id}`,
        og_description: `${this.props.offer.salary_from} - ${this.props.offer.salary_to} ${this.props.offer.salary_currency} ${this.props.offer.location}`,

      },
      withSidebar: true
    }

    return(
      <Layout { ...layoutSetings }>
        <div className="fullpage-wrapper">
          {this.props.offer ? <OfferContent type={this.state.type} apiMessage={this.state.errors} isSending={this.state.isSending} handleApply={this.handleApply} offer={this.props.offer} /> : <NoResult />}
          <style jsx>{`
            div {
              padding: 0 20px;
            }
            h2 {
              margin: 15px 0;
            }
            @media (max-width: 550px) {
              div {
                padding: 0;
              }
            }
            `}</style>
        </div>
      </Layout>
    )
  }
}

export default Offer