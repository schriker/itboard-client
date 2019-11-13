import { useState } from 'react'

const OfferAgreements = ({ agreements }) => {
  const [viewMore, setViewMore] = useState(false)

  let text = agreements

  if (!viewMore) {
    text = agreements.substring(0, 300)
  }

  return (
    <div>
      {text}
      {!viewMore ? '...' : null}
      <a onClick={() => setViewMore(!viewMore)}>{!viewMore ? 'more' : 'hide'}</a>
      <style jsx>{`
        div {
          color: #b5b5b5;
          padding: 30px 80px;
          font-size: 12px;
          line-height: 22px;
        }
        a {
          cursor: pointer;
          margin: 0 0 0 5px;
        }
        @media (max-width: 1440px) {
          div {
            padding: 30px 40px;
          }
        }
        `}</style>
    </div>
  )
}

export default OfferAgreements