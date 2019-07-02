require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

const rootUrl = 'https://api.pokemontcg.io';
const headers = { 'Content-Type': 'application/json' };

const apiCall = {
    get: async (url) => {
        const response = await fetch(`${rootUrl}${url}`, {
            method: 'GET',
            headers: headers,
        });

        return await resolveFetch(response);
    },
    post: async (url, body = {}) => {
        const response = await fetch(`${rootUrl}${url}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers,
        });

        return await resolveFetch(response);
    },
};

const resolveFetch = async (response) => {
    if (response.status >= 400) {
        throw {
            statusCode: response.status,
            statusText: response.statusText,
        };
    }

    try {
        const json = await response.json();
        return json;
    } catch(error) {
        throw {
            statusCode: 500,
            statusText: 'Error converting response to json',
        };
    }
};

export const getPokemonCards = async () => {
    const url = '/v1/cards';
    return await apiCall.get(url);
}

export const getPokemonCardDetails = async (cardId) => {
    const url = `/v1/cards/${cardId}`;
    return await apiCall.get(url);
}
