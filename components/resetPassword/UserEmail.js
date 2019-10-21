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
        <p>Enter your email address, so we can send you a link to reset your password.</p>
        <Form>
            <Field name="email" component={CustomInput} placeholder="Email" />
          <div>
            <button disabled={isSending} className="btn btn--blue btn--blue-white" type="submit">
              {isSending ? "Wait" : "Submit"}
            </button>
          </div>
        </Form>
        <style jsx>{`
          .wrapper {
            flex: 0 1 600px;
            padding: 80px;
          }
          `}</style>
      </div>
    </Fragment>
  )
}

const validationSchema = Yup.object().shape({
  email: Yup.string().
    required('Email is required.').
    email('Invalid email.')
})

const formikOptions = {
  mapPropsToValues: () => ({
    email: ''
  }),
  handleSubmit: (values, { props } ) => {
    props.handleSubmit(values.email)
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema
}

export default withFormik(formikOptions)(UserEmail)