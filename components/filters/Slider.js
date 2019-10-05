import React, {useState} from 'react'
import Rheostat from 'rheostat'
import 'rheostat/initialize'
import './rheostat.css'

const Slider = ({ handleSliderChange, minmaxWage, wagesRange }) => {

  const [currentValues, setCurrentValues] = useState([minmaxWage[0], minmaxWage[1]])

  return (
    <div className="slider">
      <p>Salary:</p>
      <Rheostat
        onChange={(value) => handleSliderChange(value)} 
        onValuesUpdated={(value => setCurrentValues(value.values))}
        min={minmaxWage[0]} 
        max={minmaxWage[1]} 
        values={wagesRange}
      />
      <div className="slider__values">
        <span>{currentValues[0]}</span>
        <span>{currentValues[1]}</span>
      </div>
      <style jsx>{`
        .slider{ 
          margin: -5px 0 0 30px;
        }
        .slider p {
          margin-left: -10px;
          margin-bottom: 0;
        }
        .slider__values {
          justify-content: space-between;
          display: flex;
        }
        `}</style>
    </div>
  )
}

export default Slider