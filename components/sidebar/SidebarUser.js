import Link from 'next/link'
import { withRouter } from 'next/router'

const SidebarUser = ({ router }) => {
  const links = [
    {
      text: 'Dashboard',
      icon: 'fa-tachometer-alt',
      href: '/user/dashboard',
    },
    {
      text: 'Settings',
      icon: 'fa-cog',
      href: '/user/settings',
    },
  ]

  return (
    <ul>
      {links.map((link) => (
        <li key={link.text}>
          <Link href={link.href}>
            <a className={router.pathname === link.href ? 'active' : null}>
              <i className={`fas ${link.icon}`}></i>{link.text}
            </a>
          </Link>
        </li>
      ))}
      <style jsx>{`
        a {
          color: #fff;
          display: flex;
          align-items: center;
          padding: 7px 20px 7px 20px;
          margin-bottom: 10px;
          user-select: none;
          transition: all 0.1s ease-in-out;
        }
        a i {
          color: #546f8e;
          margin-right: 15px;
        }
        a:hover,
        a.active {
          background-color: #113661;
          cursor: pointer;
        }
      `}</style>
    </ul>
  )
}

export default withRouter(SidebarUser)
