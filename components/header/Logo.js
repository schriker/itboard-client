import Link from 'next/link'
import LogoSVG from '../../static/logo.svg'

const Logo = (props) => {
  return(
    <div>
      <Link href="/page/[page]" as="/page/1"> 
        <a className={props.black ? 'black' : null}>
          <LogoSVG />
          <span>Board</span>
        </a>
      </Link>
        <style jsx>{`
        div {
            width: ${props.black ? '100%' : 'auto'};
            display: flex;
            justify-content: center;
        }
        a {
          display: flex;
          flex: 0 1 250px;
          align-items: center;
          margin-right: 22px;
          color: #fff;
          font-weight: 600;
          font-size: 24px;
        }
        a:hover {
          color: #fff;
        }
        span {
          margin-left: 8px;
        }
        .black {
          flex: 0 1 200px;
          margin: 70px 0;
          justify-content: center;
        }
        .black span {
          color: #1f1f1f;
        }
        @media (max-width: 550px) {
          .black {
            margin: 30px 0;
          }
        }
        `}</style>
    </div>
  )
}

export default Logo