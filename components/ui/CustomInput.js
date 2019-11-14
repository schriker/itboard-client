const CustomInput = ({ field, form, placeholder, password }) => {
  return (
    <div className="input-row">
      <input {...field} className={form.errors[field.name] && form.touched[field.name] ? 'with-error' : form.values[field.name] !== '' ? 'touched' : form.touched[field.name] ? 'touched' : null} id={field.name} type={password ? 'password' : 'text'} name={field.name} />
      <label htmlFor={field.name}>{placeholder}</label>
    </div>
  )
}

export default CustomInput