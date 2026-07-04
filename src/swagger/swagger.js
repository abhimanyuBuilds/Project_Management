import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Project Management",
            version: "1.0.0",
            description: "REST API Documentation",
        },

        servers: [
            {
                url: "http://localhost:4500/api/v1",
                description: "Development Server",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: [
        "./src/routes/*.js",
        "./src/controllers/*.js",
    ],
};

const swaggerSpec = swaggerJsdoc(options);



export { swaggerSpec, swaggerUi };