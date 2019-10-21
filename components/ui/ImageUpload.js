import { Fragment } from 'react'
import useFileReader from '../../hooks/useFileReader'

const ImageUpload = ({ field, form }) => {
  let thumb = undefined

  if (field.value) {
    thumb = useFileReader(field.value)
  }

  let thumbContent = <Fragment>
                      <i className="fas fa-image"></i>
                      <span>Comapny Logo</span>
                    </Fragment>

  if (thumb) {
    thumbContent = <img src={thumb} alt="Company Logo"/>
  }

  return (
  <div className="file-input">
    <input accept="image/png, image/jpeg" className={form.errors[field.name] && form.touched[field.name] ? 'with-error image-input' : form.values[field.name] !== '' ? 'touched image-input' : form.touched[field.name] ? 'touched image-input' : null} id={field.name} name={field.name} type="file" onChange={(event) => {
      form.setFieldValue(field.name, event.currentTarget.files[0])
    }} />
    <div className="thumb-preview">
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