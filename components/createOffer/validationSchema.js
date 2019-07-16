import * as Yup from 'yup'
import { languagesArr, experienceSelect, currencySelect, contractSelect, agreements } from '../../helpers/consts'

const technologySelect = languagesArr.map((language) => language.name)

const validationSchema = Yup.object().shape({
  company_name: Yup.string()
    .required('Company name is required.'),
  company_website: Yup.string()
    .url('Provide correct url ex. https://google.com')
    .required('Company website is required.'),
  company_size: Yup.number('Company size must be a number.')
    .positive('Only positive numbers as company szie.')
    .integer('Company size must be an integer.')
    .required('Company size is required.'),
  company_logo: Yup.mixed()
    .required('Logo is required.'),
  technology: Yup.mixed()
    .oneOf(technologySelect, 'Technology must be one from available values.')
    .required('Technology is required.'),
  position_name: Yup.string()
    .required('Position name is required.'),
  experience_level: Yup.mixed()
    .oneOf(experienceSelect, 'Experience must be one from available values.')
    .required('Experience level is required.'),
  salary_from: Yup.number('Salary must be a number.')
    .positive('Salary must be positive.')
    .integer('Salary must be an integer.')
    .required('Salary is required.'),
  salary_to: Yup.number('Salary must be a number.')
    .positive('Salary must be positive.')
    .integer('Salary must be an integer.')
    .required('Salary is required.'),
  salary_currency: Yup.mixed()
    .oneOf(currencySelect, 'Currency must be one from available values.')
    .required('Currency is required.'),
  contract_type: Yup.mixed()
    .oneOf(contractSelect, 'Contract must be one from available values.')
    .required('Contract type is required.'),
  location: Yup.string()
    .required('Location is required.'),
  address_components: Yup.array()
    .required('Location is required.'),
  lat: Yup.number()
    .required('Location is required.'),
  lng: Yup.number()
    .required('Location is required.'),
  agreements: Yup.mixed()
    .notOneOf([agreements], 'Pleas fill agreements.')
    .required('Agreements field is required.'),
  apply_link: Yup.string()
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))$/, 'Pleas provide correct email or url ex. https://google.com to apply.')
    .required('Pleas provide correct email or url ex. https://google.com to apply.'),
  remote: Yup.boolean()
})

export default validationSchema