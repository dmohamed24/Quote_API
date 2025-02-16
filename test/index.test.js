const request = require('supertest')
const app = require('../src/index')

let server

beforeAll(() => {
  server = app.listen()
})

afterAll(async () => {
  await server.close()
})

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.text).toBe('Welcome to the Quote API!')
  })
})

describe('GET /quote', () => {
  it('should return a random quote', async () => {
    const res = await request(app).get('/quote')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('text')
  })
})

describe('GET /quotes', () => {
  it('should return an array of quotes', async () => {
    const res = await request(app).get('/quotes')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0]).toHaveProperty('id')
    expect(res.body[0]).toHaveProperty('text')
  })
})
