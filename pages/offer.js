import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { withRouter } from 'next/router';

class Offer extends React.Component {
  render() {
    return(
      <Layout>
        Offer page
        {this.props.router.query.id}
        <Link href="/"><a>Go to home</a></Link>
      </Layout>
    )
  }
}

export default withRouter(Offer)