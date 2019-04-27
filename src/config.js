/* encoding: utf-8 */


export const authConfig = {
    loginURL: 'http://127.0.0.1:5000/login',
    tokenURL: 'http://127.0.0.1:5000/token',
};


export const streamConfig = {
    socketURL: 'http://127.0.0.1:5000/stream',
    startURL: 'http://127.0.0.1:5000/setStream'
};


export const requestConfig = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
