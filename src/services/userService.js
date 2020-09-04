import config from "../config";

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const login = (username, password) => {
    return new Promise(resolve => {
        const user = {
            "firstname": "Thomas",
            "lastname": "CILES",
            "email": "tciles@alpes-controles.fr"
        }

        localStorage.setItem('user', JSON.stringify(user));

        resolve(user);
    })


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        }).catch(error => {
            console.log(error)
        })
}

const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

export default {
    login,
    logout
};
