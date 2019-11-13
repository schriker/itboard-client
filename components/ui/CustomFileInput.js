const CustomFileInput = ({ field, form }) => {
  return (
    <div>
      <input accept="application/pdf" className={form.errors[field.name] && form.touched[field.name] ? 'with-error' : form.values[field.name] !== '' ? 'touched' : form.touched[field.name] ? 'touched' : null} id={field.name} name={field.name} type="file" onChange={(event) => {
      form.setFieldValue(field.name, event.currentTarget.files[0])
      }} />
      {!field.value && <label htmlFor={field.name}><i className="fas fa-file-pdf"></i>Upload CV (.pdf)</label>}
      {field.value && <label htmlFor={field.name}><i className="fas fa-file-pdf"></i>{field.value.name}</label>}
      <style jsx>{`
        div {
          position: relative;
          height: 150px;
        }
        input {
          visibility: hidden;
        }
        .with-error + label {
          border-color: #e61340;
        } 
        label {
          display: flex;
          align-items: center;
          padding: 0 0 0 25px;
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 150px;
          border: 1px solid #1f1f1f;
          border-bottom: 5px solid #1f1f1f;
        }
        label:hover {
          border-color: #095beb;
        }
        label i {
          font-size: 32px;
          margin: 0 20px 0 0;
        }
        `}</style>
    </div>
  )
}

export default CustomFileInput