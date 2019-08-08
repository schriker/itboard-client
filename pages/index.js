import React from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout/Layout'
import { fetchOffers } from '../store/actions/index'
import IndexMap from '../components/googleMaps/IndexMap'
import OfferListItem from '../components/offersList/OfferListItem'

class Index extends React.Component {

  static async getInitialProps ({ reduxStore }) {
    await reduxStore.dispatch(fetchOffers())
    return {}
}

  render() {
    const layoutSetings = {
      meta: {
      },
      withSidebar: true
    }

    return (
      <Layout { ...layoutSetings }>
        <div className="fullpage-wrapper">
          <div>Filters</div>
          <IndexMap offers={this.props.offers} />
          <div className="offers">
            {this.props.offers.map(offer => <OfferListItem key={offer._id} offer={offer} />)}
          </div>
          <div>Pagination</div>
        </div>
        <style jsx>{`
          .offers {
            padding: 20px;
          }
          `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  offers: state.offers.offers
})

export default connect(mapStateToProps)(Index)