import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { authVerifiedReset } from '../../store/actions/index'
import api from '../../helpers/axios'
import Layout from '../../components/layout/Layout'
import Logo from '../../components/header/Logo'
import Notification from '../../components/ui/Notifiaction'

class Verify extends React.Component {
  static async getInitialProps({ query }) {
    return (
      api.post('user/verify', {
        token: query.token
      })
      .then(res => {
        return {
          response: res.data
        } 
      })
      .catch(err => {
        return {
          response: err.response.data
        }
      })
    )
  }

  state = {
    resended: false,
    isSending: false,
    msg: '',
    type: ''
  }

  componentWillUnmount() {
    this.props.authVerifiedReset()
  }

  reSubmnitHandler = () => {
    this.setState({isSending: true})
    api.post('user/resend-token', {
      userEmail: this.props.auth.email
    })
    .then(() => this.setState({resended: true, msg: 'Token was send! Check your email.', type: 'success', isSending: false}))
    .catch((err) => {
      let msg = 'Server error. Pleas contact us.'
      if (err.response.status === 429) {
        msg = 'You have to wait 15min. to retry.'
      }
      this.setState({resended: true, msg: msg, type: 'error', isSending: false})
    })
  }

  render() {
    const layoutSetings = {
      meta: {
      },
      withSidebar: false
    }

    let content = null
    const { statusCode } = this.props.response

    if  (statusCode === 200) {
      content = 'Success! Your email address was verified, now you can login.'
    } else if (!this.props.auth.verified) {
      content = 'Account was created, please verify your email address. If you haven\'t recive verification email yet, please check your spam or click button below to send it again.'
    } else {
      content = 'There was an error with your token. You can try to login and then send new verification token to your email.'
    }
    return (
      <Layout {...layoutSetings}>
      <Notification open={this.state.resended} type={this.state.type} close={() => this.setState({resended: false})}>
        <p>{this.state.type === 'success' ? 'Success!' : 'Something went wrong :('}</p>
        <ul>
          <li>{this.state.msg}</li>
        </ul>
      </Notification>
        <Logo black />
        <div className="white-box wrapper">
          <div>
            <p>{content}</p>
          </div>
          {this.props.auth.verified && <button className="btn btn--blue btn--blue-white" type="button" onClick={() => Router.push('/user/login')}>Login</button>}
          {!this.props.auth.verified && <button disabled={this.state.isSending} className="btn btn--blue btn--blue-white" type="submit" onClick={() => this.reSubmnitHandler()}>
            {this.state.isSending ? "Wait" : "Send it again"}
          </button>}
        </div>
        <style jsx>{`
          .wrapper {
            text-align: center;
            flex: 0 1 750px;
            padding: 60px 80px;
          }
        `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  authVerifiedReset: () => dispatch(authVerifiedReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(Verify)