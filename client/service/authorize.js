//keep token, username to session storage

export const authenticate = (response, next) => {
    if(window !== "undefined"){
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("user", JSON.stringify(response.data.username))
    }
    next()
}