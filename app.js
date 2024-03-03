// imports
const express = require('express')
const app = express()
const cors=require('cors')
require('./startup/routes')(app)
require('./startup/db')()
if(process.env.NODE_ENV == 'production'){
  require('./startup/production')(app)
}
// cross origin settings as npm 
app.use(cors({
  origin: ['*',"http://localhost:3000","https://shopappapi-c0ee19112675.herokuapp.com"],
  methods: 'GET'
}))

// port name
const port = process.env.PORT || 3000
// server
app.listen(port, () => {
  console.log('listening on port',port)
})
