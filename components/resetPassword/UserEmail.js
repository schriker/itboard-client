import { withFormik, Form, Field } from 'formik'
import { Fragment } from 'react'
import useFormError from '../../hooks/useSimpleFormErrors'
import useResetForm from '../../hooks/useResetForm'
import * as Yup from 'yup'
import Notification from '../ui/Notifiaction'
import CustomInput from '../ui/CustomInput'

const UserEmail = ({ errors,
  isValidating,
  isSending,
  apiMessage,
  type,
  resetForm
 }) => {
  
  const [ withErrors, setWithErrors, errorsArray ] = useFormError(isSending, isValidating, errors, apiMessage)
  useResetForm(resetForm, type === 'success' ? true : false, isSending)

  return (
    <Fragment>
      <Notification open={withErrors} type={type ? type : 'error'} close={() => setWithErrors(false)}>
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
          @media (max-width: 550px) {
            .wrapper {
              padding: 40px;
            }
          }
          `}</style>
      </div>
    </Fragment>
  )
}

const validationSchema = Yup.object().shape({
  email: Yup.string().
    trim().
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