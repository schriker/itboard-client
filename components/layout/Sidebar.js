import { connect } from 'react-redux'
import { Fragment } from 'react'
import { setLanguages } from '../../store/actions/index'
import SidebarItem from '../sidebar/SidebarItem'
import { languagesArr as languages } from '../../helpers/consts'
import UserButtons from '../header/UserButtons'

const Sidebar = (props) => {

  let xDown = null                                                   
  let yDown = null

  const handleTouchStart = (evt) => {
    const firstTouch = evt.touches[0]                                 
    xDown = firstTouch.clientX                                 
    yDown = firstTouch.clientY                                    
  }                                               

  const handleTouchMove = (evt) => {
      if ( ! xDown || ! yDown ) {
          return
      }

      let xUp = evt.touches[0].clientX                                 
      let yUp = evt.touches[0].clientY

      let xDiff = xDown - xUp
      let yDiff = yDown - yUp

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
          if ( xDiff > 0 ) {
            props.hide()
          }                      
      } 
      xDown = null
      yDown = null                                           
  }

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
    <Fragment>
      <aside onTouchMove={handleTouchMove} onTouchStart={handleTouchStart}>
        <div className="hide-large">
          <UserButtons />
        </div>
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
            width: 250px;
            color: #fff;
            grid-area: sidebar;
            padding-top: 30px;
            overflow-y: hidden;
            transition: all .2s ease;
          }
          aside > i:first-of-type {
            top: -65px;
            left: 0;
            transform: rotate(-15deg);
            position: absolute;
            font-size: 280px;
            color: #0c2d55;
            z-index: -1;
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
          @media (max-width: 1180px) {
            aside {
              overflow-y: auto;
              overflow-x: hidden;
              transform: translateX(${props.show ? '0px' : '-300px'});
            }
            ul {
              margin-bottom: 0;
            }
          }
          `}</style>
      </aside>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  filters: state.offers.filters
})

const mapDispatchToProps = (disptach) => ({
  setLanguage: (language) => disptach(setLanguages(language))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)