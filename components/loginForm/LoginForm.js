import { withFormik, Form, Field } from 'formik'
import { useEffect, useState, Fragment } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import { connect } from 'react-redux'
import { userLogin, authReset, userRegister } from '../../store/actions/index'
import Notification from '../ui/Notifiaction'
import CustomInput from '../ui/CustomInput'

const LoginForm = ({ errors, 
  auth, 
  resetAuth, 
  isValidating, 
  isSubmitting, 
  loginMode, 
  setLoginMode }) => {

  useEffect(() => {
    return () => resetAuth()
  }, [])
  
  const [withErrors, setWithErrors] = useState(false)
  
  useEffect(() => {
    if ((errorsArray.length > 0  && !isSubmitting && !isValidating) || auth.authFailed) {
      setWithErrors(true)
    } else if (withErrors) {
      setWithErrors(false)
    }
  }, [isValidating, isSubmitting, auth])


  const errorsArray = Object.values(errors)

  if (auth.authFailed) {
    errorsArray.push(auth.authErr)
  }

  const handleCloseNotification = () => {
    setWithErrors(false)
    if (auth.authErr) {
      resetAuth()
    }
  }

  return (
    <Fragment>
      <Notification open={withErrors} type="error" close={() => handleCloseNotification()}>
        <p>Something went wrong :(</p>
        <ul>
          {errorsArray.map((error, index) => {
              return <li key={index}>{error}</li>
            }
          )}
        </ul>
      </Notification>
      <div className="white-box wrapper">
        <Form>
            <Field name="email" component={CustomInput} placeholder="Email" />
            <Field name="password" component={CustomInput} placeholder="Password" password />
            {!loginMode && <Field name="confirmPassword" component={CustomInput} placeholder="Confirm Password" password/>}
            {!loginMode && 
              <p className="captcha">
                This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
              </p>
            }
          <div className="links">
            <a onClick={() => setLoginMode(!loginMode)}>{loginMode ? "Create new account" : "Login form."}</a>
            <Link href="/reset-password">
              <a>Forgot password?</a>
            </Link>
          </div>
          <div>
            <button disabled={auth.isSending} className="btn btn--blue btn--blue-white" type="submit">
              {auth.isSending ? "Wait" : loginMode ? "Login" : "Register"}
            </button>
          </div>
        </Form>
        <style jsx>{`
          .wrapper {
            flex: 0 1 600px;
            padding: 80px;
          }
          a:hover {
            cursor: pointer;
          }
          .captcha {
            font-size: 12px;
            color: #cacaca;
          }
          .captcha a {
            color: #095beb;
          }
          .links {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
          }
          `}</style>
      </div>
    </Fragment>
  )
}

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().
    required('Email is required.').
    email('Invalid email.'),
  password: Yup.string().
    required('Password is required.'),
  confirmPassword: Yup.string().
    required('Please confirm your password.').
    oneOf([Yup.ref('password')], 'Passwords dosen\'t match.')
})

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().
    required('Email is required.').
    email('Invalid email.'),
  password: Yup.string().
    required('Password is required.')
})

const formikOptions = {
  mapPropsToValues: () => ({
    email: '',
    password: '',
    confirmPassword: ''
  }),
  handleSubmit: (values, { props } ) => {
    if (props.loginMode) {
      props.login(values)
    } else {
      props.register({
        ...values,
        captchaToken: props.captchaToken
      })      
    }
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema: ({ loginMode }) => {
    if (loginMode) {
      return loginValidationSchema
    } else {
      return registerValidationSchema
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  login: (values) => dispatch(userLogin(values)),
  register: (values) => dispatch(userRegister(values)),
  resetAuth: () => dispatch(authReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(withFormik(formikOptions)(LoginForm))