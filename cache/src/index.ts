import * as express from 'express'
import { log } from '@utils/log'

const app = express()
const port = 8000

// 不存储
app.get('/nostore', (req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  res.send('no store')
})

// 存储但每次都请求判断资源是否有更新
app.get('/nocache', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache')
  res.send('no-cache')
})

app.get('/maxage', (req, res) => {
  res.setHeader('Cache-Control', 'max-age=10')
  // @ts-ignore
  res.send('time now is ' + parseInt(Date.now() / 1e6))
})

// etag 判断更新
app.get('/maxageetag', (req, res) => {
  res.setHeader('Cache-Control', 'max-age=10')

  const Etag = req.headers['if-none-match'] || ''
  const index = Etag.lastIndexOf('"')

  const newETag =
    // @ts-ignore
    index > -1 ? Etag.substr(0, index + 1) + parseInt(Date.now() / 1e4) : Etag
  res.setHeader('ETag', newETag)
  // @ts-ignore
  res.send('time now is ' + parseInt(Date.now() / 1e5))
})

// Expires 判断更新
app.get('/maxageExpires', (req, res) => {
  res.setHeader('Cache-Control', 'max-age=10')
  res.setHeader('Expires', new Date(Date.now() + 1e10).toUTCString())
  // @ts-ignore
  res.send('time now is ' + parseInt(Date.now() / 1e6))
})

// Last-modified 判断更新
app.get('/maxagemodified', (req, res) => {
  res.setHeader('Cache-Control', 'max-age=10')

  res.setHeader(
    'Last-modified',
    // @ts-ignore
    new Date(parseInt(Date.now() / 1e4) * 1e4).toUTCString()
  )
  // @ts-ignore
  res.send('time now is ' + parseInt(Date.now() / 1e6))
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  log(`Server is listening on http://localhost:${port}`)
})
