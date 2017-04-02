import Koa from "koa"
import koaRouter from "koa-router"
import convert from "koa-convert"
import logger from "koa-logger"
import favicon from "koa-favicon"
import koaBody from "koa-bodyparser"
import cors from "koa-cors"
import { graphqlKoa, graphiqlKoa } from "graphql-server-koa"
// import mongo, { MongoClient } from 'mongodb'
import { PORT, MONGO_URI } from "dotenv"

// `subscriptionServer` needs to go before `schema`
import subscriptionServer from './subscriptionServer'
// import updateSchema from "./utilities/updateSchema"
import schema from "./schema"

const app = new Koa()
const router = new koaRouter()
// const pubsub = new PubSub()

// Middleware
app.use(logger())
app.use(favicon())
app.use(koaBody())
app.use(convert(cors()))

// Initialize
!(async () => {
  try {
    // Database
    // mongo.db = await MongoClient.connect(MONGO_URI)

    // Router
    router.post("/graphql", graphqlKoa({ schema }))
    router.get("/graphiql", graphiqlKoa({ endpointURL: "/graphql" }))

    app.use(router.routes())
    app.use(router.allowedMethods())

    // Print Schema for Relay
    // updateSchema(schema)

    // Server
    const server = app.listen(PORT)

    // Subscriptions
    subscriptionServer({ server, path: '/subscriptions' })

  } catch(error) {
    console.error(error)
    process.exit(1)
  } finally {
    console.log(`server running on localhost:${PORT}, database ${MONGO_URI}`)
  }
})()
