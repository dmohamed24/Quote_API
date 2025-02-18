const request = require('supertest')
const app = require('../src/index1')

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

describe('POST /quotes', () => {
  it('should add a new quote', async () => {
    const newQuote = { text: 'This is a new quote' }
    const res = await request(app).post('/quotes').send(newQuote)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.text).toBe(newQuote.text)
  })
})

describe('PUT /quotes/:id', () => {
  it('should update an existing quote', async () => {
    const updatedQuote = { text: 'Updated quote text' }
    const res = await request(app).put('/quotes/1').send(updatedQuote)
    expect(res.statusCode).toBe(200)
    expect(res.body.text).toBe(updatedQuote.text)
  })
})

describe('DELETE /quotes/:id', () => {
  it('should delete an existing quote', async () => {
    const res = await request(app).delete('/quotes/1')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('id', 1)
  })
})
