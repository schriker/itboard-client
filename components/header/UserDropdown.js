import Link from 'next/link'
import useDropdown from '../../hooks/useDropdown'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

const UserDropdown = (props) => {

  const { ref, isOpen, setIsOpen } = useDropdown(false) 

  return (
    <div ref={ref}>
      <a onClick={() => setIsOpen(true)} className="btn btn--blue"><i className="far fa-user"></i>User</a>
      <div className="dropdown">
        <div className="arrow-up"></div>
        <ul className="white-box">
          <li>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <a onClick={() => props.logout()}>Logout</a>
          </li>
        </ul>
      </div>
      <style jsx>{`
        div a {
          display: block;
        }
        .dropdown {
          position: relative;
          display: ${isOpen ? 'block' : 'none'};
        }
        .arrow-up {
          position: absolute;
          left: 50%;
          top: 8px;
          transfrom: translate(-50%, 0);
        }
        div ul {
          top: 13px;
          width: 100%;
          position: absolute;
          transition: all .1s ease-in-out;
          list-style: none;
        }
        div ul li {
          border-bottom: 1px solid #c3c6d8;
        }
        div ul li a {
          padding: 10px 18px;
          display: block;
        }
        div ul li a:hover {
          cursor: pointer;
        }
        `}</style>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.userLogOut())
})

export default connect(null, mapDispatchToProps)(UserDropdown)