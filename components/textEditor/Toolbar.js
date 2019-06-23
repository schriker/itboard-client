const Toolbar = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          background-color: #eeeff6;
          position: sticky;
          z-index: 3;
          top: 0;
          display: flex;
          padding: 15px;
          box-shadow: 0px 2px 1px 0px rgba(104,111,151,0.2);
        }
        `}</style>
    </div>
  )
}

export default Toolbar