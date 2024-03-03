const mongoose = require('mongoose')
const config = require('config')
const password = config.get('db.password')
const username = config.get('db.username')
const db_name = config.get('db.db_name')
const logger = require('./logger')

module.exports = async () => {
// db connection
  try {
    const success = await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.rj99mx8.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`)
    if(success){
      logger.info('connected to mongodb database')
    }
  } catch (error) {
    process.exit(1)
  }
}