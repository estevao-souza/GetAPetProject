const mongoose = require('mongoose')
const { Schema } = mongoose

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
    },
    photos: {
      type: Array,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
    adopterId: {
      type: mongoose.ObjectId,
    },
  },
  {
    timestamps: true,
  }
)

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
