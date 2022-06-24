const indexRoute = require('../routes/index')

const loaders = (app) => {
  app.use(indexRoute)
}

module.exports = loaders