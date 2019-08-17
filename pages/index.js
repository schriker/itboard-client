import React from 'react'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import Layout from '../components/layout/Layout'
import { fetchOffers } from '../store/actions/index'
import { filter } from '../helpers/offerFilters'
import OfferListItem from '../components/offersList/OfferListItem'
import { offersPerPage } from '../helpers/consts'
import Pagination from '../components/pagination/Pagination'
const IndexMap = dynamic(
  () => import('../components/googleMaps/IndexMap'),
  {ssr: false}
)

class Index extends React.Component {

static async getInitialProps ({ reduxStore, req, query }) {
  
  const state = reduxStore.getState()
  if (state.offers.offers.length === 0) {
    await reduxStore.dispatch(fetchOffers())
  }

  const isServer = typeof window === 'undefined'
  if (isServer) {
    return {
      firstVisit: req.cookies.visited_before,
      page: +query.page || 1
    }
  } 
  return {
    page: +query.page || 1
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

    let offers = null
    let lastPage = null
    let firsItem = (this.props.page * offersPerPage) - offersPerPage
    let lastItem = (this.props.page * offersPerPage)

    if (this.props.offers.length === 0) {
      offers = 
        <div className="noresults">
          No offers matches your critieria :(
            <style jsx>{`
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
              `}</style>
        </div>
    } else {
      offers = this.props.offers
                .slice(firsItem, lastItem)
                .map((offer, index) => 
                  <OfferListItem 
                    firstVisit={this.props.firstVisit} 
                    index={index} 
                    findOnMap={this.findOnMapHandler} 
                    key={offer._id} 
                    offer={offer} />
                )
    }

    lastPage = Math.ceil((this.props.offers.length) / offersPerPage);

    return (
      <Layout { ...layoutSetings }>
        <div className="fullpage-wrapper">
          <div>Filters</div>
          <div className="mapplaceholder">
            <IndexMap findOnMap={this.state.findOnMap} offers={this.props.offers} />
          </div>
          <div className="offers">
            {offers}
          </div>
          {lastPage > 0 && <Pagination currentPage={this.props.page} lastPage={lastPage}/>}
        </div>
        <style jsx>{`
          .offers {
            padding: 20px;
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