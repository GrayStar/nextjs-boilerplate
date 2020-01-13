import getConfig from 'next/config';
import HttpClient from 'app/http-client';

const { publicRuntimeConfig } = getConfig();
export const httpClient = new HttpClient();

httpClient.headers = {};
httpClient.baseUrl = publicRuntimeConfig.rootUrl;

export const cardService = () => {
    return httpClient.orchestrateRequest({
        method: 'GET',
        url: '/v1/cards',
    });
};

export const cardDetailService = (cardId) => {
    return httpClient.orchestrateRequest({
        method: 'GET',
        url: `/v1/cards/${cardId}`,
    });
};
