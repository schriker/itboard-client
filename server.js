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
      const actualPage = '/page/1'
      app.render(req, res, actualPage)
    })

    server.get('/page/:page', (req, res) => {
      const actualPage = `/page/${req.params.page}`
      app.render(req, res, actualPage)
    })

    server.get('/offer/:id', (req, res) => {
      const actualPage = `/offer/${req.params.id}`
      app.render(req, res, actualPage)
    })

    server.get('/offer/create', (req, res) => {
      const actualPage = '/offer/create'
      app.render(req, res, actualPage)
    })

    server.get('/user/login', (req, res) => {
      const actualPage = '/user/login'
      app.render(req, res, actualPage)
    })

    server.get('/user/verify', (req, res) => {
      const actualPage = '/user/verify'
      const queryParams = { token: req.query.token }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/user/reset-password', (req, res) => {
      const actualPage = '/user/reset-password'
      const queryParams = { token: req.query.token }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/user/dashboard', (req, res) => {
      const actualPage = '/user/dashboard'
      app.render(req, res, actualPage)
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