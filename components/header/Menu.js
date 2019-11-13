import Link from 'next/link'
import { withRouter } from 'next/router'

const Menu = ({ router }) => {

  const links = [
    {
      text: 'About',
      href: ''
    },
    {
      text: 'Contact',
      href: ''
    },
    {
      text: 'Help',
      href: ''
    },
    {
      text: 'Faq',
      href: ''
    },
    {
      text: <i className="fab fa-facebook-f"></i>,
      href: ''
    }
  ]

  return (
    <ul>
      {links.map(link => (
          <li key={link.text}>
            <Link href={link.href}>
              <a className={router.pathname === link.href ? 'active' : null}>{link.text}</a>
            </Link>
          </li>
        ))
      }
      <style jsx>{`
        ul {
          flex: 1 1 100%;
          display: flex;
        }
        li {
          list-style: none;
        }
        a {
          color: #a8b0bd;
          padding-bottom: 5px;
          margin-right: 22px;
          border-bottom: 2px solid transparent;
          transition: all .2s ease-in-out;
        }
        a:hover,
        .active {
          color: #fff;
          border-bottom: 2px solid #0766ee;
        }
        `}</style>
    </ul>
  )
}

export default withRouter(Menu)