import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import * as actions from '../store/actions/index'

class Index extends React.Component {

  static async getInitialProps ({ reduxStore }) {
    await reduxStore.dispatch(actions.fetchTitle())
    return {}
}

  render() {
    return (
      <div>
        <Head>
          <title>{this.props.pageTitle}</title>
        </Head>
        {this.props.pageTitle}
        <button onClick={() => this.props.changeTitle()}>Test</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pageTitle: state.title.pageTitle
})

const mapDispatchToProps = dispatch => {
  return {
    changeTitle: () => dispatch(actions.fetchTitle())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)