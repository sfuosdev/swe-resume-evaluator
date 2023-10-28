const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'SWE Resume Evaluator Express API with Swagger',
            version: '0.1.0',
            description: 'API with Express JS',
        },
        servers: [
            {
                url: 'http://localhost:3000', // 요청 URL
            },
        ],
    },
    apis: [`${__dirname}/routers/**/*.js`],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
