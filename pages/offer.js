import React from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { withRouter } from 'next/router';

class Offer extends React.Component {
  render() {

    const layoutSetings = {
      meta: {
        pageTitle: 'Offer Page'
      },
      withSidebar: true
    }

    return(
      <Layout { ...layoutSetings }>
        Offer page
        {this.props.router.query.id}
        <Link href="/"><a>Go to home</a></Link>
      </Layout>
    )
  }
}

export default withRouter(Offer)