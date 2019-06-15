import Head from 'next/head'
import { Fragment } from 'react'

const Meta = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.pageTitle || `ITBoard - Jobs Offers`}</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous"></link>
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
          transition: all .1s ease-in-out;
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
          transition: all .1s ease-in-out;
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
        .btn i {
          margin-right: 10px;
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
        button:disabled {
          background-color: #c3c6d8;
        }
        button[disabled]:hover {
          color: #f0f1f7;
          border-color: transparent;
          background-color: #c3c6d8;
        }
        button[disabled]:after {
          position: absolute;
          content: '';
          animation: wait 2s ease infinite; 
        }
        @keyframes wait {
          0% {
            content: '';
          }
          25% {
            content: '.';
          }
          50% {
            content: '..';
          }
          75% {
            content: '...'
          }
          100% {
            content: ''
          }
        }
        input, 
        textarea {
          width: 100%;
          font-size 14px;
          padding: 15px 25px;
          background-color: #f0f1f7;
          border: 1px solid #c3c6d8;
          border-bottom: 5px solid #c3c6d8;
          transition: all .1s ease-in-out; 
          outline: none;
        }
        input[type="file"] {
          opacity: 0;
          width: 100%;
          height: 250px;
          position: absolute;
          z-index: 2;
        }
        input[type="file"] + div {
          color: #1f1f1f;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 250px;
          background-color: #dadce7;
        }
        input[type="file"].with-error + div {
          color: white;
          background-color: #e61340;
        }
        input[type="file"] + div span {
          font-size: 14px;
          margin-top: 5px;
        }
        input[type="file"] + div img {
          width: 100%;
          height: auto;
        }
        input[type="file"] + div i {
          font-size: 72px;
          color: #f0f1f7;
        }
        input[type="checkbox"] {
          display: none;
          width: auto;
        }

        input[type="checkbox"] + label {
          position: relative;
          padding-left: 30px;
        }

        input[type="checkbox"] + label:hover {
          cursor: pointer;
          user-select: none;
        }

        input[type="checkbox"] + label::before {
          position: absolute;
          top: 0;
          left: 0;
          content: '';
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 1px solid #dadce7;
        }
        input[type="checkbox"] + label::after {
          position: absolute;
          opacity: 0;
          left: 4px;
          top: 50%;
          transform: translate(0, -50%);
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: #0069ff;
          transition: all .1s ease-in-out; 
        }
        input[type="checkbox"]:checked + label::after {
          opacity: 1;
        }
        textarea {
          color: #818181;
          font-size: 14px;
          line-height: 20px;
          height: 350px;
          font-family: 'Montserrat', sans-serif;
        }
        input:focus {
          border-color: #0069ff;
        }
        input.with-error,
        input:invalid,
        textarea.with-error {
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
          transition: all .1s ease-in-out;
          user-select: none;
          cursor: text;
        }
        input:focus ~ label,
        .touched ~ label,
        .with-error ~ label {
          top: 0;
          font-size: 12px;
        }
        input:-webkit-autofill {
          box-shadow: 0 0 0 100px #f0f1f7 inset;
        }
        .errors {
          color: #e61340;
          margin-bottom: 20px;
          line-height: 20px;
        }
        .arrow-up {
          width: 0; 
          height: 0; 
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid #f0f1f7;
        }
        .notification {
          z-index: 3;
        }
        .notification p {
          font-size: 16px;
        }
        .notification ul {
          margin: 10px 0 5px 25px;
        }
        .notification ul li {
          margin: 5px 0;
        }
      `}</style>
    </Fragment>
  )
}

export default Meta