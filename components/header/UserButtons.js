import Link from 'next/link'
import UserDropdown from './UserDropdown'
import { connect } from 'react-redux'

const UserButtons = (props) => {

  let userButton = <Link href="/user/login">
                    <a className="btn btn--blue"><i className="far fa-user"></i>Login</a>
                  </Link>

  if (props.auth.user) {
    userButton = <UserDropdown />
  }

  return (
    <div>
      <Link href="/offer/create">
        <a className="btn btn--yellow">Create Offer</a>
      </Link>
      <span> - or - </span>
      {userButton}
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }
        span {
          white-space: nowrap;
          margin: 0 10px;
        }
        @media (max-width: 1180px) {
          div {
            flex-direction: column;
            margin: 0 0 20px 0;
          }
          span {
            margin: 10px 0;
          }
        }
        `}</style>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(UserButtons)