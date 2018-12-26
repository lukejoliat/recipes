// require('dotenv').config(); // read .env files
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// Set public folder as root
app.use(express.static('dist'))

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`))

app.use((req, res) => res.sendFile(`${__dirname}/dist/index.html`))

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port)
})
