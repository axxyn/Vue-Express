export function getLocalAccessToken() {
    return window.localStorage.getItem("accessToken")
}

export function getUsername() {
    return window.localStorage.getItem("username")
}

export function login(token, username) {
    window.localStorage.setItem("accessToken", token)
    window.localStorage.setItem("username", username)
}

export function logout() {
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("username")
    window.localStorage.removeItem("user_id")
}

export function isLoggedIn() {
    const token = localStorage.getItem('accessToken')
    if(token) {
        return true
    } else {
        return false
    }
}