import React from 'react'
import Protect from '../protect'
import api from '../../helpers/axios'
import Layout from '../../components/layout/Layout'
import DashboardBox from '../../components/dashboard/DashboardBox'

class Dashboard extends React.Component {
  static async getInitialProps({ req }) {
    try {
      const isServer = typeof window === 'undefined'
      let response = null

      if (
        isServer &&
        req.cookies.session_cookie &&
        req.cookies.payload_cookie
      ) {
        response = await api.get('dashboard/offers', {
          headers: {
            cookie: req.headers.cookie,
          },
        })
      } else {
        response = await api.get('dashboard/offers')
      }

      return {
        offers: response.data.offers,
      }
    } catch (error) {
      return {
        error: error.response.data,
      }
    }
  }

  render() {
    const layoutSetings = {
      meta: {},
      withUserSidebar: true,
    }

    const totalViews = this.props.offers.reduce(
      (prev, current) => prev + current.views,
      0
    )

    const totalResumes = this.props.offers.reduce(
      (prev, current) => prev + current.resumes.length,
      0
    )

    return (
      <Layout {...layoutSetings}>
        <div className="fullpage-wrapper offers-wrapper">
          <div className="dashboard-info">
            <DashboardBox
              title="Active offers"
              text={this.props.offers.length}
            />
            <DashboardBox title="Total views" text={totalViews} />
            <DashboardBox title="Resumes" text={totalResumes} />
          </div>
        </div>
        <style jsx>{`
          .offers-wrapper {
            padding: 20px;
          }
          .dashboard-info {
            width: 100%;
            display: grid;
            column-gap: 20px;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          .mapplaceholder {
            width: 100%;
            height: 400px;
          }
          @media (max-width: 810px) {
            .offers-wrapper {
              padding: 20px 0px;
            }
          }
        `}</style>
      </Layout>
    )
  }
}

export default Protect(Dashboard)
