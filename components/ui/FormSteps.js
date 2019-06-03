const FormSteps = ({ steps, currentStep }) => {
  return (
    <ul>
      {steps.map((step, index) => {
        return (
          <li className={index + 1 < currentStep ? 'active' : null} key={index}>
            <div>
              <span>
                {index} 
              </span>
            </div>
            <span>
              {step}
            </span>
          </li>
        )
        }
      )}
      <li>
        <div>
          <span>
            <i className="fas fa-check"></i>
          </span>
        </div>
      </li>
      <style jsx>{`
          ul {
            color: #1f1f1f;
            display: flex;
            list-style: none;
            flex: 1 0 100%;
            margin-bottom: 70px;
            justify-content: center;
          }
          li {
            display: flex;
            flex: 1 1 100%;
            max-width: 180px;
            align-items: center;
          }
          li:last-child {
            flex: 0 1 auto;
            max-width: none;
          }
          li span {
            width: 100%;
            margin: -15px 20px 0 20px;
            padding-bottom: 3px;
            font-size: 16px;
            text-align: center;
            border-bottom: 1px solid #f0f1f7;
          }
          li div {
            padding: 7px;
            border: 1px solid #f0f1f7;
            border-radius: 50%;
          }
          li div span {
            margin: 0;
            padding: 0;
            width: 100%;
            text-align: center;
            line-height: 40px;
            border-radius 50%;
            display: inline-block;
            font-size: 20px;
            color: #1f1f1f;
            background-color: #f0f1f7;
            width: 40px;
            height: 40px;
          }
          li.active span {
            color: #0069ff;
            border-color: #0069ff;
          }
          li.active div {
            border-color: #0069ff;
          }
          li.active div span {
            color: #f0f1f7;
            background-color: #0069ff;
          }
      `}</style>
    </ul>
  )
}

export default FormSteps