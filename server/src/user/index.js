import Id from '../Id'
import buildMakeUser from './user'

const makeUser = buildMakeUser({ Id, validateEmail })

export default makeUser

function validateEmail (email) {
  return true
}

