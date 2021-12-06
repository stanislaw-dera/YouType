const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

const postsRoutes = require('./routes/posts.routes')
const authRoutes = require('./routes/auth.routes')

app.use(cookieParser())
app.use(express.json());
app.use(postsRoutes)
app.use(authRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})