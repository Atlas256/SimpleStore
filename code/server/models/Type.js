import mongoose from 'mongoose'


const Type = new mongoose.Schema({
  title: { type: String, required: true, unique: false },
  slug: { type: String, required: true, unique: true }
})


export default mongoose.model('Type', Type)