import { withFormik, Form, Field } from 'formik'
import CustomSelect from '../ui/CustomSelect'
import * as Yup from 'yup'

const DetailsForm = ({ values, errors, touched }) => {
  return (
    <div className="white-box wrapper">
      <Form>
        <div className="row">
          <h3>Position info</h3>
          <div className="inputs">
            <div className="input-row">
              <Field className={errors.position_name && touched.position_name ? 'with-error' : values.position_name !== '' ? 'touched' : touched.position_name ? 'touched' : null} id="position_name" type="text" name="position_name" />
              <label htmlFor="position_name">Position name</label>
            </div>
        <Field name="select" component={CustomSelect} placeholder="Select..." options={["Opcja 1", "Opcja 2", "Opcja 23"]}/>

            {/* <div className="input-row">
              <Field className={errors.experience_level && touched.experience_level ? 'with-error' : values.experience_level !== '' ? 'touched' : touched.experience_level ? 'touched' : null} id="experience_level" type="text" name="experience_level" />
              <label htmlFor="experience_level">Experience </label>
            </div> */}
            <div className="input-row">
              <Field className={errors.salary_from && touched.salary_from ? 'with-error' : values.salary_from !== '' ? 'touched' : touched.salary_from ? 'touched' : null} id="salary_from" type="text" name="salary_from" />
              <label htmlFor="salary_from">Salary from</label>
            </div>
            <div className="input-row">
              <Field className={errors.salary_to && touched.salary_to ? 'with-error' : values.salary_to !== '' ? 'touched' : touched.salary_to ? 'touched' : null} id="salary_to" type="text" name="salary_to" />
              <label htmlFor="salary_to">Salary to</label>
            </div>
            <div className="input-row">
              <Field className={errors.salary_currency && touched.salary_currency ? 'with-error' : values.salary_currency !== '' ? 'touched' : touched.salary_currency ? 'touched' : null} id="salary_currency" type="text" name="salary_currency" />
              <label htmlFor="salary_currency">Currency</label>
            </div>
            <div className="input-row">
              <Field className={errors.contract_type && touched.contract_type ? 'with-error' : values.contract_type !== '' ? 'touched' : touched.contract_type ? 'touched' : null} id="contract_type" type="text" name="contract_type" />
              <label htmlFor="contract_type">Contract type</label>
            </div>
          </div>
        </div>
      </Form>
      <style jsx>{`
        .row {

        }
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
          grid-template-columns: auto auto;
          grid-template-rows: auto;
          grid-column-gap: 40px;
          grid-row-gap: 10px;
        }
        .wrapper {
          flex: 0 1 935px;
        }
        `}</style>
    </div>
  )
}

const validationSchema = Yup.object().shape({

})

const formikOptions = {
  mapPropsToValues: () => ({
    select: '',
    position_name: '',
    experience_level: '',
    salary_from: '',
    salary_to: '',
    salary_currency: '',
    contract_type: ''
  })
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  login: (values) => dispatch(userLogin(values))
})

export default withFormik(formikOptions)(DetailsForm)