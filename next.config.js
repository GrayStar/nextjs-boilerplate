const path = require('path');

module.exports = {
    serverRuntimeConfig: { // Will only be available on the node server
    },
    publicRuntimeConfig: { // Will be available on the node server and the client
        rootUrl: 'https://pokeapi.co/api/v2',
    },
    webpack: (config) => {
        config.resolve.alias['app'] = path.join(__dirname, 'src');
        return config;
    },
};
