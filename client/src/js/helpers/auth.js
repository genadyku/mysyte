import jwt_decode from 'jwt-decode'

export const getTokenExpirationDate = encodedToken => {
  if (!encodedToken) {
    return undefined
  }

  const decode = jwt_decode(encodedToken)
  return decode.exp
}
export const isTokenExpired = token => {
  if (!token) {
    return true
  }
  const expirationDate = getTokenExpirationDate(token)
  const curentTime = Date.now() / 1000

  return expirationDate < curentTime
}
