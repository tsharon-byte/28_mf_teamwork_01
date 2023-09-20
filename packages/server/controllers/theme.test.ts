import request from 'supertest'
import { Theme } from '../db'
import express from 'express'

const app = express()

describe('Theme Controller', () => {
  describe('GET /theme', () => {
    it('should return the latest theme mode', async () => {
      // Create some test data
      const testData = [{ mode: 'light' }, { mode: 'dark' }, { mode: 'auto' }]
      await Theme.bulkCreate(testData)

      // Make request to get the latest theme mode
      const res = await request(app).get('/theme')

      // Assert response
      expect(res.status).toBe(200)
      expect(res.body.mode).toBe('auto')
    })

    it('should return an error if there is a database error', async () => {
      // Mock a database error
      jest.spyOn(Theme, 'findOne').mockImplementation(() => {
        throw new Error('Database error')
      })

      // Make request to get the latest theme mode
      const res = await request(app).get('/theme')

      // Assert response
      expect(res.status).toBe(500)
      expect(res.body).toHaveProperty('message', 'Database error')
    })
  })

  describe('POST /theme', () => {
    it('should create a new theme mode', async () => {
      // Make request to create a new theme mode
      const res = await request(app).post('/theme').send({ mode: 'dark' })

      // Assert response
      expect(res.status).toBe(200)
      expect(res.body.mode).toBe('dark')

      // Assert the new theme mode is created in the database
      await Theme.findOne({
        attributes: ['mode'],
        order: [['id', 'DESC']],
      })
        .then(mode => {
          expect(mode).toEqual('dark')
        })
        .catch(() => {
          fail('No records found in the database')
        })
    })

    it('should return an error if there is a database error', async () => {
      // Mock a database error
      jest.spyOn(Theme, 'create').mockImplementation(() => {
        throw new Error('Database error')
      })
    })
  })
})
