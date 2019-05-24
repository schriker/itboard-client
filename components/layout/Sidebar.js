const Sidebar = () => {

  const languages = [
    {
      name: 'JavaScript',
      color: ''
    },
    {
      name: 'Java',
      color: ''
    },
    {
      name: 'HTML',
      color: ''
    },
    {
      name: 'CSS',
      color: ''
    },
    {
      name: 'PHP',
      color: ''
    },
    {
      name: 'Ruby',
      color: ''
    },
    {
      name: 'Python',
      color: ''
    },
    {
      name: '.Net',
      color: ''
    },
    {
      name: 'Scala',
      color: ''
    },
    {
      name: 'C',
      color: ''
    },
    {
      name: 'Android',
      color: ''
    },
    {
      name: 'iOS',
      color: ''
    },
    {
      name: 'Tester',
      color: ''
    },
    {
      name: 'Game Dev',
      color: ''
    },
    {
      name: 'Security',
      color: ''
    },
    {
      name: 'Blockchain',
      color: ''
    },
    {
      name: 'Data',
      color: ''
    },
    {
      name: 'Golang',
      color: ''
    },
    {
      name: 'DevOps',
      color: ''
    },
    {
      name: 'UI/UX',
      color: ''
    },
    {
      name: 'Project Manager',
      color: ''
    },
  ]

  return (
    <aside>
      <i className="far fa-file-code"></i>
      <ul>
        {languages.map(item => (
            <li key={item.name}>{item.name}</li>
          ))
        }
      </ul>
      <style jsx>{`
        aside {
          position: relative;
          background-color: #08294f;
          width: 100%;
          color: #fff;
          grid-area: sidebar;
          padding-top: 30px;
          overflow-y: hidden;
        }
        i {
          top: -65px;
          left: 0;
          transform: rotate(-15deg);
          position: absolute;
          font-size: 280px;
          color: #0c2d55;
          z-index: 0;
        }
        ul {
          position: relative;
          z-index: 1;
        }
        li {
          padding: 7px 15px 7px 50px;
          margin-bottom: 10px;
        }
        li:hover {
          background-color: #113661;
          cursor: pointer;
        }
        `}</style>
    </aside>
  )
}

export default Sidebar