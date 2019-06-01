import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { connect } from 'react-redux'
import { userLogin } from '../../store/actions/index'
import ErrorWrapper from '../ui/ErrorWrapper'

const LoginForm = ({ values, errors, touched, auth }) => {
  const errorsArray = Object.values(errors)
  if (auth.authFailed) {
    errorsArray.push(auth.authErr)
  }
  return (
    <div className="white-box wrapper">
      <div className="errors">
        {errorsArray.map((error, index) => {
            return <ErrorWrapper key={index}>{error}</ErrorWrapper>
          }
        )}
      </div>
      <Form>
        <div className="input-row">
          <Field className={errors.email && touched.email ? 'with-error' : values.email !== '' ? 'touched' : touched.email ? 'touched' : null} id="email" type="email" name="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-row">
          <Field className={errors.password && touched.password ? 'with-error' : values.password !== '' ? 'touched' : touched.password ? 'touched' : null} id="password" type="password" name="password" />
          <label htmlFor="password">Password</label>
        </div>
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
  email: Yup.string().required('Email is required.').email('Invalid email.'),
  password: Yup.string().required('Password is required.')
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
  login: (values) => dispatch(userLogin(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(withFormik(formikOptions)(LoginForm))