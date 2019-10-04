import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setFilters } from '../../store/actions/index'
import { withFormik, Form, Field } from 'formik'
import CustomSelect from '../ui/CustomSelect'
import { experienceSelect } from '../../helpers/consts'

const Filters = ({ setFilters, resetForm, offers }) => {

  useEffect(() => {
    if (Object.values(offers.filters).flat().length === 0) {
      resetForm()
    }
  }, [offers.filters])

  const handleSetFilter = (fieldName, value) => {
    if (value && fieldName) {
      setFilters({
        filter: fieldName,
        value
      })
    }
  }

  return (
    <div className="wrapper">
      <div className="filters">
        <p>Filters</p>
        <Form>
          <Field onSetFilter={handleSetFilter} name="experience_level" component={CustomSelect} placeholder="Experience" options={experienceSelect}/>
        </Form>
      </div>
      <style jsx>
        {`
          .wrapper {
            position: relative;
            z-index: 999;
            width: 100%;
            background-color: #f0f1f7;
            display: flex;
            justify-content: center;
            padding: 20px 0 30px 0;
            box-shadow: 0px 4px 5px 0px rgba(104,111,151,0.2);
          }
          .filters {

          }
        `}
      </style>
    </div>
  )
}

const formikOptions = {
  mapPropsToValues: () => ({
    experience_level: '',
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