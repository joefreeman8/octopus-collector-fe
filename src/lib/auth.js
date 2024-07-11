
export function getToken() {
  return localStorage.getItem('token')
}

export function removeToken() {
  return localStorage.removeItem('token')
}




function getPayload() {
  const token = getToken()
  if (!token) {
    return false
  }
  const parts = token.split('.')
  if (parts.length < 3) {
    removeToken()
    return false
  }
  return JSON.parse(atob(parts[1]))
}

export function isAuthenticated() {
  const payload = getPayload()
  if (!payload) return false

  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

export function isAdmin() {
  const payload = getPayload()
  if (!payload) return false

  if (!isAuthenticated()) return false

  return payload.is_admin
}

export function isOwner(userId) {
  const payload = getPayload()
  if (!payload) return false

  if (!isAuthenticated()) return false
  return userId === payload.sub
}

