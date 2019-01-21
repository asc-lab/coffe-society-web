import {ACCESS_TOKEN} from '../constants/ApiConstants';

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
        url: "/api/members/users",
        method: 'GET'
    });
}

export function definitions() {
    return request({
        url: "/api/product-catalog/definitions",
        method: 'GET'
    });
}

export function register(data) {
    return request({
        url: "/api/product/register",
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function products() {
    return request({
        url: "/api/product/products",
        method: 'GET',
    });
}
