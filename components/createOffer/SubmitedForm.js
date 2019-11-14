import Router from 'next/router'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { saveOfferReset } from '../../store/actions/index'

const SubmitedForm = ({ resetOffer }) => {

  useEffect(() => {
    return () => resetOffer()
  }, [])

  return (
    <div className="white-box wrapper">
      <p>Great! Offer was created and saved, now we have to verified it and publish. It make take up to 12h.</p>
      <img src="/static/finished_icon.png" alt="Finished Icon"/>
      <button className="btn btn--blue btn--blue-white" type="button" onClick={() => Router.push('/')}>Finish</button>
      <style jsx>{`
        .wrapper {
          text-align: center;
          flex: 0 1 750px;
          padding: 60px 100px;
        }
        img {
          display: block;
          margin: 0 auto 30px auto;
          max-height: 100%;
          width: 400px;
          height: auto;
          max-width: 100%;
        }
        p {
          color: #1f1f1f;
          margin: 0 0 30px 0;
          font-size: 20px;
          line-height: 35px;
          }
          @media (max-width: 550px) {
            .wrapper {
              padding: 40px;
            }
          }
        `}
      </style>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  resetOffer: () => dispatch(saveOfferReset())
})

export default connect(null, mapDispatchToProps)(SubmitedForm)