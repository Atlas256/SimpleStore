import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import fileUploader from 'express-fileupload'
import path from 'path'
import router from './Routes/router.js'
import dotenv from 'dotenv'




dotenv.config()

const app = express()


const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL


app.use(express.json())
app.use(express.static(path.resolve('static')))
app.use(cors({
  origin: [process.env.CLIENT_URL, "https://checkout.stripe.com"]
}));
app.use(fileUploader({}))


app.use('/api', router)





async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

    app.listen(PORT, () => console.log('SERVER:', PORT))
  } catch (err) {
    console.log(err);
  }
}


startApp()