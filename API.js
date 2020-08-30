const BASE_URL = 'http://127.0.0.1:5000'

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

