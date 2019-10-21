import { withFormik, Form, Field } from 'formik'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { newOfferDetials } from '../../store/actions/index'
import CustomSelect from '../ui/CustomSelect'
import CustomInput from '../ui/CustomInput'
const LocationMap = dynamic(
  () => import('../googleMaps/LocationMap'),
  {ssr: false}
)
import ImageUpload from '../ui/ImageUpload'
import Notification from '../ui/Notifiaction'
import { agreements, languagesArr, experienceSelect, currencySelect, contractSelect } from '../../helpers/consts'
import validationSchema from './validationSchema'
import useScrollToTop from '../../hooks/useScrollToTop'

const technologySelect = languagesArr.map((language) => language.name)

const DetailsForm = ({ values, errors, touched, isValidating, isSubmitting }) => {

  useScrollToTop()
  const [withErrors, setWithErrors] = useState(false)

  useEffect(() => {
    if (errorsArray.length > 0  && !isSubmitting && !isValidating) {
      setWithErrors(true)
    } else if (withErrors) {
      setWithErrors(false)
    }
  }, [isValidating, isSubmitting])

  const errorsArray = [...new Set(Object.values(errors))]

  return (
    <div className="white-box wrapper">
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
        <div className="row">
          <h2>General info</h2>
          <div className="inputs">
            <Field name="company_logo" component={ImageUpload}/> 
            <Field name="company_name" component={CustomInput} placeholder="Company"/>   
            <Field name="company_website" component={CustomInput} placeholder="Website"/>   
            <Field name="company_size" component={CustomInput} placeholder="Company size"/>             
            <Field name="technology" component={CustomSelect} placeholder="Technology" options={technologySelect}/>
          </div>
        </div>
        <div className="row">
          <h2>Position info</h2>
          <div className="inputs">
            <Field name="position_name" component={CustomInput} placeholder="Position name"/>   
            <Field name="experience_level" component={CustomSelect} placeholder="Experience" options={experienceSelect}/>
            <Field name="salary_from" component={CustomInput} placeholder="Salary from"/>   
            <Field name="salary_to" component={CustomInput} placeholder="Salary to"/>   
            <Field name="salary_currency" component={CustomSelect} placeholder="Currency" options={currencySelect}/>
            <Field name="contract_type" component={CustomSelect} placeholder="Contract type" options={contractSelect}/>
          </div>
        </div>
        <div className="row">
          <h2>Location</h2>
          <Field name="location" component={LocationMap} />
        </div>
        <div className="row">
          <h2>Agreements</h2>
          <div className="inputs agreements">
            <div className="input-row">
              <Field className={errors.agreements && touched.agreements ? 'with-error' : values.agreements !== '' ? 'touched' : touched.agreements ? 'touched' : null} name="agreements" component="textarea" />
            </div>
            <Field name="apply_link" component={CustomInput} placeholder="E-mail or link to aply"/>   
            <div className="checkbox-row">
              <Field name="remote" id="remote" type="checkbox" checked={values.remote} />
              <label htmlFor="remote">Fully remote?</label>
            </div>
            <div>
              <button className="btn btn--blue btn--blue-white" type="submit">Done</button>
            </div>
          </div>
        </div>
      </Form>
      <style jsx>{`
        h2 {
          padding: 8px 20px;
          font-weight: 400;
          border-bottom: #dadce7 1px solid;
          border-left: #0069ff 4px solid;
          font-size: 18px;
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
        `}</style>
    </div>
  )
}

const formikOptions = {
  mapPropsToValues: ({ offer }) => ({
    company_name: offer.company_name || '',
    company_website: offer.company_website || '',
    company_size: offer.company_size || '',
    company_logo: offer.company_logo || null,
    technology: offer.technology || '',
    position_name: offer.position_name || '',
    experience_level: offer.experience_level || '',
    salary_from: offer.salary_from || '',
    salary_to: offer.salary_to || '',
    salary_currency: offer.salary_currency || '',
    contract_type: offer.contract_type || '',
    city: offer.city || '',
    location: offer.location || '',
    address_components: offer.address_components || [],
    lat: offer.lat || '',
    lng: offer.lng || '',
    agreements: offer.agreements || agreements,
    apply_link: offer.apply_link || '',
    remote: offer.remote || false
  }),
  handleSubmit: (values, { props }) => {
    props.newOfferDetails(values)
    props.submitOffer()
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema
}

const mapStateToProps = (state) => ({
  offer: state.offers.newOffer
})

const mapDispatchToProps = (dispatch) => ({
  newOfferDetails: (values) => dispatch(newOfferDetials(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(withFormik(formikOptions)(DetailsForm))