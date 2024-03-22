const TokenKey = 'token'

export function getToken() {
    return localStorage.getItem(TokenKey)
}

export function setToken() {
    return localStorage.setItem(TokenKey)
}

export function removeToken() {
    return localStorage.removeItem(TokenKey)
}