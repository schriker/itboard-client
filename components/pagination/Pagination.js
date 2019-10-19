import Link from 'next/link'
const Pagination = ({ currentPage, lastPage }) => {
  return (
    <nav>
      <ul>
        <li className={currentPage > 1 ? '' : 'disabled'}><Link href={`/?page=${currentPage - 1}`}><a rel="prev">Prev</a></Link></li>
        {[...Array(lastPage)]
          .map((i, index) => 
            <li key={index}>
              <Link href={`/?page=${index + 1}`}>
                <a className={index + 1 === currentPage ? 'active' : ''}>{index + 1}</a>
              </Link>
            </li>
          )
        }
        <li className={currentPage !== lastPage ? '' : 'disabled'}><Link href={`/?page=${currentPage + 1}`}><a rel="next">Next</a></Link></li>
      </ul>
      <style jsx>{`
        nav {
          flex: 1 1 auto;
          display: flex;
          justify-content: center;
          padding: 20px;
        }
        nav ul li {
          display: inline-block;
        }
        nav ul li a[rel="prev"] {
          padding: 10px 25px;
        }
        nav ul li a[rel="next"] {
          padding: 10px 25px;
        }
        .disabled a {
          pointer-events: none;
          cursor: default;
          text-decoration: none;
          color: #d3d3d3;
        }
        nav ul li a {
          display: block;
          position: relative;
          padding: 10px 15px;
          background-color: #fff;
          border-bottom: 1px solid #cccfdd;
          border-right: 1px solid #cccfdd;
        }
        nav ul li a:hover {
          box-shadow: 0px 0px 5px 0px rgba(104,111,151,0.2);
          z-index: 1;
        }
        nav ul li a:active {
          box-shadow: none;
        }
        nav ul li a.active {
          background-color: #2669e6;
          color: #f0f1f6;
          border-right: 1px solid #2669e6;
        }
        `}</style>
    </nav>
  )
}

export default Pagination