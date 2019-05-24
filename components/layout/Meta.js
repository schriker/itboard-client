import Head from 'next/head'
import { Fragment } from 'react'

const Meta = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.pageTitle || `ITBoard - Jobs Offers`}</title>
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          line-height: 1rem;
          background-color: #dadce7;
          color: #818181;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
        }  
        a {
          text-decoration: none;
        }
        .btn {
          border-radius: 18px;
          font-size: 16px;
          font-weight: 500;
          padding: 6px 25px;
          white-space: nowrap;
          border: 2px solid transparent;
        }
        .btn--yellow {
          background-color: #ffe600;
          color: #2b2b2b;
        }
        .btn--yellow:hover {
          color: #f0f1f7;
          border: 2px solid #ffe600;
          background-color: transparent;
        }
        .btn--blue {
          background-color: #0766ee;
          color: #f0f1f7;
        }
        .btn--blue:hover {
          color: #f0f1f7;
          border: 2px solid #0766ee;
          background-color: transparent;
        }
      `}</style>
    </Fragment>
  )
}

export default Meta