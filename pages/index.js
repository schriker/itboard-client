import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import Layout from '../components/Layout'

class Index extends React.Component {

  static async getInitialProps ({ reduxStore }) {
    // Fecth offers here
    // await reduxStore.dispatch(actions.fetchTitle())
    return {}
}

  render() {
    return (
      <Layout>
        <Link as="/offer/2" href="/offer?id=2"><a>Offer pages</a></Link>
        Test
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps)(Index)