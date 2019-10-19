import React from 'react'
import api from '../helpers/axios'
import { connect } from 'react-redux'
import UserEmail from '../components/resetPassword/UserEmail'
import NewPassword from '../components/resetPassword/NewPassword'
import Layout from '../components/layout/Layout'
import Logo from '../components/header/Logo'

class ResetPassword extends React.Component {
  static async getInitialProps({ query }) {
    return {
      token: query.token
    }
  }

  state = {
    submited: false,
    isSending: false,
    type: '',
    errors: [],
  }

  handleEmailSubmit = (email) => {
    this.setState({ isSending: true })
    api.post('/user/reset-password', {
      email: email
    })
    .then(response => {
      this.setState({
        isSending: false,
        submited: true,
        type: 'success',
        errors: ['We have sent you an email, please check your inbox.']
      })
    })
    .catch(err => {
      console.log(err.response)
      let msg = 'Server error!'
      if (err.response.status === 404) {
        msg = 'User with that email dosen\'t exist!'
      } else if (err.response.status === 429) {
        msg = 'You have to wait 15min. to retry.'
      }
      this.setState({
        isSending: false,
        type: 'error',
        errors: [msg]
      })
    })
  }

  handlePasswordSubmit = (password, confirmPassword) => {
    this.setState({ isSending: true })
    api.post('user/new-password', {
      token: this.props.token,
      password: password,
      confirmPassword: confirmPassword
    })
    .then(response => {
      this.setState({
        isSending: false,
        submited: true,
        type: 'success',
        errors: ['We have changed your password. Now you can login!']
      })
    })
    .catch(err => {
      let msg = 'Server error!'
      if (err.response.status === 403) {
        msg = 'We couldn\'t change your password.'
      }
      this.setState({
        isSending: false,
        type: 'error',
        errors: [msg]
      })
    })
  }

  render() {
    const layoutSetings = {
      meta: {
      },
      withSidebar: false
    }

    let form = <UserEmail  
                  handleSubmit={this.handleEmailSubmit} 
                  submited={this.state.submited} 
                  isSending={this.state.isSending} 
                  apiMessage={this.state.errors} 
                  type={this.state.type}
                />

    if (this.props.token) {
      form = <NewPassword 
                handleSubmit={this.handlePasswordSubmit}
                submited={this.state.submited}
                isSending={this.state.isSending}
                apiMessage={this.state.errors}
                type={this.state.type}
              />
    }

    if (this.props.auth.user) {
      form = <div className="wrapper white-box">
              <div>
                You are already loged in.
              </div>
              <style jsx>{`
              .wrapper {
                text-align: center;
                flex: 0 1 750px;
                padding: 60px 80px;
              }
              `}</style>
              </div>
    }
    return (
      <Layout {...layoutSetings}>
        <Logo black />
        {form}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ResetPassword)