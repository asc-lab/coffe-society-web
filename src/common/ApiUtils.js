import {API_BASE_URL, ACCESS_TOKEN} from '../constants/ApiConstants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (response.ok) {
                    return json;
                } else {
                    return Promise.reject(json);
                }
            })
        );
};

export function users() {
    return request({
        url: API_BASE_URL + "9001/api/users",
        method: 'GET'
    });
}

export function definitions() {
    return request({
        url: API_BASE_URL + "9002/api/definitions",
        method: 'GET'
    });
}
