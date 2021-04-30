export const setJwt = (jwt) => ({
    type: 'SET_JWT',
    payload: jwt
})

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
})

export const logout = () => ({
    type: 'LOGOUT'
})