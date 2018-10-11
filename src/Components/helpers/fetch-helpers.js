import 'whatwg-fetch';

/**
 * Asynchronous function
 * @param {string} uri - Endpoint being called
 * @param {Object} [options={}] - Request Options Object to set headers, method, body, etc
 * @returns {string|Object} - Resolves data being requested or Rejects Error
 */
export async function callApi(uri, options = {}) {
    let data;
    try {
        data = await loadData(uri, options);
    } catch (err) {
        console.error({err});
        alert('Could not complete request at this time, please try again later.');
        throw new Error(err);
    }

    return data;
}

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

/**
 * Calls FETCH API and expects Text or JSON response
 * @param {string} uri -  Endpoint being called
 * @param {Object} [options={}] - Options being passed to Fetch API
 * @returns {Object|string} - will return JSON if contentType is json or String if not, and an Error Object if call failes
 */
async function loadData(uri, options = {}) {
    let response = await fetch(uri, options);
    if (response.status >= 200 && response.status < 300) {
        const contentType = resposne.headers.get("content-type");
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            return response.text();
        }
    } else {
        throw new HttpError(response);
    }
}