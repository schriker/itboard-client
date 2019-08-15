import { connect } from 'react-redux'
import { setLanguages, clearFilters } from '../../store/actions/index'
import SidebarItem from '../sidebar/SidebarItem'
import { languagesArr as languages } from '../../helpers/consts'
import ClearFilters from '../clearFilters/ClearFilters'

const Sidebar = (props) => {
  let filtersCount = 0
  Object.entries(props.filters).forEach(([key, value]) => filtersCount += value.length)

  const onClickHandler = (isSelected, language) => {
    isSelected ? removeLanguage(language) : addLanguage(language)
  }

  const addLanguage = (language) => {
    const languages = [
      ...props.filters.technology,
      language.toLowerCase()
    ]
    props.setLanguage(languages)
  }

  const removeLanguage = (language) => {
    const languages = props.filters.technology.filter(item => item !== language.toLowerCase())
    props.setLanguage(languages)
  }

  return (
    <aside>
      <ClearFilters clearFilters={() => props.clearFilters()} filtersNumber={filtersCount} />
      <i className="far fa-file-code"></i>
      <ul>
        {languages.map(item => {
          const isSelected = props.filters.technology.includes(item.name.toLowerCase())
          return (
              <SidebarItem isSelected={isSelected} item={item} onClickHandler={onClickHandler} key={item.name}/>
            )
          })
        }
      </ul>
      <style jsx>{`
        aside {
          min-height: calc(100vh - 70px); 
          position: relative;
          background-color: #08294f;
          width: 280px;
          color: #fff;
          grid-area: sidebar;
          padding-top: 30px;
          overflow-y: hidden;
        }
        aside > i:first-of-type {
          top: -65px;
          left: 0;
          transform: rotate(-15deg);
          position: absolute;
          font-size: 280px;
          color: #0c2d55;
          z-index: 0;
        }
        .hide {
          position: absolute;
          opacity: 0;
          visibility: none;
        }
        ul {
          position: relative;
          z-index: 1;
          margin-bottom: 80px;
        }
        `}</style>
    </aside>
  )
}

const mapStateToProps = (state) => ({
  filters: state.offers.filters
})

const mapDispatchToProps = (disptach) => ({
  setLanguage: (language) => disptach(setLanguages(language)),
  clearFilters: () => disptach(clearFilters())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)