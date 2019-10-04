import React from 'react'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import Layout from '../components/layout/Layout'
import { fetchOffers, fetchCities } from '../store/actions/index'
import { filter } from '../helpers/offerFilters'
import OfferListItem from '../components/offersList/OfferListItem'
import { offersPerPage } from '../helpers/consts'
import Filters from '../components/filters/Filters'
import Pagination from '../components/pagination/Pagination'
import NoResult from '../components/ui/NoResult'
const IndexMap = dynamic(
  () => import('../components/googleMaps/IndexMap'),
  {ssr: false}
)

class Index extends React.Component {

static async getInitialProps ({ reduxStore, req, query }) {
  
  const state = reduxStore.getState()
  if (state.offers.offers.length === 0) {
    await reduxStore.dispatch(fetchOffers())
    await reduxStore.dispatch(fetchCities())
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
      offers = <NoResult />
    } else {
      offers = <div className="offers">{this.props.offers
                .slice(firsItem, lastItem)
                .map((offer, index) => 
                  <OfferListItem 
                    firstVisit={this.props.firstVisit} 
                    index={index} 
                    findOnMap={this.findOnMapHandler} 
                    key={offer._id} 
                    offer={offer} />
                )}
                <style jsx>{`.offers{ margin-top: 20px; }`}</style>
              </div>

    }

    lastPage = Math.ceil((this.props.offers.length) / offersPerPage);

    return (
      <Layout { ...layoutSetings }>
        <div className="fullpage-wrapper">
          <Filters />
          <div className="mapplaceholder">
            <IndexMap findOnMap={this.state.findOnMap} offers={this.props.offers} />
          </div>
            <div className="offers-wrapper">
              {offers}
            </div>
          {lastPage > 0 && <Pagination currentPage={this.props.page} lastPage={lastPage}/>}
        </div>
        <style jsx>{`
          .offers-wrapper {
            padding: 0px 20px;
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