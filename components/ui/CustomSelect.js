import { useState, useRef, useEffect } from 'react'
import useDropdown from '../../hooks/useDropdown'

const CustomSelect = ({ field, form, options, placeholder, onSetFilter }) => {

  const [selectOptions, setSelectOptions] = useState(options)
  const [cursor, setCursor] = useState(0)
  const { ref, isOpen, setIsOpen } = useDropdown(false) 
  const inputRef = useRef()
  const dropdownRef = useRef()

  useEffect(() => {
    if (field.value === '') {
      setSelectOptions(options)
    }
  }, [field.value])

  const handleSelect = (value, index) => {
      if (value) {
        form.setFieldValue(field.name, value)
        if (onSetFilter) {
          onSetFilter(field.name, value)
        }
      }
      setIsOpen(false)
      setCursor(index)
  }

  const handleChange = (event) => {
    const value = event.target.value
    if (event.keyCode === 13 && isOpen) {
      event.preventDefault()
      handleSelect(selectOptions[cursor], 0)
    } else if (event.keyCode === 38 && cursor > 0 && isOpen) {
      dropdownRef.current.scrollTop = dropdownRef.current.scrollTop - 30
      setCursor(cursor - 1)
    } else if (event.keyCode === 40 && cursor < selectOptions.length - 1 && isOpen) {
      dropdownRef.current.scrollTop = dropdownRef.current.scrollTop + 30
      setCursor(cursor + 1)
    } else {
      const filterOptions = options.filter(option => option.toLowerCase().includes(value.toLowerCase()))
      setIsOpen(true)
      setSelectOptions(filterOptions)
      form.setFieldValue(field.name, value)
    }
  }

  const onFocusHandler = () => {
    setIsOpen(true)
    form.setFieldTouched(field.name, true)
  }

  let list = selectOptions.map((option, index) => <li aria-selected={field.value === option} key={option} className={field.value === option || index === cursor ? 'selected' : null} onMouseDown={() => handleSelect(option, index)}>{option}</li>)

  if (selectOptions.length === 0) {
    list = <li>No results.</li>
  }

  return (
    <div className="input-row" ref={ref} aria-expanded={isOpen}>
      <input 
          {...field}
          ref={inputRef}
          onMouseDown={() => setIsOpen(true)}
          onFocus={() => onFocusHandler()}
          onBlur={() => setIsOpen(false)}
          onKeyDown={(event) => handleChange(event)}
          type="text"
          value={field.value}
          id={field.name} 
          name={field.name}
          autoComplete="off"
          onChange={(event) => handleChange(event)}
          className={form.errors[field.name] && form.touched[field.name] ? 'with-error' : form.values[field.name] !== '' ? 'touched' : form.touched[field.name] ? 'touched' : null} />
        <i className={ isOpen ? 'fas fa-angle-down rotate' : 'fas fa-angle-down'}></i>
        <label htmlFor={field.name}>{placeholder}</label>
        <div ref={dropdownRef} className="dropdown">
          <ul className="select-list" tabIndex="-1">
            { list }
          </ul>
        </div>
        <style global jsx>{`
        .select-list li {
            color: #1f1f1f;
            padding: 10px 15px;
            list-style: none;
            border-bottom: 1px solid #1f1f1f;
          }
          .selected {
            color: #fff !important;
            background-color: #1f1f1f;  
          }
          .select-list li:last-child {
            border-bottom: 0;
          }
          .select-list li:hover {
            cursor: pointer;
            color: #fff;
            background-color: #1f1f1f;  
          }
          `}</style>
        <style jsx>{`
          .input-row {
            position: relative;
          }
          .dropdown {
            background-color: #fff;
            z-index: 7;
            width: 100%;
            max-height: 232px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;
            position: absolute;
            display: ${isOpen ? 'block' : 'none'};
            overflow-y: auto;
          }
          i {
            top: 50%;
            right: 25px;
            font-size: 20px;
            position: absolute;
            z-index: 6;
            color: #0069ff;
            transition: all .1s ease-in-out;
            transform: translate(0,-50%);
          }
          .rotate {
            transform: translate(0,-50%) rotate(-180deg);
          }
          `}</style>
    </div>
  )
}
export default CustomSelect