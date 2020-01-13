require('es6-promise').polyfill();
import get from 'lodash/get';
import uuidv4 from 'uuid/v4';
import fetch from 'isomorphic-fetch';
import AbortController from 'abort-controller';

export const ERROR_CODES = {
    GENERIC: 'GENERIC',
    PARSE_ERROR: 'PARSE_ERROR',
    REQUEST_ABORTED: 'REQUEST_ABORTED',
};

export const ERRORS = {
    [ERROR_CODES.GENERIC](error) {
        return {
            code: ERROR_CODES.GENERIC,
            message: 'Sorry, an error occurred.',
            originalError: error,
        };
    },
    [ERROR_CODES.PARSE_ERROR](error) {
        return {
            code: ERROR_CODES.PARSE_ERROR,
            message: 'Sorry, this page contains incorrectly formatted data.',
            originalError: error,
        };
    },
    [ERROR_CODES.REQUEST_ABORTED](error) {
        return {
            code: ERROR_CODES.REQUEST_ABORTED,
            message: 'Sorry, the request was cancelled.',
            originalError: error,
        };
    },
};

function getFormattedError(error) {
    const MATCHING_ERROR = ERRORS[error.code];

    if (MATCHING_ERROR) {
        return MATCHING_ERROR(error);
    } else if (error.parsedFromBackend && error.code) {
        return error;
    }

    return ERRORS.GENERIC(error);
};

class HttpClient {
    constructor() {
        this._headers = {};
        this._baseUrl = '';
        this._requests = [];
    }

    addHeader(key, value) {
        this._headers[key] = value;
    }

    removeHeader(key) {
        delete this._headers[key];
    }

    get baseUrl() {
        return this._baseUrl;
    }

    set baseUrl(url) {
        this._baseUrl = url;
    }

    get headers() {
        return this._headers;
    }

    set headers(headers) {
        this._headers = headers;
    }

    abortRequest(requestId) {
        const request = this._requests[requestId];
        if (request) request.abort();
    }

    async _fetch(config, signal) {
        const initObject = {
            method: config.method,
            headers: Object.assign(config.headers || {}, this._headers),
            signal,
        };

        if (config.body) initObject.body = JSON.stringify(config.body);

        let response;

        // The response must be wrapped in a try/catch in order
        // to catch direct errors thrown by fetch or nodeSystemErrors
        try {
            response = await fetch(`${this._baseUrl}${config.url}`, initObject);
        } catch (error) {
            // Aborted requests do not contain a unique code,
            // so the getFormattedError method won't work in this case
            const { name } = error;
            if (name && name === 'AbortError') throw ERRORS.REQUEST_ABORTED(error);

            throw getFormattedError(error);
        }

        return await this._parseResponseJson(response);
    }

    async _parseResponseJson(response) {
        // If there is no response body (status of 204) return nothing
        if (response.status === 204) return;

        let json = {};

        // response.json must be wrapped in a try/catch
        // in order to catch any errors parsing the response to json
        try {
            json = await response.json();

            if (response.ok) {
                return json;
            } else {
                json.parsedFromBackend = true;
            }
        } catch (error) {
            throw ERRORS.PARSE_ERROR(error);
        }

        throw getFormattedError(json);
    }

    orchestrateRequest(requestConfig) {
        const orchestratedRequest = {
            requestId: uuidv4(),
            requestComplete: false,
        };

        orchestratedRequest.fetch = async () => {
            orchestratedRequest.requestComplete = false;
            orchestratedRequest.abortController = new AbortController();

            this._requests[orchestratedRequest.requestId] = orchestratedRequest;

            const data = await this._fetch(requestConfig, orchestratedRequest.abortController.signal);

            orchestratedRequest.requestComplete = true;
            delete this._requests[orchestratedRequest.requestId];

            return data;
        }

        orchestratedRequest.abort = () => {
            const wasAborted = get(orchestratedRequest, 'abortController.signal.aborted');
            if (wasAborted || orchestratedRequest.requestComplete) return;

            orchestratedRequest.abortController.abort();

            orchestratedRequest.requestComplete = true;
            delete this._requests[orchestratedRequest.requestId];
        };

        return orchestratedRequest;
    }
}

export default HttpClient;
