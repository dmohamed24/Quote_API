const express = require('express')
const app = express()

const quotes = [
  { id: 1, text: 'The purpose of our lives is to be happy.' },
  { id: 2, text: 'Life is what happens when you’re busy making other plans.' },
  { id: 3, text: 'Get busy living or get busy dying.' }
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

if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))
}

module.exports = app
