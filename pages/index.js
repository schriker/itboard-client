import React from 'react'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import Layout from '../components/layout/Layout'
import { fetchOffers } from '../store/actions/index'
import { filter } from '../helpers/offerFilters'
const IndexMap = dynamic(
  () => import('../components/googleMaps/IndexMap'),
  {ssr: false}
)
import OfferListItem from '../components/offersList/OfferListItem'

class Index extends React.Component {

static async getInitialProps ({ reduxStore, req }) {
  const state = reduxStore.getState()
  if (state.offers.offers.length === 0) {
    await reduxStore.dispatch(fetchOffers())
  }
  return {
    firstVisit: req.cookies.visited_before
  }
}

state = {
  findOnMap: null
}

findOnMapHandler = (cords) => {
  this.setState({findOnMap: cords})
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
          <div className="mapplaceholder">
            <IndexMap findOnMap={this.state.findOnMap} offers={this.props.offers} />
          </div>
          <div className="offers">
            {this.props.offers.length === 0 && <div className="noresults">No offers matches your critieria :(</div>}
            {this.props.offers.map((offer, index) => <OfferListItem firstVisit={this.props.firstVisit} index={index} findOnMap={this.findOnMapHandler} key={offer._id} offer={offer} />)}
          </div>
          <div>Pagination</div>
        </div>
        <style jsx>{`
          .offers {
            padding: 20px;
          }
          .noresults {
            color: #a6a9b5;
            text-align: center;
            font-size: 28px;
            padding: 60px 0;
            font-weight: 500;
            background-color: #f0f1f7;
            border-bottom: 1px solid #cccfdd;
            transition: all .1s ease-in-out;
          }
          .mapplaceholder {
            width: 100%;
            height: 400px;
          }
          `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = ({ offers }) => ({
  offers: filter(offers.filters, offers.offers)
})

export default connect(mapStateToProps)(Index)