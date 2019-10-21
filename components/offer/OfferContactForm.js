import { useEffect, useState } from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import CustomInput from '../ui/CustomInput'
import CustomFileInput from '../ui/CustomFileInput'
import Notification from '../ui/Notifiaction'

const OfferContactForm = ({ values, errors, setFieldValue, isSubmitting, isValidating, touched }) => {
  const [withErrors, setWithErrors] = useState(false)
  useEffect(() => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6LeRQb4UAAAAAPNbFLigCEAEA0dcz8Lj1JReAKVb', {action: 'apply'})
      .then(token => {
        setFieldValue('captcha', token)
      })
    })
  }, [])
  useEffect(() => {
    if ((errorsArray.length > 0  && !isSubmitting && !isValidating)) {
      setWithErrors(true)
    } else if (withErrors) {
      setWithErrors(false)
    }
  }, [isValidating, isSubmitting])

  const errorsArray = Object.values(errors)

  return (
    <div className="wrapper">
      <Notification open={withErrors} type="error" close={() => setWithErrors(false)}>
        <p>Something went wrong :(</p>
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
          <Field name="message" placeholder="Short introduction" component="textarea" />
          <Field name="cv" component={CustomFileInput} />
          <Field className="hide" name="captcha" />
        </div>
        <div className="checkbox-row">
          <Field name="agree" id="agree" type="checkbox" checked={values.agree} />
          <label className={errors.agree && touched.agree ? 'with-error' : values.agree !== '' ? 'touched' : touched.agree ? 'touched' : null} htmlFor="agree">I agree to recruitmen agreements.</label>
        </div>
        <div>
          <button disabled={false} className="btn btn--blue btn--blue-white" type="submit">
            {false ? "Wait" : "Submit"}
          </button>
        </div>
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
        button {
          margin: 40px 0 0 0;
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
  handleSubmit: (values) => {
    const formData = new FormData()
    for (let key in values) {
      formData.append(key, values[key])
    }
    console.log(formData)
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema
}

export default withFormik(formikOptions)(OfferContactForm)