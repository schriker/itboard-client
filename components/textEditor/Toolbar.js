const Toolbar = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          display: flex;
          padding: 15px;
          box-shadow: 0px 2px 1px 0px rgba(104,111,151,0.2);
        }
        `}</style>
    </div>
  )
}

export default Toolbar