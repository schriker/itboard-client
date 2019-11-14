import { useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import useFormError from '../../hooks/useSimpleFormErrors'
import useResetForm from '../../hooks/useResetForm'
import * as Yup from 'yup'
import CustomInput from '../ui/CustomInput'
import CustomFileInput from '../ui/CustomFileInput'
import Notification from '../ui/Notifiaction'

const OfferContactForm = ({ values, 
  errors, 
  setFieldValue, 
  resetForm, 
  isValidating, 
  touched, 
  isSending, 
  apiMessage, 
  type }) => {

  useResetForm(resetForm, type === 'success' ? true : false, isSending)
  useEffect(() => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6LeRQb4UAAAAAPNbFLigCEAEA0dcz8Lj1JReAKVb', {action: 'apply'})
      .then(token => {
        setFieldValue('captcha', token)
      })
    })
  }, [type])
  const [ withErrors, setWithErrors, errorsArray ] = useFormError(isSending, isValidating, errors, apiMessage)

  return (
    <div className="wrapper">
      <Notification open={withErrors} type={type ? type : 'error'} close={() => setWithErrors(false)}>
      <p>{type === 'success' ? 'Success!' : 'Something went wrong :('}</p>
        <ul>
          {errorsArray.map((error, index) => {
              return <li key={index}>{error}</li>
            }
          )}
        </ul>
      </Notification>
      <Form>
        <div className="inputs">
          <Field name="email" component={CustomInput} placeholder="Email" />
          <Field name="name" component={CustomInput} placeholder="Full name" />
          <Field name="message" className="textarea" placeholder="Short introduction" component="textarea" />
          <Field name="cv" component={CustomFileInput} />
          <Field className="hide" name="captcha" />
        </div>
        <div className="checkbox-row">
          <Field name="agree" id="agree" type="checkbox" checked={values.agree} />
          <label className={errors.agree && touched.agree ? 'with-error' : values.agree !== '' ? 'touched' : touched.agree ? 'touched' : null} htmlFor="agree">I agree to recruitmen agreements.</label>
        </div>
        <div>
          <button disabled={isSending} className="btn btn--blue btn--blue-white" type="submit">
            {isSending ? "Wait" : "Submit"}
          </button>
        </div>
        <p className="captcha">
          This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
        </p>
      </Form>
      <style jsx>{`
        .wrapper {
          padding: 80px 80px 40px 80px;
        }
        .inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          grid-column-gap: 40px;
          grid-row-gap: 10px;
        }
        .checkbox-row {
          margin-top: 40px;
        }
        .with-error {
          color: #dd0505;
        }
        p {
          margin: 0;
        }
        button {
          margin: 25px 0;
        }
        @media (max-width: 1440px) {
          .wrapper {
            padding: 40px;
          }
          .captcha {
            padding: 0 !important;
          }
        }
        @media (max-width: 830px) {
          .inputs {
            grid-template-columns: 1fr;
          }
          .input-row {
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}

const validationSchema = Yup.object().shape({
  name: Yup.string().
    required('Name field is required.'),
  email: Yup.string().
    required('Email is required.').
    email('Invalid email.'),
  message: Yup.string(),
  cv: Yup.mixed()
    .required('CV file is required.'),
  agree: Yup.boolean()
    .oneOf([true], 'Please agree to the recruitmen agreements.')
})

const formikOptions = {
  mapPropsToValues: () => ({
    name: '',
    email: '',
    message: '',
    agree: false,
    cv: null,
    captcha: ''
  }),
  handleSubmit: (values, { props }) => {
    const formData = new FormData()
    for (let key in values) {
      formData.append(key, values[key])
    }
    props.handleApply(formData)
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema
}

export default withFormik(formikOptions)(OfferContactForm)