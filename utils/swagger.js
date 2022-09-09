const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Alkemy - ONG",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization"
                }
            }
        },
        security: [
            {
                ApiKeyAuth: []
            }
        ]
    },
    apis: ["./routes/*.js"]
};

module.exports = swaggerOptions;