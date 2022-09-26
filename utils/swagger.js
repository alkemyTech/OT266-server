const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "ONG - OpenAPI 3.0",
            description: "",
            version: "1.0.11",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        tags: [
            {
                name: "Activities",
                description: "Operations about activities",
            },
            {
                name: "Auth",
                description: "Access to all the endpoints",
            },
            {
                name: "Backoffice",
                description: "Operations about contacts",
            },
            {
                name: "Categories",
                description: "Operations about categories",
            },
            {
                name: "Comments",
                description: "Operations about comments",
            },
            {
                name: "Contacts",
                description: "Operations about contacts",
            },
            {
                name: "Members",
                description: "Operations about members",
            },
            {
                name: "News",
                description: "Endpoints related to news",
            },
            {
                name: "Organization",
                description: "Operations about organizations",
            },
            {
                name: "Roles",
                description: "Operations about roles",
            },
            {
                name: "Slides",
                description: "Operations about slides",
            },
            {
                name: "Testimonies",
                description: "Operations about testimonies",
            },
            {
                name: "Users",
                description: "Operations about users",
            },
        ],
        paths: {
            "/activities": {
                get: {
                    tags: ["Activities"],
                    summary: "To see all the activities in the database",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                },
                post: {
                    tags: ["Activities"],
                    summary: "Add a new activity to the store",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Activity",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        201: {
                            description: "Created",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        500: {
                            description: "Internal Server Error",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/activities/{id}": {
                put: {
                    tags: ["Activities"],
                    summary: "To update the information of an activity",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the activity",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Activity",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                delete: {
                    tags: ["Activities"],
                    summary: "To delete an activity",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the activity",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/auth/register": {
                post: {
                    tags: ["Auth"],
                    summary: "To register a new user",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Auth",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        201: {
                            description: "Created",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        500: {
                            description: "Internal Server Error",
                        },
                    },
                },
            },
            "/auth/login": {
                post: {
                    tags: ["Auth"],
                    summary: "To login inside the application",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Login",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                },
            },
            "/auth/me": {
                get: {
                    tags: ["Auth"],
                    summary: "To see only some fields of an user",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        500: {
                            description: "Internal Server Error",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/backoffice/contacts": {
                get: {
                    tags: ["Backoffice"],
                    summary: "Contacts",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/category": {
                get: {
                    tags: ["Categories"],
                    summary: "To see all the categories in the database",
                    parameters: [
                        {
                            name: "page",
                            in: "query",
                            description: "Page to show",
                            required: false,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                        {
                            name: "size",
                            in: "query",
                            description: "Page sizes",
                            required: false,
                            schema: {
                                type: "integer",
                                example: 10,
                            },
                        }
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                post: {
                    tags: ["Categories"],
                    summary: "To create a new category",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Category",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        201: {
                            description: "Created",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/category/{id}": {
                get: {
                    tags: ["Categories"],
                    summary: "To see all the categories in the database",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the category",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                put: {
                    tags: ["Categories"],
                    summary: "To update the information of a category",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the category",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Category",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                delete: {
                    tags: ["Categories"],
                    summary: "To delete a category",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the category",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/comments": {
                get: {
                    tags: ["Comments"],
                    summary: "To see all the comments in the database",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        500: {
                            description: "Internal Server Error",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                post: {
                    tags: ["Comments"],
                    summary: "To create a new comment",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Comment",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                put: {
                    tags: ["Comments"],
                    summary: "To update the information of a comment",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Comment",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                delete: {
                    tags: ["Comments"],
                    summary: "To delete a comment",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/contacts": {
                get: {
                    tags: ["Contacts"],
                    summary: "To see all the contacts in the database",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                post: {
                    tags: ["Contacts"],
                    summary: "To create a new contact",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Contact",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        201: {
                            description: "Created",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                },
            },
            "/members": {
                get: {
                    tags: ["Members"],
                    summary: "To see all the members in the database",
                    parameters: [
                        {
                            name: "page",
                            in: "query",
                            description: "Page to show",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        500: {
                            description: "Internal Server Error",
                        },
                    },
                },
                post: {
                    tags: ["Members"],
                    summary: "To create a new member",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Member",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        201: {
                            description: "Created",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        500: {
                            description: "Internal Server Errror",
                        },
                    },
                },
            },
            "/members/attributes": {
                get: {
                    tags: ["Members"],
                    summary: "To see some attributes of the members in the database",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        500: {
                            description: "Internal Server Error",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/members/update/{id}": {
                put: {
                    tags: ["Members"],
                    summary: "To update the information of a member",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the member",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Member",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        404: {
                            description: "Not Found",
                        },
                        500: {
                            description: "Internal Server Errror",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/members/delete/{id}": {
                delete: {
                    tags: ["Members"],
                    summary: "To delete a member",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the member",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        404: {
                            description: "Not Found",
                        },
                        500: {
                            description: "Internal Server Errror",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/news": {
                get: {
                    tags: ["News"],
                    summary: "Endpoint to see all the news in the database",
                    parameters: [
                        {
                            name: "page",
                            in: "query",
                            description: "Number of page to display",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                        {
                            name: "size",
                            in: "query",
                            description: "Length of list to display",
                            required: false,
                            schema: {
                                type: "integer",
                                example: 10,
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Ok - Return a list of news paginated. Default length 10, size query determinates length.",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                },
                post: {
                    tags: ["News"],
                    summary: "Endpoint to create a new News",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/New",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        201: {
                            description: "OK - Successfully created - Returns the new created news",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/news/{id}": {
                get: {
                    tags: ["News"],
                    summary: "Endpoint to display just one news information (News selected by ID via params)",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the new",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Ok - Returns information of selected news",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Could not found news via the ID",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                put: {
                    tags: ["News"],
                    summary: "Endpoint to update one news information(News selected by ID via params)",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the new",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/NewsUpdate",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "OK - Successfully updated - Returns the updated news",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Could not found news via the ID",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                delete: {
                    tags: ["News"],
                    summary: "Endpoint to soft-delete one news from the database (News selected by ID via params)",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the new",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "OK - Successfully soft-deleted",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Could not found news via the ID",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/news/{id}/comments": {
                get: {
                    tags: ["News"],
                    summary: "Endpoint to get all comments related to a news (News selected by ID via params)",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the new",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Ok - Returns array of all comments of the selected news",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Could not found news via the ID",
                        },
                    },
                },
            },
            "/organization/public": {
                get: {
                    tags: ["Organization"],
                    summary: "To see images of the organization",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                },
            },
            "/organization": {
                get: {
                    tags: ["Organization"],
                    summary: "To see all the news in the database",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/organization/new": {
                post: {
                    tags: ["Organization"],
                    summary: "To create an organization",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Organization",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        201: {
                            description: "Created",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/organization/update/{id}": {
                put: {
                    tags: ["Organization"],
                    summary: "To update the information of a organization",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the organization",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Activity",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/organization/delete/{id}": {
                delete: {
                    tags: ["Organization"],
                    summary: "To delete an organization",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the organization",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/roles": {
                get: {
                    tags: ["Roles"],
                    summary: "To see all the roles in the database",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                },
            },
            "/roles/new": {
                post: {
                    tags: ["Roles"],
                    summary: "To create a new rol",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Rol",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        201: {
                            description: "Created",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                },
            },
            "/roles/update/{id}": {
                put: {
                    tags: ["Roles"],
                    summary: "To update the information of a rol",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the rol",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Rol",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/roles/delete/{id}": {
                delete: {
                    tags: ["Roles"],
                    summary: "To delete a rol",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the rol",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/slides": {
                get: {
                    tags: ["Slides"],
                    summary: "To see all the slides in the database",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                post: {
                    tags: ["Slides"],
                    summary: "To create a new slide",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Slide",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        201: {
                            description: "Created",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/slides/{id}": {
                get: {
                    tags: ["Slides"],
                    summary: "To see a slide from the database",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the slide",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                put: {
                    tags: ["Slides"],
                    summary: "To update the information of a slide",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the new",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Slide",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                delete: {
                    tags: ["Slides"],
                    summary: "To delete a slide",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the slide",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/testimony": {
                get: {
                    tags: ["Testimonies"],
                    summary: "To see all the testimonies in the database",
                    parameters: [
                        {
                            name: "page",
                            in: "query",
                            description: "Page to show",
                            required: false,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                        {
                            name: "size",
                            in: "query",
                            description: "Pages Sizes",
                            required: false,
                            schema: {
                                type: "integer",
                                example: 10,
                            },
                        }
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                post: {
                    tags: ["Testimonies"],
                    summary: "To create a new testimony",
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Testimony",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        201: {
                            description: "Created",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/testimony/{id}": {
                get: {
                    tags: ["Testimonies"],
                    summary: "To see a testimony from the database",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the testimony",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                put: {
                    tags: ["Testimonies"],
                    summary: "To update the information of a testimony",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the testimony",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Testimony",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
                delete: {
                    tags: ["Testimonies"],
                    summary: "To delete a testimony",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the testimony",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                        404: {
                            description: "Not Found",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/users": {
                get: {
                    tags: ["Users"],
                    summary: "To see all the users in the database",
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/users/{id}": {
                patch: {
                    tags: ["Users"],
                    summary: "To update the information of a user",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the user",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                        required: true,
                    },
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
            "/users/delete/{id}": {
                delete: {
                    tags: ["Users"],
                    summary: "To delete a user",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            description: "ID of the user",
                            required: true,
                            schema: {
                                type: "integer",
                                example: 1,
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                        },
                        400: {
                            description: "Bad Request",
                        },
                    },
                    security: [
                        {
                            ApiKeyAuth: [],
                        },
                    ],
                },
            },
        },
        components: {
            schemas: {
                Activity: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "tutorias",
                        },
                        content: {
                            type: "string",
                            example:
                                "Es un programa destinado a jóvenes a partir del tercer año de secundaria, cuyo objetivo es garantizar su permanencia en la escuela y construir un proyecto de vida que da sentido al colegio",
                        },
                        image: {
                            type: "string",
                            example:
                                "https://blogs.iadb.org/educacion/wp-content/uploads/sites/22/2022/06/tutorias.remotas.jpg",
                        },
                    },
                },
                Auth: {
                    type: "object",
                    properties: {
                        firstName: {
                            type: "string",
                            example: "j",
                        },
                        lastName: {
                            type: "string",
                            example: "a",
                        },
                        email: {
                            type: "string",
                            example: "j@gmail.com",
                        },
                        password: {
                            type: "string",
                            example: "123456",
                        },
                    },
                },
                Login: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            example: "j@gmail.com",
                        },
                        password: {
                            type: "string",
                            example: "123456",
                        },
                    },
                },
                Category: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "j@gmail.com",
                        },
                        description: {
                            type: "string",
                            example: "123456",
                        },
                        image: {
                            type: "string",
                            example: "",
                        },
                    },
                },
                Comment: {
                    type: "object",
                    properties: {
                        user_id: {
                            type: "integer",
                            example: 2,
                        },
                        body: {
                            type: "string",
                            example: "Deportes",
                        },
                        news_id: {
                            type: "integer",
                            example: 1,
                        },
                    },
                },
                Contact: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "Eze",
                        },
                        phone: {
                            type: "string",
                            example: "214748",
                        },
                        email: {
                            type: "string",
                            example: "ezegeek@gmail.com",
                        },
                        message: {
                            type: "string",
                            example: "Message text",
                        },
                    },
                },
                Member: {
                    type: "object",
                    properties: {
                        nameMember: {
                            type: "string",
                            example: "Ignacio Martinez",
                        },
                        facebookUrl: {
                            type: "string",
                            example: "https:/facebook.com/ignacio_martinez",
                        },
                        instagramUrl: {
                            type: "string",
                            example: "https:/instagram.com/ignacio_martinez",
                        },
                        linkedinUrl: {
                            type: "string",
                            example: "https:/linkedin.com/in/ignacio_martinez",
                        },
                        image: {
                            type: "string",
                            example: "ignacio_martinez.jpg",
                        },
                        description: {
                            type: "string",
                            example: "CEO",
                        },
                    },
                },
                New: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "News title",
                        },
                        content: {
                            type: "string",
                            example:
                                "Here has to be sent the content of the new News",
                        },
                        image: {
                            type: "string",
                            example:
                                "News url image to be displayed",
                        },
                        type: {
                            type: "string",
                            example: "new",
                        },
                    },
                },
                NewsUpdate: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "New news title",
                        },
                        content: {
                            type: "string",
                            example:
                                "This could be a redesign of the content of the news",
                        },
                        image: {
                            type: "string",
                            example:
                                "New image url",
                        },
                        type: {
                            type: "string",
                            example: "newType",
                        },
                    },
                },
                Organization: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "Organization 1",
                        },
                        adress: {
                            type: "string",
                            example: "123",
                        },
                        image: {
                            type: "string",
                            example: "ignacio_martinez.jpg",
                        },
                        phone: {
                            type: "string",
                            example: "2148470",
                        },
                        email: {
                            type: "string",
                            example: "email.com",
                        },
                        welcomeText: {
                            type: "string",
                            example: "welcome",
                        },
                        aboutUsText: {
                            type: "string",
                            example: "text",
                        },
                        urlFacebook: {
                            type: "string",
                            example: "https://facebook.com/ong",
                        },
                        urlLinkedin: {
                            type: "string",
                            example: "https://linkedin.com/ong",
                        },
                        urlInstagram: {
                            type: "string",
                            example: "https://instagram.com/ong",
                        },
                    },
                },
                Rol: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "Admin",
                        },
                        description: {
                            type: "string",
                            example: "Usuario administrador",
                        },
                    },
                },
                Slide: {
                    type: "object",
                    properties: {
                        imageUrl: {
                            type: "string",
                            example:
                                "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
                        },
                        text: {
                            type: "string",
                            example: "Text Slide",
                        },
                        order: {
                            type: "integer",
                            example: 3,
                        },
                        organizationId: {
                            type: "integer",
                            example: 1,
                        },
                    },
                },
                Testimony: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            example: "",
                        },
                        content: {
                            type: "string",
                            example: "",
                        },
                        image: {
                            type: "string",
                            example: "",
                        },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        firstName: {
                            type: "string",
                            example: "j",
                        },
                        lastName: {
                            type: "string",
                            example: "a",
                        },
                        email: {
                            type: "string",
                            example: "j@gmail.com",
                        },
                        password: {
                            type: "string",
                            example: "123456",
                        },
                    },
                },
            },
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    name: "Authorization",
                    in: "header",
                },
            },
        },
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerOptions;
