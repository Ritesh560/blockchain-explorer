const mongoose = require("mongoose")
const { Schema } = mongoose

const transectionSchema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  from_address: {
    type: String,
    required: true,
  },
  to_address: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  gas: {
    type: String,
    required: true,
  },
  block_timestamp: {
    type: String,
    required: true,
  },
  block_number: {
    type: String,
    required: true,
  },
})

module.exports = Transaction = mongoose.model("transaction", transectionSchema)
