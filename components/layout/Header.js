import UserButtons from '../header/UserButtons'
import Logo from '../header/Logo'
import Menu from '../header/Menu'
import './hamburgers.css'

const Header = (props) => {
  return (
    <header>
      <Logo />
      <Menu />
      <button onClick={props.toggleSidebar} className={`hamburger show-medium hamburger--squeeze ${props.open ? 'is-active' : ''}` } type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <div className="hide-medium">
        <UserButtons />
      </div>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          width: 100%;
          color: #a8b0bd;
          background-color: #1f1f1f;
          grid-area: header;
          padding: 0 50px;
        }
        div {
          display: flex;
          align-items: center;
        }
        .hamburger {
          display: none;
          cursor: pointer;
        }
        .hide-medium span {
          white-space: nowrap;
          margin: 0 10px;
        }
        @media (max-width: 1180px) {
          header {
            justify-content: space-between;
            padding: 15px;
          }
        }
        `}</style>
    </header>
  )
}

export default Header