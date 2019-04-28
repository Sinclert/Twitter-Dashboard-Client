/* encoding: utf-8 */


/* Auth configuration URLs */
export const loginURL = 'http://127.0.0.1:5000/login';
export const tokenURL = 'http://127.0.0.1:5000/token';


/* Stream configuration URLs */
export const socketURL = 'http://127.0.0.1:5000/stream';
export const startURL = 'http://127.0.0.1:5000/startStream';
export const stopURL = 'http://127.0.0.1:5000/stopStream';


export const requestConfig = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
