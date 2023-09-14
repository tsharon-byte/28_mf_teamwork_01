import request from 'supertest'
import { createTestServer, sequelize } from './helpers'
import { CommentModel } from '../models'

const app = createTestServer()

describe('test comment api', () => {
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
        const commentCreationRequest = async (comment: Record<string, string | null | number>) => 
            await request(app).post('/api/v1/comments/').send(comment)

        describe('success creation', () => {
            const comment = {
                topicId: 1,
                text: 'test comment'
            }
            let response: request.Response

            beforeEach(async () => {
                response = await commentCreationRequest(comment)
            })

            it('should respond with a 201 status code', async () => {
                expect(response.statusCode).toBe(201)
            })

            it('should respond with created comment', async () => {
                const { topicId, text } = response.body
                const expected = JSON.stringify(comment)
                const received = JSON.stringify({ topicId, text })
                expect(received).toBe(expected)
            })

            it('should the object exist in the database', async () => {
                const instance = await CommentModel.findOne({ where: comment })
                expect(instance).toBeInstanceOf(CommentModel)
            })
        })

        describe('error creation', () => {
            describe('topicId field validation', () => {
                let response: request.Response

                describe('is required', () => {
                    const comment = {}

                    beforeEach(async () => {
                        response = await commentCreationRequest(comment)
                    })

                    it('should respond with a 400 status code', async () => {
                        expect(response.statusCode).toBe(400)
                    })

                    it('should respond with message "topicId is required field"', async () => {
                        const { reason } = response.body
                        expect(reason).toBe('topicId is required field')
                    })
                })

                describe('not null', () => {
                    const comment = {
                        topicId: null
                    }

                    beforeEach(async () => {
                        response = await commentCreationRequest(comment)
                    })

                    it('should respond with a 400 status code', async () => {
                        expect(response.statusCode).toBe(400)
                    })

                    it('should respond with message "topicId shoud not be null"', async () => {
                        const { reason } = response.body
                        expect(reason).toBe('topicId shoud not be null')
                    })
                })

                describe('is number', () => {
                    const comment = {
                        topicId: '1'
                    }

                    beforeEach(async () => {
                        response = await commentCreationRequest(comment)
                    })

                    it('should respond with a 400 status code', async () => {
                        expect(response.statusCode).toBe(400)
                    })

                    it('should respond with message "topicId should be number"', async () => {
                        const { reason } = response.body
                        expect(reason).toBe('topicId should be number')
                    })
                })
            })

            describe('text field validation', () => {
                let response: request.Response

                describe('is required', () => {
                    const comment = {
                        topicId: 1
                    }

                    beforeEach(async () => {
                        response = await commentCreationRequest(comment)
                    })

                    it('should respond with a 400 status code', async () => {
                        expect(response.statusCode).toBe(400)
                    })

                    it('should respond with message "text is required field"', async () => {
                        const { reason } = response.body
                        expect(reason).toBe('text is required field')
                    })
                })

                describe('not null', () => {
                    const comment = {
                        topicId: 1,
                        text: null
                    }

                    beforeEach(async () => {
                        response = await commentCreationRequest(comment)
                    })

                    it('should respond with a 400 status code', async () => {
                        expect(response.statusCode).toBe(400)
                    })

                    it('should respond with message "text shoud not be null"', async () => {
                        const { reason } = response.body
                        expect(reason).toBe('text shoud not be null')
                    })
                })

                describe('is string', () => {
                    const comment = {
                        topicId: 1,
                        text: 123
                    }

                    beforeEach(async () => {
                        response = await commentCreationRequest(comment)
                    })

                    it('should respond with a 400 status code', async () => {
                        expect(response.statusCode).toBe(400)
                    })

                    it('should respond with message "text should be string"', async () => {
                        const { reason } = response.body
                        expect(reason).toBe('text should be string')
                    })
                })

                describe('is not empty string', () => {
                    const comment = {
                        topicId: 1,
                        text: ''
                    }

                    beforeEach(async () => {
                        response = await commentCreationRequest(comment)
                    })

                    it('should respond with a 400 status code', async () => {
                        expect(response.statusCode).toBe(400)
                    })

                    it('should respond with message "text should not be empty string"', async () => {
                        const { reason } = response.body
                        expect(reason).toBe('text should not be empty string')
                    })
                })

                describe('test max length', () => {
                    const comment = {
                        topicId: 1,
                        text: 'x'.repeat(2048)
                    }

                    beforeEach(async () => {
                        response = await commentCreationRequest(comment)
                    })

                    it('should respond with a 400 status code', async () => {
                        expect(response.statusCode).toBe(400)
                    })

                    it('should respond with message "text lenth should be less than 2047"', async () => {
                        const { reason } = response.body
                        expect(reason).toBe('text lenth should be less than 2047')
                    })
                })
            })

            describe('parentId field validation', () => {
                let response: request.Response

                describe('is number or null', () => {
                    const comment = {
                        topicId: 1,
                        text: 'test text',
                        parentId: '1'
                    }

                    beforeEach(async () => {
                        response = await commentCreationRequest(comment)
                    })

                    it('should respond with a 400 status code', async () => {
                        expect(response.statusCode).toBe(400)
                    })

                    it('should respond with message "parentId should be number or null"', async () => {
                        const { reason } = response.body
                        expect(reason).toBe('parentId should be number or null')
                    })
                })
            })
        })
    })

    describe('test list method', () => {
        const commentListRequest = async (searchParams?: URLSearchParams) => 
            await request(app).get(`/api/v1/comments/?${searchParams ? searchParams.toString() : ''}`).send()
        
        let response: request.Response

        describe('when database is empty', () => {
            beforeEach(async () => {
                response = await commentListRequest()
            })
    
            it('should respond with a 200 status code', async () => {
                expect(response.statusCode).toBe(200)
            })
    
            it('should respond with empty list', async () => {
                const expected = JSON.stringify({
                    count: 0,
                    rows: []
                })
                const received = JSON.stringify(response.body)
                expect(received).toBe(expected)
            })
        })

        describe('when database not empty', () => {
            const comments = [{
                text: 'comment of topic 1',
                topicId: 1,
                authorId: 1,
                parentId: null
            }, {
                text: 'reply to comment of topic 1',
                topicId: 1,
                authorId: 1,
                parentId: 1
            }, {
                text: 'comment of topic 2',
                topicId: 2,
                authorId: 1,
                parentId: null
            }, {
                text: 'reply to comment of topic 2',
                topicId: 2,
                authorId: 1,
                parentId: 3
            }]

            beforeEach(async () => {
                await CommentModel.bulkCreate(comments)
            })

            describe('without search params', () => {
                beforeEach(async () => {
                    response = await commentListRequest()
                })
        
                it('should respond with a 200 status code', async () => {
                    expect(response.statusCode).toBe(200)
                })
        
                it('should return not empty comment list', async () => {
                    const expected = JSON.stringify({
                        count: comments.length,
                        rows: comments
                    })
                    const { count, rows } = response.body
                    const received = JSON.stringify({
                        count,
                        rows: rows.map(
                            (row: Record<string, string>) => ({
                                text: row.text,
                                topicId: row.topicId,
                                authorId: row.authorId,
                                parentId: row.parentId
                            })
                        )
                    })
                    expect(received).toBe(expected)
                })
            })

            describe('test pagination', () => {
                it('should return first two comments', async () => {
                    const searchParams = new URLSearchParams()
                    searchParams.append('limit', '2')
                    searchParams.append('offset', '0')

                    response = await commentListRequest(searchParams)

                    const expected = JSON.stringify({
                        count: comments.length,
                        rows: [{ text: 'comment of topic 1' }, { text: 'reply to comment of topic 1' }]
                    })
                    const { count, rows } = response.body
                    const received = JSON.stringify({
                        count,
                        rows: rows.map(
                            (row: Record<string, string>) => ({ text: row.text })
                        )
                    })

                    expect(received).toBe(expected)
                })

                it('should return second two comments', async () => {
                    const searchParams = new URLSearchParams()
                    searchParams.append('limit', '2')
                    searchParams.append('offset', '2')

                    response = await commentListRequest(searchParams)

                    const expected = JSON.stringify({
                        count: comments.length,
                        rows: [
                            { text: 'comment of topic 2' },
                            { text: 'reply to comment of topic 2' }
                        ]
                    })
                    const { count, rows } = response.body
                    const received = JSON.stringify({
                        count,
                        rows: rows.map(
                            (row: Record<string, string>) => ({ text: row.text })
                        )
                    })

                    expect(received).toBe(expected)
                })
            })

            describe('test search', () => {
                it('should return comments which contains word "reply" when search param is "reply"', async () => {
                    const searchParams = new URLSearchParams()
                    searchParams.append('search', 'reply')

                    response = await commentListRequest(searchParams)

                    const expected = JSON.stringify({
                        count: 2,
                        rows: [
                            { text: 'reply to comment of topic 1' },
                            { text: 'reply to comment of topic 2' }
                        ]
                    })
                    const { count, rows } = response.body
                    const received = JSON.stringify({
                        count,
                        rows: rows.map(
                            (row: Record<string, string>) => ({ text: row.text })
                        )
                    })
                    
                    expect(received).toBe(expected)
                })
            })

            describe('test ordering', () => {
                it('should return comments ordered by id desc', async () => {
                    const searchParams = new URLSearchParams()
                    searchParams.append('ordering', '-id')

                    response = await commentListRequest(searchParams)

                    const expected = JSON.stringify({
                        count: comments.length,
                        rows: [
                            { text: 'reply to comment of topic 2' },
                            { text: 'comment of topic 2' },
                            { text: 'reply to comment of topic 1' },
                            { text: 'comment of topic 1' },
                        ]
                    })
                    const { count, rows } = response.body
                    const received = JSON.stringify({
                        count,
                        rows: rows.map(
                            (row: Record<string, string>) => ({ text: row.text })
                        )
                    })
                    
                    expect(received).toBe(expected)
                })
            })

            describe('test topicId filter', () => {
                it('should return comments with topicId equal 1 when search param topicId equal 1', async () => {
                    const searchParams = new URLSearchParams()
                    searchParams.append('topicId', '1')

                    response = await commentListRequest(searchParams)

                    const expected = JSON.stringify({
                        count: 2,
                        rows: [
                            { text: 'comment of topic 1' },
                            { text: 'reply to comment of topic 1' },
                        ]
                    })
                    const { count, rows } = response.body
                    const received = JSON.stringify({
                        count,
                        rows: rows.map(
                            (row: Record<string, string>) => ({ text: row.text })
                        )
                    })
                    
                    expect(received).toBe(expected)
                })
            })

            describe('test parentId filter', () => {
                it('should return comments with parentId equal 1 when search param parentId equal 1', async () => {
                    const searchParams = new URLSearchParams()
                    searchParams.append('parentId', '1')

                    response = await commentListRequest(searchParams)

                    const expected = JSON.stringify({
                        count: 1,
                        rows: [
                            { text: 'reply to comment of topic 1' },
                        ]
                    })
                    const { count, rows } = response.body
                    const received = JSON.stringify({
                        count,
                        rows: rows.map(
                            (row: Record<string, string>) => ({ text: row.text })
                        )
                    })
                    
                    expect(received).toBe(expected)
                })

                it('should return comments with parentId equal null when search param parentId equal null', async () => {
                    const searchParams = new URLSearchParams()
                    searchParams.append('parentId', 'null')

                    response = await commentListRequest(searchParams)

                    const expected = JSON.stringify({
                        count: 2,
                        rows: [
                            { text: 'comment of topic 1' },
                            { text: 'comment of topic 2' },
                        ]
                    })
                    const { count, rows } = response.body
                    const received = JSON.stringify({
                        count,
                        rows: rows.map(
                            (row: Record<string, string>) => ({ text: row.text })
                        )
                    })
                    
                    expect(received).toBe(expected)
                })
            })
        })
    })
    
    describe('test retrieve method', () => {
        const commentRetrieveRequest = async (id: number) => 
            await request(app).get(`/api/v1/comments/${id}/`).send()
        
        let response: request.Response

        describe('if object does not exist', () => {
            beforeEach(async () => {
                response = await commentRetrieveRequest(1)
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
            const comment = {
                text: 'test text',
                topicId: 1,
                authorId: 1
            }

            beforeEach(async () => {
                await CommentModel.create(comment)
                response = await commentRetrieveRequest(1)
            })
    
            it('should respond with status code 200', () => {
                expect(response.statusCode).toBe(200)
            })

            it('should return comment', () => {
                const { text } = response.body
                expect(text).toBe(comment.text)
            })
        })
    })

    describe('test update method', () => {
        const commentUpdateRequest = async (id: number, data: Record<string, string | number>) => 
            await request(app).put(`/api/v1/comments/${id}/`).send(data)
        
        let response: request.Response
        const data = {
            text: 'updated text',
            topicId: 1
        }

        describe('if object does not exist', () => {
            beforeEach(async () => {
                response = await commentUpdateRequest(1, data)
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
            const comment = {
                text: 'test text',
                topicId: 1,
                authorId: 1
            }

            beforeEach(async () => {
                await CommentModel.create(comment)
            })
    
            describe('if filled required fields', () => {
                beforeEach(async () => {
                    response = await commentUpdateRequest(1, data)
                })

                it('should respond with status code 200', () => {
                    expect(response.statusCode).toBe(200)
                })
    
                it('should return updated comment', () => {
                    const { text } = response.body
                    expect(text).toBe(data.text)
                })
            })

            describe('if not filled required fields', () => {
                beforeEach(async () => {
                    response = await commentUpdateRequest(1, {
                        topicId: 2
                    })
                })

                it('should respond with error message "text is required field"', () => {
                    const { reason } = response.body
                    expect(reason).toBe('text is required field')
                })
            })
        })
    })

    describe('test patch method', () => {
        const commentPatchRequest = async (id: number, data: Record<string, string | number>) => 
            await request(app).patch(`/api/v1/comments/${id}/`).send(data)
        
        let response: request.Response
        const data = {
            text: 'patched text'
        }

        describe('if object does not exist', () => {
            beforeEach(async () => {
                response = await commentPatchRequest(1, data)
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
            const comment = {
                text: 'test text',
                topicId: 1,
                authorId: 1
            }

            beforeEach(async () => {
                await CommentModel.create(comment)
                response = await commentPatchRequest(1, data)
            })
    
            it('should respond with status code 200', () => {
                expect(response.statusCode).toBe(200)
            })

            it('should return patched comment', () => {
                const { text } = response.body
                expect(text).toBe(data.text)
            })
        })
    })

    describe('test destroy method', () => {
        const commentDestroyRequest = async (id: number) => 
            await request(app).delete(`/api/v1/comments/${id}/`).send()
        
        let response: request.Response

        describe('if object does not exist', () => {
            beforeEach(async () => {
                response = await commentDestroyRequest(1)
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
            const comment = {
                text: 'test text',
                topicId: 1,
                authorId: 1
            }

            beforeEach(async () => {
                await CommentModel.create(comment)
                response = await commentDestroyRequest(1)
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
