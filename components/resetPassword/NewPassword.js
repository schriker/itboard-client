import { withFormik, Form, Field } from 'formik'
import { useEffect, useState, Fragment } from 'react'
import * as Yup from 'yup'
import Notification from '../ui/Notifiaction'
import CustomInput from '../ui/CustomInput'

const UserEmail = ({ errors,
  isValidating,
  isSending,
  apiMessage,
  type
 }) => {
  
  const [withErrors, setWithErrors] = useState(false)
  
  useEffect(() => {
    if ((errorsArray.length > 0  && !isSending && !isValidating)) {
      setWithErrors(true)
    } else if (withErrors) {
      setWithErrors(false)
    }
  }, [isValidating, isSending])

  let errorsArray = Object.values(errors)

  if (apiMessage.length > 0) {
    errorsArray = [
      ...errorsArray,
      ...apiMessage
    ]
  }

  const handleCloseNotification = () => {
    setWithErrors(false)
  }

  return (
    <Fragment>
      <Notification open={withErrors} type={type ? type : 'error'} close={() => handleCloseNotification()}>
      <p>{type === 'success' ? 'Success!' : 'Something went wrong :('}</p>
        <ul>
          {errorsArray.map((error, index) => {
              return <li key={index}>{error}</li>
            }
          )}
        </ul>
      </Notification>
      <div className="white-box wrapper">
        <p>Pleas enter new password.</p>
        <Form>
          <Field name="password" component={CustomInput} placeholder="Password" password />
          <Field name="confirmPassword" component={CustomInput} placeholder="Confirm Password" password/>
          <div>
            <button disabled={isSending} className="btn btn--blue btn--blue-white" type="submit">
              {isSending ? "Wait" : "Submit"}
            </button>
          </div>
        </Form>
        <style jsx>{`
          .wrapper {
            flex: 0 1 600px;
            padding: 90px 100px;
          }
          `}</style>
      </div>
    </Fragment>
  )
}

const validationSchema = Yup.object().shape({
  password: Yup.string().
    required('Password is required.'),
  confirmPassword: Yup.string().
    required('Please confirm your password.').
    oneOf([Yup.ref('password')], 'Passwords dosen\'t match.')
})

const formikOptions = {
  mapPropsToValues: () => ({
    password: '',
    confirmPassword: ''
  }),
  handleSubmit: (values, { props } ) => {
    props.handleSubmit(values.password, values.confirmPassword)
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema
}

export default withFormik(formikOptions)(UserEmail)