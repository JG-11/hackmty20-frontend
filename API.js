const BASE_URL = 'https://hack-mty-2020.herokuapp.com'

export const sendUsers = async (usernames) => {
    const response = await fetch(`${BASE_URL}/users/${usernames}`)

    const result = await response.json()

    return result
}

export const getUserData = async (username) => {
    const response = await fetch(`${BASE_URL}/user/${username}`)

    const result = await response.json()

    return result
}

export const getUserImage = async (username) => {
    const response = await fetch(`${BASE_URL}/user/avatar/${username}`)

    const result = await response.json()

    return result
}

