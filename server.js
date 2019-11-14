const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3001
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(cookieParser())

    server.get('/', (req, res) => {
      const actualPage = '/index'
      const queryParams = { page: req.query.page }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/offer', (req, res) => {
      const actualPage = '/offer'
      const queryParams = { id: req.query.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/verify', (req, res) => {
      const actualPage = '/verify'
      const queryParams = { token: req.query.token }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/login', (req, res) => {
      const actualPage = '/login'
      app.render(req, res, actualPage)
    })

    server.get('/create-offer', (req, res) => {
      const actualPage = '/create-offer'
      app.render(req, res, actualPage)
    })

    server.get('/reset-password', (req, res) => {
      const actualPage = '/reset-password'
      const queryParams = { token: req.query.token }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on port: ${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })