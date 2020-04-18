import * as dotenv from "dotenv";

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes';

class App {
  public express: express.Application

  public constructor () {
    dotenv.config()

    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-dojv0.gcp.mongodb.net/${process.env.DB_NAME}?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true`
    console.log(url)
    mongoose.connect(url, 
    { useNewUrlParser: true, 
      useUnifiedTopology: true 
    }, (error) => {
      if (!error) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + error)
    }
    })

    // mongoose.set("debug", true);
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express