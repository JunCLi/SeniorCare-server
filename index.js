// from packages
const chalk = require('chalk')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const http = require('http')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

// from files
const postgres = require('./config/postgres')
const typeDefs = require('./graphqlSchema/typeDefs')
const dataSources = require('./datasources/datasources')
const makeResolvers = require('./resolvers/resolvers')

// configure
const app = express()
const PORT = process.env.PORT || 8080
app.set('PORT', process.env.PORT || 8080)
app.set('JWT_SECRET', process.env.JWT_SECRET || 'DEV_SECRET')
app.set('JWT_COOKIE_NAME', 'token')
app.use(cookieParser())
resolvers = makeResolvers()

if (process.env.NODE_ENV === 'production') {
  const root = path.resolve(__dirname, '../public')

  // Serve the static front-end from /public when deployed
  app.use(express.static(root))
  app.use(fallback('index.html', { root }))
}

if (process.env.NODE_ENV !== 'production') {
  // Allow requests from dev server address
  const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  app.set('CORS_CONFIG', corsConfig)

  // Allow requests from dev server address
  app.use(cors(corsConfig))
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const apolloServer = new ApolloServer({
  context: ({ req }) => {
    if (
      req.headers.referer === 'http://localhost:8080/graphql' &&
      process.env.NODE_ENV !== 'production'
    ) {
      app.set('SKIP_AUTH', true)
    } else {
      app.set('SKIP_AUTH', false)
    }
    return {
      app,
      req,
      postgres,
    }
  },
	schema,
	dataSources
})

apolloServer.applyMiddleware({
  app,
  cors: app.get('CORS_CONFIG'),
})

let server = http.createServer(app)

apolloServer.installSubscriptionHandlers(server)

postgres.on('error', (err, client) => {
  console.error('Unexpected error on idle postgres client', err)
  process.exit(-1)
})

app.listen(PORT, () => {
  console.log(`>> ${chalk.blue('Express running:')} http://localhost:${PORT}`)

  console.log(`>> ${chalk.magenta('GraphQL playground:')} http://localhost:${PORT}/graphql`)
})

server.on('error', err => {
  console.log(err)
})
