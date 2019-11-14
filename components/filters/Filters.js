import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setFilters } from '../../store/actions/index'
import { withFormik, Form, Field } from 'formik'
import CustomSelect from '../ui/CustomSelect'
import Slider from './Slider'
import { experienceSelect } from '../../helpers/consts'

const Filters = ({ setFilters, resetForm, offers }) => {

  const cities = []
  const wages = []
  let minmaxWage = []

  for (let offer of offers.offers) {
    cities.push(offer.city)
    wages.push(offer.salary_from)
    wages.push(offer.salary_to)
    minmaxWage = [Math.min(...wages), Math.max(...wages)]
  }

  const [currentValues, setCurrentValues] = useState([minmaxWage[0], minmaxWage[1]])
  
  const [wagesRange, setWagesRange] = useState([])

  useEffect(() => {
    setWagesRange([minmaxWage[0], minmaxWage[1]])    
  }, [])

  useEffect(() => {
    if (Object.values(offers.filters).flat().length === 0) {
      setWagesRange([minmaxWage[0], minmaxWage[1]])
      setCurrentValues([minmaxWage[0], minmaxWage[1]])
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

  const handleSliderChange = (value) => {
    if (value.max === value.values[1] && value.min === value.values[0]) {
      setFilters({
        filter: 'salary',
        value: 'all'
      })
    } else {
      setFilters({
        filter: 'salary',
        value: value.values
      })
    }
    setWagesRange(value.values)
  }

  return (
    <div className="wrapper">
      <div className="filters">
        <Form >
          <p>Filters:</p>
          <div className="filters__form">         
            <Field onSetFilter={handleSetFilter} name="city" component={CustomSelect} placeholder="City" options={['All', ...new Set(cities)]}/>
            <Field onSetFilter={handleSetFilter} name="experience_level" component={CustomSelect} placeholder="Experience" options={['All', ...experienceSelect]}/>
            <Field onSetFilter={handleSetFilter} name="remote" component={CustomSelect} placeholder="Remote" options={['All', 'Remote Only', 'Office Only']}/>
          </div>
        </Form>
        <div className="slider hide-tablet">
            <Slider currentValues={currentValues} setCurrentValues={setCurrentValues} handleSliderChange={handleSliderChange}  minmaxWage={minmaxWage} wagesRange={wagesRange}/>
        </div>
      </div>
      <style jsx>
        {`
          .wrapper {
            position: relative;
            z-index: 2;
            width: 100%;
            background-color: #fff;
            display: flex;
            justify-content: center;
            padding: 10px 0;
            box-shadow: 0px 4px 5px 0px rgba(104,111,151,0.2);
          }
          .filters {
            display: flex;
            align-items: center;
          }
          .filters p {
            margin: 0 0 10px 0;
          }
          .slider {
            width: 250px;
          }
          @media (max-width: 550px) {
            .filters__form {
              flex-direction: column;
            }
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