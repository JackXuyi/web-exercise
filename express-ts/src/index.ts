import * as express from 'express'
import { log } from '@utils/log'

const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/test', (req, res) => {
  const { callback } = req.query
  res.send(`${callback}({ test: "a" })`)
})

app.listen(port, () => {
  log(`Server is listening on http://localhost:${port}`)
})
