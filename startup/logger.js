const config = require('config')
const {transports,createLogger,format} = require('winston')
const {combine,timestamp,prettyPrint} = format
require('winston-mongodb')
const password = config.get('db.password')
const username = config.get('db.username')
const db_name = config.get('db.db_name')
const logger = createLogger({
  format: combine(
    timestamp({
      format: "DD-MMM-YYYY HH:mm:ss"
    }),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: "logs/logs.log",level: 'error',maxFiles:'3d'}),
    new transports.File({filename: "logs/exeptions.log",level: 'error',handleExceptions:true,handleRejections: true, maxFiles:'3d'}),
    new transports.MongoDB({
      level: 'error',
      db:`mongodb+srv://${username}:${password}@cluster0.rj99mx8.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`,
      options:{ 
        useUnifiedTopology: true,
      },
      collection: "server-logs"
    })
  ]
})
// process.on('uncaughtException',(err) => {
//   console.log(err.message)
//   logger.error(err.message)
// })

// process.on('unhandledRejection', (err) => {
//   console.log(err.message)
//   logger.error(err.message)
// })

module.exports = logger