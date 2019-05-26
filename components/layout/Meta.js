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
          background-color: #dadce7;
          color: #818181;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
        }  
        a {
          text-decoration: none;
          color: #818181;
          transition: all .2s ease-in-out;
        }
        a:hover {
          color: #0069ff;
        }
        .btn {
          border-radius: 18px;
          font-size: 16px;
          font-weight: 500;
          padding: 6px 25px;
          white-space: nowrap;
          border: 2px solid transparent;
          transition: all .2s ease-in-out;
        }
        .btn:hover {
          cursor: pointer;
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
        .btn--blue-white {
          padding: 6px 35px;
        }
        .btn--blue-white:hover {
          color: #0766ee;
        }
        .white-box {
          background-color: #f0f1f7;
          box-shadow: 0px 2px 1px 0px rgba(104,111,151,0.2);
        }
        button, input {
          font-family: 'Montserrat', sans-serif;
        }
        input {
          width: 100%;
          color: #1f1f1f;
          font-size 14px;
          padding: 15px 25px;
          background-color: #f0f1f7;
          border: 1px solid #c3c6d8;
          border-bottom: 5px solid #c3c6d8;
          transition: all .2s ease-in-out; 
          outline: none;
        }
        input:focus {
          border-color: #0069ff;
        }
        input.with-error,
        input:invalid {
          outline: 0;
          box-shadow: none;
          border-color: #e61340;
        }
        .input-row {
          position: relative;
          margin-bottom: 30px;
        }
        .input-row label {
          background-color: #f0f1f7;
          padding: 0 4px; 
          left: 25px;
          top: 50%;
          transform: translate(0, -50%);
          position: absolute;
          transition: all .2s ease-in-out;
          user-select: none;
          cursor: text;
        }
        input:focus ~ label,
        .touched ~ label,
        .with-error ~ label {
          top: 0;
          font-size: 12px;
        }
        input:-webkit-autofill ~ label {
          top: 0;
          font-size: 12px;
        }
        input:-webkit-autofill {
          box-shadow: 0 0 0 100px #f0f1f7 inset;
        }
      `}</style>
    </Fragment>
  )
}

export default Meta