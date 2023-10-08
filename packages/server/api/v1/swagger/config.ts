import type swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
    components: {
      securitySchemas: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'authCookie',
        },
      },
      schemas: {
        ThemeModel: {
          type: 'object',
          required: ['userId', 'mode'],
          properties: {
            userId: {
              type: 'number',
            },
            theme: {
              type: 'string',
            },
          },
        },
        TopicModel: {
          type: 'object',
          required: ['id', 'name', 'authorId', 'createdAt'],
          properties: {
            id: {
              type: 'number',
            },
            name: {
              type: 'string',
              maxLength: 50,
            },
            description: {
              type: 'string',
              nullable: true,
              maxLength: 2047,
            },
            authorId: {
              type: 'number',
            },
            createdAt: {
              type: 'string',
            },
            updatedAt: {
              type: 'string',
            },
          },
        },
        CommentModel: {
          type: 'object',
          required: ['id', 'topicId', 'authorId', 'text', 'createdAt'],
          properties: {
            id: {
              type: 'number',
            },
            topicId: {
              type: 'number',
            },
            parentId: {
              type: 'number',
              nullable: true,
            },
            authorId: {
              type: 'number',
            },
            text: {
              type: 'string',
              maxLength: 2047,
            },
            createdAt: {
              type: 'string',
            },
            updatedAt: {
              type: 'string',
            },
          },
        },
        EmojiModel: {
          type: 'object',
          required: ['id', 'name', 'code'],
          properties: {
            id: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
            code: {
              type: 'string',
            },
          },
        },
        UserModel: {
          type: 'object',
          required: ['yandexId', 'name'],
          properties: {
            yandexId: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
            avatar: {
              type: 'string',
              nullable: true,
            },
            score: {
              type: 'number',
              defaultValue: 0,
            },
          },
        },
        TopicRequest: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
              nullable: true,
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            reason: {
              type: 'string',
            },
          },
        },
        PaginatedTopic: {
          type: 'object',
          properties: {
            count: {
              type: 'number',
            },
            rows: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/TopicModel',
              },
            },
          },
        },
        CommentRequest: {
          type: 'object',
          required: ['topicId', 'text'],
          properties: {
            topicId: {
              type: 'number',
            },
            parentId: {
              type: 'number',
            },
            text: {
              type: 'string',
            },
          },
        },
        PaginatedComment: {
          type: 'object',
          properties: {
            count: {
              type: 'number',
            },
            rows: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CommentModel',
              },
            },
          },
          EmojiRequest: {
            type: 'object',
            properties: {
              count: {
                type: 'number',
              },
              rows: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/EmojiModel',
                },
              },
            },
          },
          UserRequest: {
            type: 'object',
            required: ['yandexId', 'name'],
            properties: {
              yandexId: {
                type: 'number',
              },
              name: {
                type: 'string',
              },
              avatar: {
                type: 'string',
              },
              score: {
                type: 'number',
              },
            },
          },
        },
      },
    },
    paths: {
      '/api/theme/{userId}/': {
        get: {
          tags: ['Theme'],
          summary: 'Get current theme',
          parameters: [
            {
              in: 'path',
              name: 'userId',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
              },
              description: 'The user ID',
            },
          ],
          responses: {
            200: {
              description: 'Current theme',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ThemeModel',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/theme/': {
        post: {
          tags: ['Theme'],
          summary: 'Change theme',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ThemeModel',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Theme changed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ThemeModel',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/topics/': {
        post: {
          tags: ['Topic'],
          summary: 'Create topic',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TopicRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Created',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/TopicModel',
                  },
                },
              },
            },
            400: {
              description: 'Bad Request',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ['Topic'],
          summary: 'Get topics',
          parameters: [
            {
              in: 'query',
              name: 'limit',
              schema: {
                type: 'integer',
              },
              description: 'The numbers of items to return',
            },
            {
              in: 'query',
              name: 'offset',
              schema: {
                type: 'integer',
              },
              description:
                'The number of items to skip before starting to collect the result set',
            },
            {
              in: 'query',
              name: 'search',
              schema: {
                type: 'string',
              },
              description: 'Search by topic name',
            },
            {
              in: 'query',
              name: 'ordering',
              schema: {
                type: 'string',
              },
              description: 'Ordering by topic fields',
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PaginatedTopic',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/topics/{id}/': {
        get: {
          tags: ['Topic'],
          summary: 'Retrieve topic',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
              },
              description: 'The topic ID',
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/TopicModel',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ['Topic'],
          summary: 'Update topic',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
              },
              description: 'The topic ID',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TopicRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/TopicModel',
                  },
                },
              },
            },
            400: {
              description: 'Bad Request',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        patch: {
          tags: ['Topic'],
          summary: 'Partial update topic',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
              },
              description: 'The topic ID',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TopicRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/TopicModel',
                  },
                },
              },
            },
            400: {
              description: 'Bad Request',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Topic'],
          summary: 'Delete topic',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
              },
              description: 'The topic ID',
            },
          ],
          responses: {
            204: {
              description: 'OK',
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/comments/': {
        post: {
          tags: ['Comment'],
          summary: 'Create topic comment',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommentRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Created',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CommentModel',
                  },
                },
              },
            },
            400: {
              description: 'Bad Request',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ['Comment'],
          summary: 'Get comments',
          parameters: [
            {
              in: 'query',
              name: 'limit',
              schema: {
                type: 'integer',
              },
              description: 'The numbers of items to return',
            },
            {
              in: 'query',
              name: 'offset',
              schema: {
                type: 'integer',
              },
              description:
                'The number of items to skip before starting to collect the result set',
            },
            {
              in: 'query',
              name: 'search',
              schema: {
                type: 'string',
              },
              description: 'Search by topic name',
            },
            {
              in: 'query',
              name: 'ordering',
              schema: {
                type: 'string',
              },
              description: 'Ordering by topic fields',
            },
            {
              in: 'query',
              name: 'topicId',
              schema: {
                type: 'integer',
              },
              description: 'Filter by topic id',
            },
            {
              in: 'query',
              name: 'parentId',
              schema: {
                type: 'integer',
              },
              description: 'Filter by parent id',
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PaginatedComment',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/comments/{id}/': {
        get: {
          tags: ['Comment'],
          summary: 'Retrieve comment',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
              },
              description: 'The comment ID',
            },
          ],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CommentModel',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ['Comment'],
          summary: 'Update comment',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
              },
              description: 'The comment ID',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommentRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CommentModel',
                  },
                },
              },
            },
            400: {
              description: 'Bad Request',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        patch: {
          tags: ['Comment'],
          summary: 'Partial update comment',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
              },
              description: 'The comment ID',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CommentRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CommentModel',
                  },
                },
              },
            },
            400: {
              description: 'Bad Request',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Comment'],
          summary: 'Delete comment',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer',
                minimum: 1,
              },
              description: 'The comment ID',
            },
          ],
          responses: {
            204: {
              description: 'OK',
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/emoji/': {
        get: {
          tags: ['Emoji'],
          summary: 'Get emoji',
          parameters: [],
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/EmojiRequest',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/users/': {
        post: {
          tags: ['User'],
          summary: 'Create user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Created',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserModel',
                  },
                },
              },
            },
            400: {
              description: 'Bad Request',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [
    './api/v1/routers/topic.ts',
    './api/v1/routers/comment.ts',
    './api/v1/routers/theme.ts',
    './api/v1/routers/emoji.ts',
    './api/v1/routers/user.ts',
  ],
}

export default options
