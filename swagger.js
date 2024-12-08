const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API documentation",
        version: "1.0.0",
        description: "Default description template",
    },
};

const options = {
    swaggerDefinition,
    apis: ["./controllers/*.js"], // Path to the API routes in your Node.js application
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;