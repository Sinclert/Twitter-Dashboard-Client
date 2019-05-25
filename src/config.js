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


/* Color tiles provider */
export const colorTilesHost = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const colorTilesAttr = '<a href=http://osm.org/copyright>OpenStreetMap</a>';

/* Greyscale tiles provider */
export const greyTilesHost = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
export const greyTilesAttr = '<a href=http://osm.org/copyright>OpenStreetMap</a>';
