const express = require('express')
require('dotenv').config()
const routes = require('./routes/index')


const app = express()
app.use(express.json())


app.use(routes.authRoute)
app.use('/blogs', routes.blogRoute)


const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
    if(err) {
        console.error(err)
    }

    console.log(`Server running on PORT ${PORT}`)
})