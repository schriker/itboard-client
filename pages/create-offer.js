import React from 'react'
import Protect from './protect'
import Layout from '../components/layout/Layout'
import Logo from '../components/header/Logo'
import FormSteps from '../components/createOffer/FormSteps'
import DetailsForm from '../components/createOffer/DetailsForm'
import ContentForm from '../components/createOffer/ContentForm'
import PreviewForm from '../components/createOffer/PreviewForm'
import SubmitedForm from '../components/createOffer/SubmitedForm'

class CreateOffer extends React.Component {

  state = {
    currentStep: 2
  }

  render() {

    const layoutSetings = {
      meta: {
      },
      withSidebar: false
    }

    const formSteps = ['login', 'detials', 'content']

    let content = null

    if (this.state.currentStep === 2) {
      content = <DetailsForm submitOffer={() => this.setState({currentStep: 3})} />
    }

    if (this.state.currentStep === 3) {
      content = <ContentForm submitOffer={() => this.setState({currentStep: 4})} />
    }

    if (this.state.currentStep === 4) {
      content = <PreviewForm editOffer={() => this.setState({currentStep: 2})} submitOffer={() => this.setState({currentStep: 5})} />
    }

    if (this.state.currentStep === 5) {
      content = <SubmitedForm />
    }

    return (
      <Layout {...layoutSetings}>
        <Logo black />
        <FormSteps steps={formSteps} currentStep={this.state.currentStep} />
        {content}
      </Layout>
    )
  }
}

export default Protect(CreateOffer)