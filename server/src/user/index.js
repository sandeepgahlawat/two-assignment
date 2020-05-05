import Id from '../Id'
import ipRegex from 'ip-regex'
import buildMakeUser from './user'

const makeUser = buildMakeUser({ Id, validateEmail })

export default makeUser

function isValidIp (ip) {
  return ipRegex({ exact: true }).test(ip)
}


function validateEmail (email) {
  return true
}

