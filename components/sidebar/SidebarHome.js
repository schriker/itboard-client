import { connect } from 'react-redux'
import { setLanguages } from '../../store/actions/index'
import SidebarHomeItem from './SidebarHomeItem'
import { languagesArr as languages } from '../../helpers/consts'

const SidebarHome = (props) => {
  const onClickHandler = (isSelected, language) => {
    isSelected ? removeLanguage(language) : addLanguage(language)
  }

  const addLanguage = (language) => {
    const languages = [...props.filters.technology, language.toLowerCase()]
    props.setLanguage(languages)
  }

  const removeLanguage = (language) => {
    const languages = props.filters.technology.filter(
      (item) => item !== language.toLowerCase()
    )
    props.setLanguage(languages)
  }

  return (
    <>
      <ul>
        {languages.map((item) => {
          const isSelected = props.filters.technology.includes(
            item.name.toLowerCase()
          )
          return (
            <SidebarHomeItem
              isSelected={isSelected}
              item={item}
              onClickHandler={onClickHandler}
              key={item.name}
            />
          )
        })}
      </ul>
      <style jsx>{`
        ul {
          position: relative;
          z-index: 1;
          margin-bottom: 80px;
        }
        @media (max-width: 1180px) {
          ul {
            margin-bottom: 0;
          }
        }
      `}</style>
    </>
  )
}

const mapStateToProps = (state) => ({
  filters: state.offers.filters,
})

const mapDispatchToProps = (disptach) => ({
  setLanguage: (language) => disptach(setLanguages(language)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHome)
