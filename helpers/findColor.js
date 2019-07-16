import { languagesArr } from './consts'

const findColor = (technology) => {
  return languagesArr.filter(language => language.name.toLowerCase() === technology.toLowerCase())[0].color
}

export default findColor