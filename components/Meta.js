import Head from 'next/head'
import { Fragment } from 'react'

const Meta = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.pageTitle || `Title placeholder`}</title>
      </Head>

      <style jsx global>{`
        * {
          margin: 0 auto;
          padding: 0;
        }
        body {
          background-color: #FF0
        }  
      `}</style>
    </Fragment>
  )
}

export default Meta