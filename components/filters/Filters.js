import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setFilters } from '../../store/actions/index'
import { withFormik, Form, Field } from 'formik'
import CustomSelect from '../ui/CustomSelect'
import { experienceSelect } from '../../helpers/consts'

const Filters = ({ setFilters, resetForm, offers }) => {

  const cities = []

  useEffect(() => {
    if (Object.values(offers.filters).flat().length === 0) {
      resetForm()
    }
  }, [offers.filters])

  const handleSetFilter = (fieldName, value) => {
    if (value && fieldName) {
      if (fieldName === 'remote') {
        const isRemote = value === 'Remote Only' ? true : false
        setFilters({
          filter: fieldName,
          value: isRemote
        })
      } else {
        setFilters({
          filter: fieldName,
          value: value.toLowerCase()
        })
      }
    }
  }

  for (let offer of offers.offers) {
    cities.push(offer.city)
  }

  return (
    <div className="wrapper">
      <div className="filters">
        <p>Filters:</p>
        <Form className="filters__form">
          <Field onSetFilter={handleSetFilter} name="city" component={CustomSelect} placeholder="City" options={['All', ...new Set(cities)]}/>
          <Field onSetFilter={handleSetFilter} name="experience_level" component={CustomSelect} placeholder="Experience" options={['All', ...experienceSelect]}/>
          <Field onSetFilter={handleSetFilter} name="remote" component={CustomSelect} placeholder="Remote" options={['All', 'Remote Only', 'Office Only']}/>
        </Form>
      </div>
      <style jsx>
        {`
          .wrapper {
            position: relative;
            z-index: 2;
            width: 100%;
            background-color: #f0f1f7;
            display: flex;
            justify-content: center;
            padding: 10px 0;
            box-shadow: 0px 4px 5px 0px rgba(104,111,151,0.2);
          }
          .filters p {
            margin: 0 0 10px 0;
          }
        `}
      </style>
    </div>
  )
}

const formikOptions = {
  mapPropsToValues: () => ({
    city: '',
    experience_level: '',
    remote: ''
  }),
  handleSubmit: () => {

  },
  validateOnBlur: false,
  validateOnChange: false,
}

const mapStateToProps = (state) => ({
  offers: state.offers
})

const mapDispatchToProps = (dispatch) => ({
  setFilters: (filter) => dispatch(setFilters(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(withFormik(formikOptions)(Filters))