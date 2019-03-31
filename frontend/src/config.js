const environment = {
    development: {
        isProduction: false,
    },
    production: {
        isProduction: true,
    },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    api: {
        url: process.env.APIURL || 'localhost:5000/bimgo/api',
        version: process.env.APIVERSION || '',
    },
    app: {
        title: 'Bimgo!',
        description: 'Buzzword bingo',
        head: {
            title: 'Bimgo!',
            titleTemplate: '%s ~ bimgo',
            meta: [
                { name: 'Buzzword bingo' },
                { charset: 'utf-8' },
            ],
        },
    },
}, environment);
