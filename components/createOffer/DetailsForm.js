import { withFormik, Form, Field } from 'formik'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { newOfferDetials } from '../../store/actions/index'
import CustomSelect from '../ui/CustomSelect'
import CustomInput from './CustomInput'
import LocationMap from '../createOffer/LocationMap'
import ImageUpload from '../ui/ImageUpload'
import Notification from '../ui/Notifiaction'
import { agreements } from '../../helpers/agreements'
import { languagesArr } from '../../helpers/languages'
import * as Yup from 'yup'

const technologySelect = languagesArr.map((language) => language.name)

const experienceSelect = [
  'Junior',
  'Mid',
  'Senior'
]

const currencySelect = [
  'PLN',
  'USD',
  'EUR'
]

const contractSelect = [
  'Permanent',
  'B2B',
  'Contract'
]

const DetailsForm = ({ values, errors, touched }) => {

  const [withErrors, setWithErrors] = useState(false)

  useEffect(() => {
    if (errorsArray.length > 0) {
      setWithErrors(true)
    } else if (withErrors) {
      setWithErrors(false)
    }
  }, [errors])

  const errorsArray = [...new Set(Object.values(errors))]

  return (
    <div className="white-box wrapper">
    {withErrors && <Notification type="error" close={() => setWithErrors(false)}>
      <p>Something went wrong :(</p>
      <ul>
        {errorsArray.map((error, index) => {
            return <li key={index}>{error}</li>
          }
        )}
      </ul>
    </Notification>}
      <Form>
        <div className="row">
          <h3>General info</h3>
          <div className="inputs">
            <Field name="company_logo" component={ImageUpload}/> 
            <Field name="company_name" component={CustomInput} placeholder="Company"/>   
            {/* <div className="input-row">
              <Field className={errors.company_name && touched.company_name ? 'with-error' : values.company_name !== '' ? 'touched' : touched.company_name ? 'touched' : null} id="company_name" type="text" name="company_name" />
                <label htmlFor="company_name">Company</label>
            </div> */}
            <div className="input-row">
              <Field className={errors.company_website && touched.company_website ? 'with-error' : values.company_website !== '' ? 'touched' : touched.company_website ? 'touched' : null} id="company_website" type="text" name="company_website" />
                <label htmlFor="company_website">Website</label>
            </div>
            <div className="input-row">
              <Field className={errors.company_size && touched.company_size ? 'with-error' : values.company_size !== '' ? 'touched' : touched.company_size ? 'touched' : null} id="company_size" type="text" name="company_size" />
                <label htmlFor="company_size">Company size</label>
            </div>
            <Field name="technology" component={CustomSelect} placeholder="Technology" options={technologySelect}/>
          </div>
        </div>
        <div className="row">
          <h3>Position info</h3>
          <div className="inputs">
            <div className="input-row">
              <Field className={errors.position_name && touched.position_name ? 'with-error' : values.position_name !== '' ? 'touched' : touched.position_name ? 'touched' : null} id="position_name" type="text" name="position_name" />
              <label htmlFor="position_name">Position name</label>
            </div>
            <Field name="experience_level" component={CustomSelect} placeholder="Experience" options={experienceSelect}/>
            <div className="input-row">
              <Field className={errors.salary_from && touched.salary_from ? 'with-error' : values.salary_from !== '' ? 'touched' : touched.salary_from ? 'touched' : null} id="salary_from" type="text" name="salary_from" />
              <label htmlFor="salary_from">Salary from</label>
            </div>
            <div className="input-row">
              <Field className={errors.salary_to && touched.salary_to ? 'with-error' : values.salary_to !== '' ? 'touched' : touched.salary_to ? 'touched' : null} id="salary_to" type="text" name="salary_to" />
              <label htmlFor="salary_to">Salary to</label>
            </div>
            <Field name="salary_currency" component={CustomSelect} placeholder="Currency" options={currencySelect}/>
            <Field name="contract_type" component={CustomSelect} placeholder="Contract type" options={contractSelect}/>
          </div>
        </div>
        <div className="row">
          <h3>Location</h3>
          <Field name="location" component={LocationMap} />
        </div>
        <div className="row">
          <h3>Agreements</h3>
          <div className="inputs agreements">
            <div className="input-row">
              <Field className={errors.agreements && touched.agreements ? 'with-error' : values.agreements !== '' ? 'touched' : touched.agreements ? 'touched' : null} name="agreements" component="textarea" />
            </div>
            <div className="input-row">
              <Field className={errors.apply_link && touched.apply_link ? 'with-error' : values.apply_link !== '' ? 'touched' : touched.apply_link ? 'touched' : null} id="apply_link" type="text" name="apply_link" />
              <label htmlFor="apply_link">E-mail or link to aply</label>
            </div>
            <div className="checkbox-row">
              <Field name="remote" id="remote" type="checkbox" />
              <label htmlFor="remote">Fully remote?</label>
            </div>
            <div>
              <button className="btn btn--blue btn--blue-white" type="submit">Done</button>
            </div>
          </div>
        </div>
      </Form>
      <style jsx>{`
        h3 {
          padding: 10px 20px;
          font-weight: 500;
          border-bottom: #dadce7 1px solid;
          border-left: #0069ff 4px solid;
          font-size: 16px;
          color: #1f1f1f;
          width: 100%;
        }
        .inputs {
          display: grid;
          padding: 40px 80px;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          grid-column-gap: 40px;
          grid-row-gap: 10px;
        }
        .checkbox-row {
          align-self: center;
          margin-bottom: 30px;
        }
        .agreements div:first-of-type {
          grid-column: 1 / 3;
        }
        .wrapper {
          flex: 0 1 935px;
          margin-bottom: 150px;
        }
        `}</style>
    </div>
  )
}

const validationSchema = Yup.object().shape({
  company_name: Yup.string().required('Company name is required.'),
  company_website: Yup.string().url('Provide correct url ex. https://google.com').required('Company website is required.'),
  company_size: Yup.number('Company size must be a number.').positive('Only positive numbers as company szie.').integer('Company size must be an integer.').required('Company size is required.'),
  company_logo: Yup.mixed().required('Logo is required.'),
  technology: Yup.mixed().oneOf(technologySelect, 'Technology must be one from available values.').required('Technology is required.'),
  position_name: Yup.string().required('Position name is required.'),
  experience_level: Yup.mixed().oneOf(experienceSelect, 'Experience must be one from available values.').required('Experience level is required.'),
  salary_from: Yup.number('Salary must be a number.').positive('Salary must be positive.').integer('Salary must be an integer.').required('Salary is required.'),
  salary_to: Yup.number('Salary must be a number.').positive('Salary must be positive.').integer('Salary must be an integer.').required('Salary is required.'),
  salary_currency: Yup.mixed().oneOf(currencySelect, 'Currency must be one from available values.').required('Currency is required.'),
  contract_type: Yup.mixed().oneOf(contractSelect, 'Contract must be one from available values.').required('Contract type is required.'),
  location: Yup.string().required('Location is required.'),
  address_components: Yup.array().required('Location is required.'),
  lat: Yup.number().required('Location is required.'),
  lng: Yup.number().required('Location is required.'),
  agreements: Yup.string().required('Agreements field is required.'),
  apply_link: Yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))$/, 'Pleas provide correct email or url ex. https://google.com to apply.').required('Pleas provide correct email or url ex. https://google.com to apply.'),
  remote: Yup.boolean()
})

const formikOptions = {
  mapPropsToValues: () => ({
    company_name: '',
    company_website: '',
    company_size: '',
    company_logo: null,
    technology: '',
    position_name: '',
    experience_level: '',
    salary_from: '',
    salary_to: '',
    salary_currency: '',
    contract_type: '',
    location: '',
    address_components: [],
    lat: '',
    lng: '',
    agreements: agreements,
    apply_link: '',
    remote: false
  }),
  handleSubmit: (values, { props }) => {
    props.newOfferDetails(values)
    props.submitOffer()
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema
}

const mapDispatchToProps = (dispatch) => ({
  newOfferDetails: (values) => dispatch(newOfferDetials(values))
})

export default connect(null, mapDispatchToProps)(withFormik(formikOptions)(DetailsForm))