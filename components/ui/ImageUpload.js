import { useEffect, useState, Fragment } from 'react'

const ImageUpload = ({ field, form }) => {
  const [thumb, setThumb] = useState(undefined)

  useEffect(() => {
    if (field.value) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setThumb(reader.result)
      }

      reader.readAsDataURL(field.value);
    }
  }, [field.value])

  let thumbContent = <Fragment>
                      <i className="fas fa-image"></i>
                      <span>Upload photo.</span>
                    </Fragment>

  if (thumb) {
  thumbContent = <img src={thumb} alt="Company Logo"/>
  }

  return (
  <div className="file-input">
    <input className={form.errors[field.name] && form.touched[field.name] ? 'with-error' : form.values[field.name] !== '' ? 'touched' : form.touched[field.name] ? 'touched' : null} id={field.name} name={field.name} type="file" onChange={(event) => {
      form.setFieldValue(field.name, event.currentTarget.files[0]);
    }} />
    <div>
      {thumbContent}
    </div>
    <style jsx>{`
      .file-input {
        position: relative;
        grid-row: 1 / 5;
      }
      `}</style>
  </div>
  )
}

export default ImageUpload