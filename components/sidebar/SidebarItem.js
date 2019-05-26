const SidebarItem = ({ isSelected, item, onClickHandler }) => {
  let bgStyle = null
  if (isSelected) {
    bgStyle = {
      backgroundColor: item.color
    }
  }

  return (
      <li style={bgStyle} onClick={() => onClickHandler(isSelected, item.name)}>
        {item.name}
        {isSelected ? <i className="fas fa-times"></i> : null}
        <style jsx>{`
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 20px 7px 50px;
          margin-bottom: 10px;
          user-select: none;
          transition: all .2s ease-in-out;
        }
        li:hover {
          background-color: #113661;
          cursor: pointer;
        }
        li i {
          transition: all ease .1s;
        }
        li i:hover,
        li:hover > i {
          transform: scale(1.4);
        }
          `}</style>
      </li>
    )
}

export default SidebarItem