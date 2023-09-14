import request from 'supertest'
import { createTestServer, sequelize } from './helpers'
import { TopicModel } from '../models'

const app = createTestServer()

describe('test topic api', () => {
  beforeAll(async () => {
    await sequelize.authenticate()
  })

  beforeEach(async () => {
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.drop()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('test create method', () => {
    const topicCreationRequest = async (
      topic: Record<string, string | null | number>
    ) => await request(app).post('/api/v1/topics/').send(topic)

    describe('success creation', () => {
      const topic = {
        name: 'test topic name',
        description: 'test topic description',
      }
      let response: request.Response

      beforeEach(async () => {
        response = await topicCreationRequest(topic)
      })

      it('should respond with a 201 status code', async () => {
        expect(response.statusCode).toBe(201)
      })

      it('should respond with created topic', async () => {
        const { name, description } = response.body
        const expected = JSON.stringify(topic)
        const received = JSON.stringify({ name, description })
        expect(received).toBe(expected)
      })

      it('should the object exist in the database', async () => {
        const instance = await TopicModel.findOne({ where: topic })
        expect(instance).toBeInstanceOf(TopicModel)
      })
    })

    describe('error creation', () => {
      describe('name field validation', () => {
        describe('is required', () => {
          const topic = {}
          let response: request.Response

          beforeEach(async () => {
            response = await topicCreationRequest(topic)
          })

          it('should respond with a 400 status code', async () => {
            expect(response.statusCode).toBe(400)
          })

          it('should respond with message "name is required field"', async () => {
            const { reason } = response.body
            expect(reason).toBe('name is required field')
          })
        })

        describe('not null', () => {
          const topic = {
            name: null,
          }
          let response: request.Response

          beforeEach(async () => {
            response = await topicCreationRequest(topic)
          })

          it('should respond with a 400 status code', async () => {
            expect(response.statusCode).toBe(400)
          })

          it('should respond with message "name shoud not be null"', async () => {
            const { reason } = response.body
            expect(reason).toBe('name shoud not be null')
          })
        })

        describe('is string', () => {
          const topic = {
            name: 123,
          }
          let response: request.Response

          beforeEach(async () => {
            response = await topicCreationRequest(topic)
          })

          it('should respond with a 400 status code', async () => {
            expect(response.statusCode).toBe(400)
          })

          it('should respond with message "name should be string"', async () => {
            const { reason } = response.body
            expect(reason).toBe('name should be string')
          })
        })

        describe('is not empty string', () => {
          const topic = {
            name: '',
          }
          let response: request.Response

          beforeEach(async () => {
            response = await topicCreationRequest(topic)
          })

          it('should respond with a 400 status code', async () => {
            expect(response.statusCode).toBe(400)
          })

          it('should respond with message "name should not be empty string"', async () => {
            const { reason } = response.body
            expect(reason).toBe('name should not be empty string')
          })
        })

        describe('test max length', () => {
          const topic = {
            name: 'x'.repeat(51),
          }
          let response: request.Response

          beforeEach(async () => {
            response = await topicCreationRequest(topic)
          })

          it('should respond with a 400 status code', async () => {
            expect(response.statusCode).toBe(400)
          })

          it('should respond with message "name lenth should be less than 50"', async () => {
            const { reason } = response.body
            expect(reason).toBe('name lenth should be less than 50')
          })
        })

        describe('test unique', () => {
          const name = 'test topic'
          const topic = { name }
          let response: request.Response

          beforeEach(async () => {
            await TopicModel.create({ name, authorId: 1 })
            response = await topicCreationRequest(topic)
          })

          it('should respond with a 400 status code', async () => {
            expect(response.statusCode).toBe(400)
          })

          it('should respond with message "topic with name test topic already exist"', async () => {
            const { reason } = response.body
            expect(reason).toBe('topic with name test topic already exist')
          })
        })
      })
    })
  })

  describe('test list method', () => {
    const topicListRequest = async (searchParams?: URLSearchParams) =>
      await request(app)
        .get(`/api/v1/topics/?${searchParams ? searchParams.toString() : ''}`)
        .send()

    let response: request.Response

    describe('when database is empty', () => {
      beforeEach(async () => {
        response = await topicListRequest()
      })

      it('should respond with a 200 status code', async () => {
        expect(response.statusCode).toBe(200)
      })

      it('should respond with empty list', async () => {
        const expected = JSON.stringify({
          count: 0,
          rows: [],
        })
        const received = JSON.stringify(response.body)
        expect(received).toBe(expected)
      })
    })

    describe('when database not empty', () => {
      const topics = [
        {
          name: 'topic 1',
          authorId: 1,
        },
        {
          name: 'topic 2',
          authorId: 1,
        },
        {
          name: 'topic 3',
          authorId: 1,
        },
        {
          name: 'topic 4',
          authorId: 1,
        },
      ]

      beforeEach(async () => {
        await TopicModel.bulkCreate(topics)
      })

      describe('without search params', () => {
        beforeEach(async () => {
          response = await topicListRequest()
        })

        it('should respond with a 200 status code', async () => {
          expect(response.statusCode).toBe(200)
        })

        it('should return not empty topic list', async () => {
          const expected = JSON.stringify({
            count: topics.length,
            rows: topics,
          })
          const { count, rows } = response.body
          const received = JSON.stringify({
            count,
            rows: rows.map((row: Record<string, string>) => ({
              name: row.name,
              authorId: row.authorId,
            })),
          })
          expect(received).toBe(expected)
        })
      })

      describe('test pagination', () => {
        it('should return first two topics', async () => {
          const searchParams = new URLSearchParams()
          searchParams.append('limit', '2')
          searchParams.append('offset', '0')

          response = await topicListRequest(searchParams)

          const expected = JSON.stringify({
            count: topics.length,
            rows: [{ name: 'topic 1' }, { name: 'topic 2' }],
          })
          const { count, rows } = response.body
          const received = JSON.stringify({
            count,
            rows: rows.map((row: Record<string, string>) => ({
              name: row.name,
            })),
          })

          expect(received).toBe(expected)
        })

        it('should return second two topics', async () => {
          const searchParams = new URLSearchParams()
          searchParams.append('limit', '2')
          searchParams.append('offset', '2')

          response = await topicListRequest(searchParams)

          const expected = JSON.stringify({
            count: topics.length,
            rows: [{ name: 'topic 3' }, { name: 'topic 4' }],
          })
          const { count, rows } = response.body
          const received = JSON.stringify({
            count,
            rows: rows.map((row: Record<string, string>) => ({
              name: row.name,
            })),
          })

          expect(received).toBe(expected)
        })
      })

      describe('test search', () => {
        it('should return "topic 2" when search param is "2"', async () => {
          const searchParams = new URLSearchParams()
          searchParams.append('search', '2')

          response = await topicListRequest(searchParams)

          const expected = JSON.stringify({
            count: 1,
            rows: [{ name: 'topic 2' }],
          })
          const { count, rows } = response.body
          const received = JSON.stringify({
            count,
            rows: rows.map((row: Record<string, string>) => ({
              name: row.name,
            })),
          })

          expect(received).toBe(expected)
        })
      })

      describe('test ordering', () => {
        it('should return topics ordered by id desc', async () => {
          const searchParams = new URLSearchParams()
          searchParams.append('ordering', '-id')

          response = await topicListRequest(searchParams)

          const expected = JSON.stringify({
            count: topics.length,
            rows: [
              { name: 'topic 4' },
              { name: 'topic 3' },
              { name: 'topic 2' },
              { name: 'topic 1' },
            ],
          })
          const { count, rows } = response.body
          const received = JSON.stringify({
            count,
            rows: rows.map((row: Record<string, string>) => ({
              name: row.name,
            })),
          })

          expect(received).toBe(expected)
        })
      })
    })
  })

  describe('test retrieve method', () => {
    const topicRetrieveRequest = async (id: number) =>
      await request(app).get(`/api/v1/topics/${id}/`).send()

    let response: request.Response

    describe('if object does not exist', () => {
      beforeEach(async () => {
        response = await topicRetrieveRequest(1)
      })

      it('should respond with status code 400', () => {
        expect(response.statusCode).toBe(400)
      })

      it('should respond with message not found', () => {
        const { reason } = response.body
        expect(reason).toBe('not found')
      })
    })

    describe('if object exist', () => {
      const topic = {
        name: 'test topic',
        authorId: 1,
      }

      beforeEach(async () => {
        await TopicModel.create(topic)
        response = await topicRetrieveRequest(1)
      })

      it('should respond with status code 200', () => {
        expect(response.statusCode).toBe(200)
      })

      it('should return topic', () => {
        const { name } = response.body
        expect(name).toBe(topic.name)
      })
    })
  })

  describe('test update method', () => {
    const topicUpdateRequest = async (
      id: number,
      data: Record<string, string | number>
    ) => await request(app).put(`/api/v1/topics/${id}/`).send(data)

    let response: request.Response
    const data = {
      name: 'updated name',
    }

    describe('if object does not exist', () => {
      beforeEach(async () => {
        response = await topicUpdateRequest(1, data)
      })

      it('should respond with status code 400', () => {
        expect(response.statusCode).toBe(400)
      })

      it('should respond with message not found', () => {
        const { reason } = response.body
        expect(reason).toBe('not found')
      })
    })

    describe('if object exist', () => {
      const topic = {
        name: 'test topic',
        authorId: 1,
      }

      beforeEach(async () => {
        await TopicModel.create(topic)
      })

      describe('if filled required fields', () => {
        beforeEach(async () => {
          response = await topicUpdateRequest(1, data)
        })

        it('should respond with status code 200', () => {
          expect(response.statusCode).toBe(200)
        })

        it('should return updated topic', () => {
          const { name } = response.body
          expect(name).toBe(data.name)
        })
      })

      describe('if not filled required fields', () => {
        beforeEach(async () => {
          response = await topicUpdateRequest(1, {
            description: 'updated description',
          })
        })

        it('should respond with error message "name is required field"', () => {
          const { reason } = response.body
          expect(reason).toBe('name is required field')
        })
      })
    })
  })

  describe('test patch method', () => {
    const topicPatchRequest = async (
      id: number,
      data: Record<string, string | number>
    ) => await request(app).patch(`/api/v1/topics/${id}/`).send(data)

    let response: request.Response
    const data = {
      description: 'patched description',
    }

    describe('if object does not exist', () => {
      beforeEach(async () => {
        response = await topicPatchRequest(1, data)
      })

      it('should respond with status code 400', () => {
        expect(response.statusCode).toBe(400)
      })

      it('should respond with message not found', () => {
        const { reason } = response.body
        expect(reason).toBe('not found')
      })
    })

    describe('if object exist', () => {
      const topic = {
        name: 'test topic',
        description: 'test description',
        authorId: 1,
      }

      beforeEach(async () => {
        await TopicModel.create(topic)
        response = await topicPatchRequest(1, data)
      })

      it('should respond with status code 200', () => {
        expect(response.statusCode).toBe(200)
      })

      it('should return patched topic', () => {
        const { description } = response.body
        expect(description).toBe(data.description)
      })
    })
  })

  describe('test destroy method', () => {
    const topicDestroyRequest = async (id: number) =>
      await request(app).delete(`/api/v1/topics/${id}/`).send()

    let response: request.Response

    describe('if object does not exist', () => {
      beforeEach(async () => {
        response = await topicDestroyRequest(1)
      })

      it('should respond with status code 400', () => {
        expect(response.statusCode).toBe(400)
      })

      it('should respond with message not found', () => {
        const { reason } = response.body
        expect(reason).toBe('not found')
      })
    })

    describe('if object exist', () => {
      const topic = {
        name: 'test topic',
        description: 'test description',
        authorId: 1,
      }

      beforeEach(async () => {
        await TopicModel.create(topic)
        response = await topicDestroyRequest(1)
      })

      it('should respond with status code 204', () => {
        expect(response.statusCode).toBe(204)
      })

      it('should return empty body', () => {
        const expected = '{}'
        const received = JSON.stringify(response.body)
        expect(received).toBe(expected)
      })
    })
  })
})
