const express = require('express')
const app = express()

app.use(express.json()) // Middleware to parse JSON requests

const quotes = [
  { id: 1, text: 'The purpose of our lives is to be happy.' },
  { id: 2, text: 'Life is what happens when you’re busy making other plans.' },
  { id: 3, text: 'Get busy living or get busy dying.' },
  {
    id: 4,
    text: "Nothing is impossible. The word itself says 'I'm possible'!"
  },
  {
    id: 5,
    text: 'The most certain way to succeed is always to try just one more time'
  },
  { id: 6, text: 'Learn from yesterday, live for today, hope for tomorrow' },
  { id: 7, text: 'If you fell down yesterday, stand up today' },
  {
    id: 8,
    text: 'Quotes choose to be optimistic it feels better. He who conquers himself is the mightiest warrior'
  },
  {
    id: 9,
    text: 'Anyone who has never made a mistake has never tried anything new'
  }
]

app.get('/', (req, res) => {
  res.send('Welcome to the Quote API!')
})

app.get('/quote', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  res.json(randomQuote)
})

app.get('/quotes', (req, res) => {
  res.json(quotes)
})

// POST - Add a new quote
app.post('/quotes', (req, res) => {
  const { text } = req.body
  if (!text) {
    return res.status(400).json({ error: 'Quote text is required' })
  }
  const newQuote = {
    id: quotes.length ? quotes[quotes.length - 1].id + 1 : 1,
    text
  }
  quotes.push(newQuote)
  res.status(201).json(newQuote)
})

// PUT - Update an existing quote
app.put('/quotes/:id', (req, res) => {
  const { id } = req.params
  const { text } = req.body
  const quote = quotes.find((q) => q.id === parseInt(id))
  if (!quote) {
    return res.status(404).json({ error: 'Quote not found' })
  }
  if (!text) {
    return res.status(400).json({ error: 'Updated quote text is required' })
  }
  quote.text = text
  res.json(quote)
})

// DELETE - Remove a quote
app.delete('/quotes/:id', (req, res) => {
  const { id } = req.params
  const quoteIndex = quotes.findIndex((q) => q.id === parseInt(id))
  if (quoteIndex === -1) {
    return res.status(404).json({ error: 'Quote not found' })
  }
  const deletedQuote = quotes.splice(quoteIndex, 1)
  res.json(deletedQuote[0])
})

if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))
}

module.exports = app
