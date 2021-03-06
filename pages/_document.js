// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" />
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvaXqB12NxSUnXqC22jDpJ-fyxNNeNWc8&language=en&libraries=places"
  type="text/javascript"></script>
        <script src="https://www.google.com/recaptcha/api.js?render=6LeRQb4UAAAAAPNbFLigCEAEA0dcz8Lj1JReAKVb"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument