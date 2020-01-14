import getConfig from 'next/config';
import HttpClient from 'app/http-client';

const { publicRuntimeConfig } = getConfig();
export const httpClient = new HttpClient();

httpClient.headers = {};
httpClient.baseUrl = publicRuntimeConfig.rootUrl;

export const pokemonService = () => {
    return httpClient.orchestrateRequest({
        method: 'GET',
        url: '/pokemon?limit=151',
    });
};

export const pokemonDetailService = (pokemonName) => {
    return httpClient.orchestrateRequest({
        method: 'GET',
        url: `/pokemon/${pokemonName}`,
    });
};
