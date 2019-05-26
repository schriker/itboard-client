import Link from 'next/link'
import Logo from '../header/Logo'
import Menu from '../header/Menu'

const Header = () => {
  return (
    <header>
      <Logo />
      <Menu />
      <div>
        <Link href="/create-offer">
          <a className="btn btn--yellow">Create Offer</a>
        </Link>
        <span> - or - </span>
        <Link href="/login">
          <a className="btn btn--blue"><i className="far fa-user"></i>Login</a>
        </Link>
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
        span {
          white-space: nowrap;
          margin: 0 10px;
        }
        i {
          margin-right: 10px;
        }
        `}</style>
    </header>
  )
}

export default Header