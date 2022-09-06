const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Alkemy - ONS",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./routes/*.js"]
};

module.exports = swaggerOptions;