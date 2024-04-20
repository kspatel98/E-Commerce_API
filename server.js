const dotenv=require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Database connected..."))
app.use(express.json())
const productsRouter = require('./routes/products')
app.use('/products', productsRouter);
app.listen(3000, () => console.log("Server started.."))