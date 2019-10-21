import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import CustomInput from '../ui/CustomInput'

const OfferContactForm = ({ values, errors }) => {
  return (
    <div className="wrapper">
      <Form>
        <div className="inputs">
          <Field name="email" component={CustomInput} placeholder="Email" />
          <Field name="name" component={CustomInput} placeholder="Full name" />
          <Field name="message" placeholder="Short introduction" component="textarea" />
        </div>
        <div className="checkbox-row">
          <Field name="agree" id="agree" type="checkbox" checked={values.agree} />
          <label htmlFor="agree">I agree to recruitmen agreements.</label>
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
    cv: null
  }),
  handleSubmit: (values) => {
    console.log(values)
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema
}

export default withFormik(formikOptions)(OfferContactForm)