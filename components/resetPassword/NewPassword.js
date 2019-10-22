import { withFormik, Form, Field } from 'formik'
import { Fragment } from 'react'
import useFormError from '../../hooks/useSimpleFormErrors'
import useResetForm from '../../hooks/useResetForm'
import * as Yup from 'yup'
import Notification from '../ui/Notifiaction'
import CustomInput from '../ui/CustomInput'

const UserEmail = ({ errors,
  resetForm,
  isValidating,
  isSending,
  apiMessage,
  type
 }) => {

  useResetForm(resetForm, type === 'success' ? true : false, isSending)  
  const [ withErrors, setWithErrors, errorsArray ] = useFormError(isSending, isValidating, errors, apiMessage)

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
        <p>Please enter new password.</p>
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
            padding: 80px;
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