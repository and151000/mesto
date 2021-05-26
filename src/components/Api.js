const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export class Api {
    constructor(baseUrl, password) {
        this._password = password;
        this._baseUrl = baseUrl
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._password,
            }
        })
            .then(handleResponse);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._password,
            }
        })
            .then(handleResponse);
    }

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._password
            },
        })
            .then(handleResponse);
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._password
            }
        })
            .then(handleResponse);
    }

    patchProfile(item) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._password,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: item.form_name,
                about: item.form_profession
            }),
        })
            .then(handleResponse);
    }

    patchProfilePic(item) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._password,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: item.avatar
            }),
        })
            .then(handleResponse);
    }

    postPicture(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._password,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: item.name,
                link: item.link
            }),
        })
            .then(handleResponse);
    }

    deletePicture(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '835ffcef-d2f4-4b87-8182-b060befe7bcd'
            }
        })
            .then(handleResponse);
    }
}
