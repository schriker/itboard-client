const ToolbarButton = ({ icon, mouseDown, active, style }) => {

  const onToggle = (event) => {
    event.preventDefault()
    mouseDown(style)
  }

  return (
    <span onMouseDown={(event) => onToggle(event)}>
      <i className={icon}></i>
      <style jsx>{`
        span {
          color: ${active ? '#f0f1f7' : '#1f1f1f'};
          background-color: ${active ? '#0069ff' : '#e5e5e5'};
          width: 30px;
          height: 30px;
          text-align: center;
          padding: 5px;
          border-radius: 50%;
          transition: all .1s ease-in-out;
          margin-right: 10px;
        }
        span:hover {
          cursor: pointer;
          color: #f0f1f7;
          background-color: #0069ff;
        } 
        span:last-of-type {
          margin-right: 0;
        } 
      `}</style>
    </span>
  )
}

export default ToolbarButton