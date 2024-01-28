let mongoose = require("mongoose")
let config = require("config")
let db = config.get("mongoURI")

let connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log("MongoDB connected")
  } catch (err) {
    console.error(err.message)
    //exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
