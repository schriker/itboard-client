import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'

const LoginForm = ({ errors, touched }) => {
  return (
    <div className="white-box wrapper">
      <Form>
        <div className="input-row">
          <Field className={errors.email && touched.email ? 'with-error' : touched.email ? 'touched' : null} id="email" type="email" name="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-row">
          <Field className={errors.password && touched.password ? 'with-error' : touched.password ? 'touched' : null} id="password" type="password" name="password" />
          <label htmlFor="password">Password</label>
        </div>
        <div className="links">
          <Link href="/reset-password">
            <a>Forgot password?</a>
          </Link>
        </div>
        <div>
          <button className="btn btn--blue btn--blue-white" type="submit">Login</button>
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
  handleSubmit: (values) => {
    console.log(values)
  },
  validateOnBlur: true,
  validateOnChange: false,
  validationSchema
}

export default withFormik(formikOptions)(LoginForm)