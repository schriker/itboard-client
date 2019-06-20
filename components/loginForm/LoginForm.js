import { withFormik, Form, Field } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import { connect } from 'react-redux'
import { userLogin, authReset } from '../../store/actions/index'
import Notification from '../ui/Notifiaction'
import CustomInput from '../ui/CustomInput'

const LoginForm = ({ errors, auth, resetAuth, isValidating }) => {

  useEffect(() => {
    return () => resetAuth()
  }, [])
  
  const [withErrors, setWithErrors] = useState(false)
  
  useEffect(() => {
    if (errorsArray.length > 0) {
      setWithErrors(true)
    } else if (withErrors) {
      setWithErrors(false)
    }
  }, [isValidating, auth])

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
    <div className="white-box wrapper">
      <Notification open={withErrors} type="error" close={() => handleCloseNotification()}>
        <p>Something went wrong :(</p>
        <ul>
          {errorsArray.map((error, index) => {
              return <li key={index}>{error}</li>
            }
          )}
        </ul>
      </Notification>
      <Form>
          <Field name="email" component={CustomInput} placeholder="Email" />
          <Field name="password" component={CustomInput} placeholder="Password" password />
        <div className="links">
          <Link href="/reset-password">
            <a>Forgot password?</a>
          </Link>
        </div>
        <div>
          <button disabled={auth.isSending} className="btn btn--blue btn--blue-white" type="submit">
            {auth.isSending ? "Wait" : "Login"}
          </button>
        </div>
      </Form>
      <style jsx>{`
        .wrapper {
          flex: 0 1 600px;
          padding: 90px 100px;
        }
        .links {
          margin-bottom: 10px;
          text-align: right;
        }
        `}</style>
    </div>
  )
}

const validationSchema = Yup.object().shape({
  email: Yup.string().
    required('Email is required.').
    email('Invalid email.'),
  password: Yup.string().
    required('Password is required.')
})

const formikOptions = {
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  handleSubmit: (values, { props }) => {
    props.login(values)
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  login: (values) => dispatch(userLogin(values)),
  resetAuth: () => dispatch(authReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(withFormik(formikOptions)(LoginForm))