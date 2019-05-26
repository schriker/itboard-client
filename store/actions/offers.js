import * as actionTypes from './actionTypes'

export const setLanguages = (payload) => ({
  type: actionTypes.SET_LANGUAGES,
  payload
})

// const setTitle = (payload) => ({
//   type: actionTypes.SET_TITLE,
//   payload
// })

// export const fetchTitle = () => {
//   return async dispatch => {
//     await axios.get('https://jsonplaceholder.typicode.com/todos/1')
//             .then(res => {
//               console.log(res.data.title)
//               dispatch(setTitle(res.data.title))
//             })
//             .catch(err => console.log(err))
//   }
// }