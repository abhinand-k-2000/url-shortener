import express from "express";
const app = express()
import urlRouter from "./routes/urlRoute"
import cors from "cors"
import dbConnect from "./config/dbConnect";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8000;
dbConnect()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/url', urlRouter)
app.get('/', (req, res) => {
    res.send('hey welcome back')
})

app.listen(PORT, () => console.log(`Server listening to http://localhost:${PORT}`))  