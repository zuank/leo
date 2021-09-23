/**
 * 获取用户授权token
 * @returns {}
 */
export function getUserToken () {
  return {
    userToken: localStorage.getItem('userToken') || '',
    assetKey: localStorage.getItem('assetKey') || ''
  }
}
/**
 *设置用户授权token
 * @param {*} userToken
 * @param {*} assetKey
 */
export function setUserToken (userToken, assetKey) {
  localStorage.setItem('userToken', userToken)
  localStorage.setItem('assetKey', assetKey)
}
