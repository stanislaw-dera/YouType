const express = require('express')
const app = express()
const port = 3000

const postsRoutes = require('./routes/posts.routes')

app.use(express.json());
app.use(postsRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})