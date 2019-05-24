import Link from 'next/link'

const Logo = () => {
  return(
    <Link href="/"> 
      <a>
        <img src="/static/logo.svg" alt="ITBoards" /><span>Board</span>
        <style jsx>{`
        a {
          display: flex;
          flex: 1 1 250px;
          align-items: center;
          margin-right: 22px;
          color: #f0f1f7;
          font-weight: 600;
          font-size: 24px;
        }
        img {
          margin-right: 8px;
        }
        `}</style>
      </a>
    </Link>
  )
}

export default Logo