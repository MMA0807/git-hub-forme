const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const keys = require('./keys')
const postRouter = require('./routes/post')

const port = process.env.PORT || 5000
const clientPath = path.join(__dirname, 'client')


mongoose.connect(keys.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true
    })
    .then(() => console.log('yes'))
    .catch(err => console.error(err))

const app = express()
app.use(bodyParser.json())
app.use('/api/post', postRouter)
app.use(express.static(clientPath))

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`)
})