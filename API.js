const BASE_URL = 'https://728cf828b1b4.ngrok.io'

export const sendUsers = async (usernames) => {
    const response = await fetch(`${BASE_URL}/users/${usernames}`)

    const result = await response.json()

    return result
}

